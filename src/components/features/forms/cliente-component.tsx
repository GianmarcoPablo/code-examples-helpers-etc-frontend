"use client"
import { Form1Edit } from "@/components/features/forms/form-1-edit";
import { Form1Preview } from "@/components/features/forms/form-1-preview";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CompanyReponse } from "@/types";
import { ApiError } from "@/types/api";
import { useCompanyStore } from "@/hooks/use-company";
import { Button } from "@/components/ui/button";

interface Props {
    companyId: string;
    company: CompanyReponse | null;
    error: ApiError | null;
}

export const ClientComponent = ({ company, companyId, error }: Props) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (error) {
        toast.error("No se pudo obtener la empresa");
        return (
            <div className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-6">Error</h1>
                <p>No se pudo obtener la información de la empresa.</p>
                <Button
                    onClick={() => router.back()}
                    className="mt-4"
                >
                    Volver
                </Button>
            </div>
        );
    }

  
    const handleUpdateCompany = async () => {
        try {
            setIsSubmitting(true);

            // Código para actualizar los datos en el backend
            // await updateCompany(id, formData);

            toast.success("Empresa actualizada exitosamente");
            router.push(`/companies/${companyId}`);
        } catch (error) {
            toast.error("Error al actualizar la empresa");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Editar Empresa: {company?.name}</h1>

            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <Form1Edit company={company!} />
                </div>
                <div>
                    <Form1Preview
                        defaultCompany={company!}
                        onSubmit={handleUpdateCompany}
                    />
                </div>
            </div>
        </div>
    );
};
