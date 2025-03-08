import { CreateCompanySchema } from '@/schemas/forms/form-1.schema';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ReactCropperElement } from 'react-cropper';
import { UseFormReturn } from 'react-hook-form';
import { toast } from "sonner"

const MIN_WIDTH = 1128;
const MIN_HEIGHT = 191;

interface Props {
    form: UseFormReturn<CreateCompanySchema>
}

export const useUploadBanner = ({ form }: Props) => {


    const [open, setOpen] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const cropperRef = useRef<ReactCropperElement>(null);

    const handleClose = () => {
        setOpen(false);
        setImage(null);
        setCroppedImage(null);
    };

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            toast("No se pudo cargar el archivo.")
            return;
        }

        if (!file.type.startsWith("image/")) {
            toast("Solo se permiten archivos de imagen.");
            return;
        }

        e.target.value = "";

        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        img.src = objectUrl;

        if (file) {
            img.onload = () => {
                if (img.width < MIN_WIDTH || img.height < MIN_HEIGHT) {
                    toast(
                        `El ancho mínimo es ${MIN_WIDTH}px y la altura mínima es ${MIN_HEIGHT}px.`,
                    );
                    URL.revokeObjectURL(objectUrl);
                    return;
                }

                const reader = new FileReader();
                reader.onload = (event) => {
                    setOpen(true);
                    setImage(event.target?.result as string);
                };
                reader.readAsDataURL(file);
            };
        }

        img.onerror = () => {
            toast("No se pudo cargar la imagen.");
            URL.revokeObjectURL(objectUrl);
        };
    }, [toast]);

    const handleCrop = useCallback(() => {
        const cropper = cropperRef.current?.cropper;
        if (!cropper) return;

        const croppedCanvas = cropper.getCroppedCanvas({
            width: MIN_WIDTH,
            height: MIN_HEIGHT,
        });

        if (!croppedCanvas) {
            toast("No se pudo recortar la imagen.");
            return;
        }

        croppedCanvas.toBlob(
            (blob) => {
                if (blob) {
                    const file = new File([blob], "banner.png", { type: "image/png" });
                    setCroppedImage(URL.createObjectURL(blob));
                    form.setValue("bannerUrl", file);
                }
            },
            "image/png",
        );
    }, [toast, form]);

    // limpiar memoria
    useEffect(() => {
        return () => {
            if (croppedImage) URL.revokeObjectURL(croppedImage)
        }
    }, [croppedImage])

    const handleAcceptCrop = () => {
        if (croppedImage) {
            //set banner

            handleClose();
        }
    }

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
        setCroppedImage,
        setImage,
        toast
    }
}