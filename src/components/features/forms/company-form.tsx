"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createCompanySchema, CreateCompanySchema } from "@/schemas/forms/form-1.schema"
import { editCompanySchema, EditCompanySchema } from "@/schemas/forms/form-1-edit.schema"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { UploadBanner } from "../upload/cropper-and-dialog"
import { useCompanyStore } from "@/hooks/use-company"
import { UploadLogo } from "../upload/logo"
import { CompanyReponse } from "@/types"
import { adaptCompanyData } from "@/lib/utils"

type CompanyFormProps = {
    mode: 'create' | 'edit';
    company?: CompanyReponse;
    onSubmit?: (data: CreateCompanySchema | EditCompanySchema) => void;
}

export function CompanyForm({ mode, company, onSubmit }: CompanyFormProps) {
    const { setShowPreview, setCompany } = useCompanyStore();
    const [socialLinksInput, setSocialLinksInput] = useState("");

    // Configuración del formulario basada en el modo
    const schema = mode === 'create' ? createCompanySchema : editCompanySchema;
    const defaultValues = mode === 'create'
        ? {
            name: "",
            description: "",
            industry: "",
            phone: "",
            address: "",
            website: "",
            isVerified: false,
            socialLinks: [],
        }
        : company ? adaptCompanyData(company) : undefined;

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });

    // Gestión de enlaces sociales
    const addSocialLink = () => {
        const currentServices = form.getValues("socialLinks");
        if (socialLinksInput.trim() !== "") {
            form.setValue("socialLinks", [...currentServices || [], socialLinksInput.trim()]);
            setSocialLinksInput("");
        }
    };

    const removeSocialLink = (index: number) => {
        const current = form.getValues("socialLinks");
        const updateSocialLink = current?.filter((_, i) => i !== index);
        form.setValue("socialLinks", updateSocialLink);
    };

    const handleFormSubmit = (data: any) => {
        if (mode === 'create') {
            setCompany({
                name: data.name,
                description: data.description,
                industry: data.industry,
                phone: data.phone,
                address: data.address,
                website: data.website,
                isVerified: data.isVerified,
                socialLinks: data.socialLinks,
                logoUrl: data.logoUrl,
                bannerUrl: data.bannerUrl,
                isActive: false,
                userId: "",
                createdAt: new Date(),
                updatedAt: new Date(),
                id: "",
            });
            setShowPreview(true);
        }

        // Si hay una función de envío personalizada (para edición), la llamamos
        if (onSubmit) onSubmit(data);
    };

    return (
        <Card className="bg-sidebar">
            <CardHeader>
                <CardTitle>{mode === 'create' ? 'Crear una empresa' : 'Editar empresa'}</CardTitle>
                <CardDescription>
                    {mode === 'create'
                        ? 'Crea una empresa nueva en unos clics.'
                        : 'Actualiza la información de tu empresa.'}
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                    <CardContent>
                        <div className="grid w-full items-center gap-4 space-y-2">
                            <div className="grid grid-cols-2 gap-x-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre de la empresa</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ejm: ShadCN Inc." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="industry"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Industria de la compañía</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ejm: Tecnología" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descripción</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                autoCorrect="off"
                                                placeholder="Escribe una breve descripción..."
                                                className="resize-none h-24"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid gap-6 my-3 md:grid-cols-2">
                                <UploadBanner
                                    form={form}
                                    defaultValue={company?.bannerUrl || undefined}
                                />
                                <UploadLogo
                                    form={form}
                                    defaultValue={company?.logoUrl || undefined}
                                />
                            </div>
                            <div className="grid gap-6 my-3 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="website"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sitio web de la compañía</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://miempresa.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Teléfono de la compañía</FormLabel>
                                            <FormControl>
                                                <Input placeholder="+34 123 456 789" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Dirección de la compañía</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Calle Ejemplo, 123" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="socialLinks"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enlaces sociales</FormLabel>
                                        <div className="flex gap-2 items-center">
                                            <FormControl>
                                                <Input
                                                    placeholder="https://linkedin.com/company/miempresa"
                                                    onChange={(e) => setSocialLinksInput(e.target.value)}
                                                    value={socialLinksInput}
                                                />
                                            </FormControl>
                                            <Button type="button" onClick={addSocialLink}>
                                                Agregar
                                            </Button>
                                        </div>
                                        <FormMessage />

                                        <ol className="mt-3 space-y-2 list-decimal">
                                            {form?.watch("socialLinks")?.map((link: string | undefined, index: number) => (
                                                <li key={index + 1} className="flex justify-between items-center">
                                                    <span>{index + 1}. {link}</span>

                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        onClick={() => removeSocialLink(index)}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </li>
                                            ))}
                                        </ol>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button
                            type="submit"
                            disabled={!form.formState.isValid}
                        >
                            {mode === 'create' ? 'Crear preview' : 'Actualizar empresa'}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}
