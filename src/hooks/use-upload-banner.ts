import { useState, useRef } from "react";
import { toast } from "sonner";
import { UseFormReturn } from "react-hook-form";

interface UseUploadBannerProps {
    form: UseFormReturn<any>;
}

export const useUploadBanner = ({ form }: UseUploadBannerProps) => {
    const [image, setImage] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const cropperRef = useRef<any>(null);

    const MIN_WIDTH = 804;
    const MIN_HEIGHT = 134;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Solo se permiten archivos de imagen");
            return;
        }

        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
            if (img.width < MIN_WIDTH || img.height < MIN_HEIGHT) {
                toast.error(`El tamaño mínimo es ${MIN_WIDTH}x${MIN_HEIGHT} píxeles`);
                URL.revokeObjectURL(objectUrl);
                return;
            }

            setImage(objectUrl);
            setOpen(true);
        };

        img.onerror = () => {
            toast.error("No se pudo cargar la imagen");
            URL.revokeObjectURL(objectUrl);
        };

        img.src = objectUrl;
    };

    const handleCrop = () => {
        if (!cropperRef.current) return;

        const cropper = cropperRef.current.cropper;
        const canvas = cropper.getCroppedCanvas({
            minWidth: MIN_WIDTH,
            minHeight: MIN_HEIGHT,
        });

        if (canvas) {
            const croppedDataUrl = canvas.toDataURL();
            setCroppedImage(croppedDataUrl);

            canvas.toBlob((blob: Blob | null) => {
                if (!blob) {
                    toast.error("Error al procesar la imagen");
                    return;
                }

                const file = new File([blob], "banner.jpg", {
                    type: "image/jpeg",
                });

                form.setValue("bannerUrl", file, { shouldValidate: true });
            });
        }
    };

    const handleAcceptCrop = () => {
        setOpen(false);
        setImage(null);
        setCroppedImage(null);
        toast.success("Banner actualizado correctamente");
    };

    return {
        handleFileChange,
        handleCrop,
        handleAcceptCrop,
        cropperRef,
        image,
        croppedImage,
        open,
        setOpen,
        MIN_WIDTH,
        MIN_HEIGHT,
    };
};
