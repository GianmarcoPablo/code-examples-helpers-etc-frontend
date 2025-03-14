"use client"
import { Form1 } from "@/components/features/forms/form-1"
import { Form1Preview } from "@/components/features/forms/form-1-preview"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCompanyStore } from "@/hooks/use-company"
import { toast } from "sonner"
import { form1Create } from "@/lib/api/forms/form-1"

export default function CreateCompanyPage() {
    const router = useRouter()
    const { company, resetCompany } = useCompanyStore()
    const [isSubmitting, setIsSubmitting] = useState(false)



    const handleCreateCompany = async () => {
        try {
            setIsSubmitting(true);

            const formData = new FormData();
            formData.append("name", company.name);
            formData.append("description", company.description);
            if (company.bannerUrl) formData.append("bannerUrl", company.bannerUrl);
            if (company.logoUrl) formData.append("logoUrl", company.logoUrl);
            if (company.phone) formData.append("phone", company.phone);
            if (company.address) formData.append("address", company.address);
            formData.append("industry", company.industry);
            formData.append("isVerified", String(company.isVerified));
            if (company.website) formData.append("website", company.website);

            // Agregar `socialLinks` si existen
            if (company.socialLinks.length > 0) {
                formData.append("socialLinks", JSON.stringify(company.socialLinks));
            }

            console.log("Enviando datos:", Object.fromEntries(formData.entries()));

            const response = await form1Create(formData);
            console.log({ response });

            toast.success("Empresa creada exitosamente");
            resetCompany();
        } catch (error) {
            toast.error("Error al crear la empresa");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };


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