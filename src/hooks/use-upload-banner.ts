import { useCallback, useEffect, useRef, useState } from 'react';
import { ReactCropperElement } from 'react-cropper';
import { UseFormReturn } from 'react-hook-form';
import { toast } from "sonner";

const MIN_WIDTH = 1128;
const MIN_HEIGHT = 191;

interface Props<T extends { bannerUrl?: string | File }> {
    form: UseFormReturn<T>;
}

export const useUploadBanner = <T extends { bannerUrl?: string | File }>({ form }: Props<T>) => {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const cropperRef = useRef<ReactCropperElement>(null);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return toast("No se pudo cargar el archivo.");

        if (!file.type.startsWith("image/")) {
            toast("Solo se permiten archivos de imagen.");
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        const img = new Image();
        img.src = objectUrl;

        img.onload = () => {
            if (img.width < MIN_WIDTH || img.height < MIN_HEIGHT) {
                toast(`El ancho mínimo es ${MIN_WIDTH}px y la altura mínima es ${MIN_HEIGHT}px.`);
                URL.revokeObjectURL(objectUrl);
                return;
            }

            setOpen(true);
            setImage(objectUrl);
        };

        img.onerror = () => {
            toast("No se pudo cargar la imagen.");
            URL.revokeObjectURL(objectUrl);
        };
    }, []);

    const handleCrop = useCallback(() => {
        const cropper = cropperRef.current?.cropper;
        if (!cropper) return;

        const croppedCanvas = cropper.getCroppedCanvas({
            width: MIN_WIDTH,
            height: MIN_HEIGHT,
        });

        croppedCanvas?.toBlob(
            (blob) => {
                if (blob) {
                    const file = new File([blob], "banner.png", { type: "image/png" });
                    setCroppedImage(URL.createObjectURL(blob));
                    form.setValue("bannerUrl" as any, file as any);
                } else {
                    toast("No se pudo recortar la imagen.");
                }
            },
            "image/png",
        );
    }, [form]);

    const handleAcceptCrop = () => {
        setOpen(false);
    };

    const handleClose = () => {
        if (image) URL.revokeObjectURL(image);
        if (croppedImage) URL.revokeObjectURL(croppedImage);
        setImage(null);
        setCroppedImage(null);
        form.setValue("bannerUrl" as any, null as any);
        setOpen(false);
    };

    useEffect(() => {
        return () => {
            if (image) URL.revokeObjectURL(image);
            if (croppedImage) URL.revokeObjectURL(croppedImage);
        };
    }, [image, croppedImage]);

    return {
        handleFileChange,
        handleCrop,
        handleAcceptCrop,
        handleClose,
        image,
        croppedImage,
        open,
        setOpen,
        cropperRef,
        MIN_WIDTH,
        MIN_HEIGHT,
    };
};
