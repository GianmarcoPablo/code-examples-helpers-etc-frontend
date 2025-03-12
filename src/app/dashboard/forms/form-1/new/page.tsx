"use client"
import { Form1 } from "@/components/features/forms/form-1"
import { Form1Preview } from "@/components/features/forms/form-1-preview"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCompanyStore } from "@/hooks/use-company"
import { toast } from "sonner"

export default function CreateCompanyPage() {
    const router = useRouter()
    const { company, resetCompany } = useCompanyStore()
    const [isSubmitting, setIsSubmitting] = useState(false)



    const handleCreateCompany = async () => {
        try {
            setIsSubmitting(true)

            // Código para enviar los datos al backend
            // const response = await createCompany(company)

            toast.success("Empresa creada exitosamente")
            resetCompany()
            // router.push(`/companies/${response.id}`)
        } catch (error) {
            toast.error("Error al crear la empresa")
            console.error(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Crear Nueva Empresa</h1>

            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <Form1 />
                </div>
                <div>
                    <Form1Preview onSubmit={handleCreateCompany} />
                </div>
            </div>
        </div>
    )
}