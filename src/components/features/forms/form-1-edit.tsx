"use client"

import { CompanyReponse } from "@/types"
import { EditCompanySchema } from "@/schemas/forms/form-1-edit.schema"
import { CompanyForm } from "./company-form";

interface Props {
    company: CompanyReponse;
}

export function Form1Edit({ company }: Props) {
    const handleEditSubmit = async (data: EditCompanySchema) => {
        console.log("Datos actualizados:", data);
        // Aquí implementarías la lógica para enviar los datos al backend
    };

    return <CompanyForm mode="edit" company={company} onSubmit={handleEditSubmit} />;
}