"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useCompanyStore } from "@/hooks/use-company"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import { CompanyReponse } from "@/types"

interface Props {
    defaultCompany?: CompanyReponse;
    onSubmit?: () => void;
}

export const Form1Preview = ({ defaultCompany, onSubmit }: Props) => {
    const { showPreview, company, setCompany, setShowPreview } = useCompanyStore()
    const [position, setPosition] = useState("bottom")

    useEffect(() => {
        if (defaultCompany) {
            setCompany({
                ...defaultCompany,
                socialLinks: defaultCompany.socialLinks || []
            });
            setShowPreview(true);
        }
    }, [defaultCompany, setCompany, setShowPreview]);


    // Función para convertir File a URL
    const getValidSrc = (src: string | File | undefined | null) => {
        if (!src) return undefined
        return src instanceof File ? URL.createObjectURL(src) : src
    }

    const banner = getValidSrc(company.bannerUrl) ?? "/banner-default.svg"
    const logo = getValidSrc(company.logoUrl) ?? "/logo-default.svg"

    if (!showPreview) return <NotPreview />

    return (
        <Card className="bg-sidebar">
            <CardHeader>
                <CardTitle>Vista previa de la empresa</CardTitle>
                <CardDescription className="flex justify-between items-center">
                    Observa cómo se verá tu empresa en la vista previa.
                    <Button onClick={onSubmit}>
                        {defaultCompany ? 'Guardar cambios' : 'Crear compañía'}
                    </Button>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative w-full mb-24">
                    {/* Banner */}
                    <Image
                        src={banner}
                        alt="Banner"
                        width={804}
                        height={134}
                        className="rounded-md w-full h-[134px] object-cover"
                    />
                    {/* Logo */}
                    <div className="absolute bottom-[-70px] left-6 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 border-4 border-white rounded-md shadow-lg bg-white">
                        <Image
                            src={logo}
                            alt="Logo"
                            width={128}
                            height={128}
                            className="w-full h-full object-cover rounded-md"
                        />
                    </div>
                </div>
                <div className="ml-6">
                    <div className="mb-5">
                        <h3 className="text-xl font-semibold">{company.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{company.industry}</p>
                        <p className="mt-2">{company.description}</p>

                        {company.website && (
                            <p className="mt-2">
                                <strong>Web:</strong> <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{company.website}</a>
                            </p>
                        )}

                        {company.phone && (
                            <p>
                                <strong>Teléfono:</strong> {company.phone}
                            </p>
                        )}

                        {company.address && (
                            <p>
                                <strong>Dirección:</strong> {company.address}
                            </p>
                        )}

                        {company.socialLinks && company.socialLinks.length > 0 && (
                            <div className="mt-2">
                                <strong>Enlaces:</strong>
                                <ul className="list-disc ml-5 mt-1">
                                    {company.socialLinks.map((link, index) => (
                                        <li key={index}>
                                            <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4 ">
                        <Button size={"sm"}>Seguir</Button>
                        <Button size={"sm"}>Enviar mensaje</Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Opciones</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                                    <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

const NotPreview = () => {
    return (
        <Card className="bg-sidebar">
            <CardHeader>
                <CardTitle>Aun no se genera un preview</CardTitle>
                <CardDescription>
                    Una vez que hayas completado el formulario, haz click en el botón de "Generar preview" para ver el resultado.
                </CardDescription>
            </CardHeader>
        </Card>
    )
}