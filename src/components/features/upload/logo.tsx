import { Label } from "@/components/ui/label"
import { CreateCompanySchema } from "@/schemas/forms/form-1.schema"
import { Upload } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { useState, useEffect } from "react"
import { toast } from "sonner"

interface Props {
    form: UseFormReturn<CreateCompanySchema>
}

const MIN_WIDTH = 128
const MIN_HEIGHT = 128

export const UploadLogo = ({ form }: Props) => {
    const [preview, setPreview] = useState<string | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (!file) {
            form.setValue("logoUrl", undefined)
            setPreview(null)
            return
        }

        if (!file.type.startsWith("image/")) {
            toast("Solo se permiten archivos de imagen.")
            return
        }

        const img = new Image()
        const objectUrl = URL.createObjectURL(file)
        img.src = objectUrl

        img.onload = () => {
            if (img.width < MIN_WIDTH || img.height < MIN_HEIGHT) {
                toast(
                    `El tamaño mínimo es ${MIN_WIDTH}x${MIN_HEIGHT} píxeles.`,
                )
                URL.revokeObjectURL(objectUrl)
                return
            }

            form.setValue("logoUrl", file)
            setPreview(objectUrl)
        }

        img.onerror = () => {
            toast( "No se pudo cargar la imagen.")
            URL.revokeObjectURL(objectUrl)
        }
    }

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview)
        }
    }, [preview])

    return (
        <div>
            <Label htmlFor="logo">Company Logo</Label>
            <div className="mt-2">
                <div className="flex items-center justify-center w-full">
                    <label
                        htmlFor="logo"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG o GIF (Mínimo: 128x128)</p>
                        </div>
                        <input
                            id="logo"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>

            </div>
        </div>
    )
}
