import { EditCompanySchema } from "@/schemas/forms/form-1-edit.schema";
import { CompanyReponse } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const adaptCompanyData = (company: CompanyReponse): EditCompanySchema => {
  return {
    name: company.name,
    description: company.description,
    industry: company.industry,
    bannerUrl: company.bannerUrl || undefined, // Convierte `null` en `undefined`
    logoUrl: company.logoUrl || undefined, // Convierte `null` en `undefined`
    phone: company.phone || undefined, // Convierte `null` en `undefined`
    address: company.address || undefined, // Convierte `null` en `undefined`
    isVerified: company.isVerified,
    socialLinks: company.socialLinks || [], // Asegúrate de que `socialLinks` sea un array
    website: company.website || undefined, // Convierte `null` en `undefined`
  };
};