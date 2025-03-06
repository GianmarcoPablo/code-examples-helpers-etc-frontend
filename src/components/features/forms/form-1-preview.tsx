"use client"
import { useCompanyStore } from "@/hooks/use-company"

export const Form1Preview = () => {

    const { showPreview, company } = useCompanyStore()

    console.log(company)

    return (
        <div>Form1Preview</div>
    )
}