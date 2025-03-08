"use client"
import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";
import { Upload } from 'lucide-react';
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
import { CreateCompanySchema } from "@/schemas/forms/form-1.schema";
import { Label } from "@/components/ui/label";

interface Props {
    form: UseFormReturn<CreateCompanySchema>
}

export const UploadBanner = ({ form }: Props) => {

    const { handleFileChange, handleCrop, handleAcceptCrop, cropperRef, image, croppedImage, open, setOpen, MIN_HEIGHT, MIN_WIDTH } = useUploadBanner({ form });


    return (
        <>
            <div>
                <Label htmlFor="banner">Company Banner</Label>
                <div className="mt-2">
                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="banner"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                        >

                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                            </div>
                            <input
                                id="banner"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
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
                            <img
                                src={croppedImage}
                                alt="Cropped Banner"
                                className="w-[728px] h-[134px] object-cover rounded-md"
                            />
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
    )
}