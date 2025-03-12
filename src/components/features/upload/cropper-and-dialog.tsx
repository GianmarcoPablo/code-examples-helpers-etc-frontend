"use client";
import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";
import { Upload, CheckCircle2, RefreshCw } from "lucide-react";
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { useUploadBanner } from "@/hooks/use-upload-banner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

interface Props<T extends { bannerUrl?: string | File }> {
    form: UseFormReturn<T>;
    defaultValue?: string | File;
}

export const UploadBanner = <T extends { bannerUrl?: string | File }>({
    form,
    defaultValue,
}: Props<T>) => {
    const {
        handleFileChange,
        handleCrop,
        handleAcceptCrop,
        cropperRef,
        image,
        croppedImage,
        open,
        setOpen,
        MIN_HEIGHT,
        MIN_WIDTH,
    } = useUploadBanner({ form });

    const [hasBanner, setHasBanner] = useState(false);

    // Comprueba si hay un banner predeterminado o uno seleccionado
    useEffect(() => {
        if (defaultValue || form.watch("bannerUrl" as any)) {
            setHasBanner(true);
        }
    }, [defaultValue, form]);

    return (
        <>
            <div>
                <Label htmlFor="banner">Company Banner</Label>
                <div className="mt-2">
                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="banner"
                            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ${hasBanner ? "border-green-500" : ""
                                }`}
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {hasBanner ? (
                                    <>
                                        <CheckCircle2 className="w-8 h-8 mb-2 text-green-500" />
                                        <p className="text-sm text-green-500">Imagen seleccionada</p>
                                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                                            <RefreshCw className="w-4 h-4 mr-1" />
                                            <span>Cambiar imagen</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            SVG, PNG, JPG o GIF
                                        </p>
                                    </>
                                )}
                            </div>
                            <input
                                id="banner"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => {
                                    handleFileChange(e);
                                    setHasBanner(true); // Marca como seleccionado
                                }}
                            />
                        </label>
                    </div>
                </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-full max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Recortar imagen</DialogTitle>
                        <DialogDescription>Recorta tu banner para que tenga el tamaño correcto.</DialogDescription>
                    </DialogHeader>

                    {image && (
                        <div className="w-full mx-auto">
                            <Cropper
                                src={image}
                                style={{ height: 300, width: "100%" }}
                                initialAspectRatio={MIN_WIDTH / MIN_HEIGHT}
                                aspectRatio={MIN_WIDTH / MIN_HEIGHT}
                                minCropBoxWidth={MIN_WIDTH}
                                minCropBoxHeight={MIN_HEIGHT}
                                guides={false}
                                viewMode={1}
                                responsive={true}
                                background={false}
                                ref={cropperRef}
                            />
                            <Button onClick={handleCrop} className="mt-4 w-full">
                                Recortar Imagen
                            </Button>
                        </div>
                    )}

                    {croppedImage && (
                        <div className="border p-4 rounded-md shadow-md flex flex-col items-center">
                            <h3 className="text-center font-semibold mb-2">Vista Previa del Banner</h3>
                            <div className="w-full h-24 mb-4">
                                <img
                                    src={croppedImage}
                                    alt="Vista previa"
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </div>
                            <Button
                                onClick={handleAcceptCrop}
                                className="mt-4 w-full"
                            >
                                Aceptar
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};