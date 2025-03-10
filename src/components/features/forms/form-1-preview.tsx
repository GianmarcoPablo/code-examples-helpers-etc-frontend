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
    defaultCompany?: CompanyReponse
}


export const Form1Preview = ({ defaultCompany }: Props) => {


    const { showPreview, company, setCompany, setShowPreview } = useCompanyStore()
    const [position, setPosition] = useState("bottom")

    useEffect(() => {
        if (defaultCompany) {
            setCompany({
                name: defaultCompany.name,
                description: defaultCompany.description,
                industry: defaultCompany.industry,
                phone: defaultCompany.phone,
                address: defaultCompany.address,
                website: defaultCompany.website,
                isVerified: defaultCompany.isVerified,
                socialLinks: defaultCompany.socialLinks || [],
                logoUrl: defaultCompany.logoUrl || null,
                bannerUrl: defaultCompany.bannerUrl || null,
                isActive: defaultCompany.isActive,
                userId: defaultCompany.userId,
                createdAt: defaultCompany.createdAt,
                updatedAt: defaultCompany.updatedAt,
                id: defaultCompany.id,
            });
            // Mostrar el preview automáticamente
            setShowPreview(true);
        }
    }, [defaultCompany, setCompany, setShowPreview]);


    // Función para convertir File a URL
    const getValidSrc = (src: string | File | undefined) => {
        if (!src) return undefined
        return src instanceof File ? URL.createObjectURL(src) : src
    }

    const banner = getValidSrc(company.bannerUrl!) ?? "/banner-default.svg"
    const logo = getValidSrc(company.logoUrl!) ?? "/logo-default.svg"

    if (!showPreview) return <p>Loading...</p>


    return (
        <>
            <Card className="bg-sidebar">
                <CardHeader>
                    <CardTitle>Vista previa de la empresa</CardTitle>
                    <CardDescription className="flex justify-between items-center">
                        Observa cómo se verá tu empresa en la vista previa.
                        <Button >Crear compañia</Button>
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
                            className=" rounded-md w-[804px] h-[134px]"
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
                            <h3 className="text-xl font-semibold ">{company.name}</h3>
                            <p>{company.description} </p>
                        </div>

                        <div className="flex items-center gap-4 ">
                            <Button size={"sm"}>Seguir</Button>
                            <Button size={"sm"}>Enviar mensaje</Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Open</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
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
        </>
    )
}

const NotPreview = () => {
    return (
        <Card className="bg-sidebar">
            <CardHeader>
                <CardTitle>Aun no se genera un preview</CardTitle>
                <CardDescription>
                    Una vez que hayas completado el formulario, haz click en el boton de "Generar preview" para ver el resultado.
                </CardDescription>
            </CardHeader>
        </Card>
    )
}
