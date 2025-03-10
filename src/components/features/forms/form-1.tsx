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
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { UploadBanner } from "../upload/cropper-and-dialog"
import { useCompanyStore } from "@/hooks/use-company"
import { UploadLogo } from "../upload/logo"

export function Form1() {

    const { setShowPreview, setCompany } = useCompanyStore()

    const [socialLinksInput, setSocialLinksInput] = useState(""); // Estado local para el input de servicio

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


    const form = useForm<CreateCompanySchema>({
        resolver: zodResolver(createCompanySchema),
        defaultValues: {
            name: "",
            description: "",
            industry: "",
            phone: "",
            address: "",
            website: "",
            isVerified: false,
            socialLinks: [],
        },
    })


    function onShowPreview() {
        if (!form.formState.isValid) return
        setCompany({
            name: form.getValues("name"),
            description: form.getValues("description"),
            industry: form.getValues("industry"),
            phone: form.getValues("phone"),
            address: form.getValues("address"),
            website: form.getValues("website"),
            isVerified: form.getValues("isVerified"),
            socialLinks: form.getValues("socialLinks"),
            logoUrl: form.getValues("logoUrl"),
            bannerUrl: form.getValues("bannerUrl"),
        })
        setShowPreview(true)
    }


    return (
        <Card className="bg-sidebar">

            <CardHeader>
                <CardTitle>Crear una empresa</CardTitle>
                <CardDescription>
                    Crea una empresa nueva en unos clics.
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onShowPreview)}
                >
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
                                                <Input placeholder="Ejm: ShadCN Inc." {...field} />
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
                                <UploadBanner<CreateCompanySchema> form={form} />
                                <UploadLogo<CreateCompanySchema> form={form} />
                            </div>
                            <div className="grid gap-6 my-3 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="website"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sitio web de la compañía</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ejm: ShadCN Inc." {...field} />
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
                                            <FormLabel>Telefono de la compañía</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ejm: ShadCN Inc." {...field} />
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
                                            <Input placeholder="Ejm: ShadCN Inc." {...field} />
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
                                        <FormLabel>Enlaces</FormLabel>
                                        <div className="flex gap-2 items-center">
                                            <FormControl>
                                                <Input
                                                    placeholder="Ejm: Tecnología"
                                                    {...field}
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
                            disabled={!form.formState.isValid}
                        >Crear preview</Button>

                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}
