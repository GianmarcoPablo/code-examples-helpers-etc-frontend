import { EditCompanySchema } from "@/schemas/forms/form-1-edit.schema";
import { CompanyReponse } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const adaptCompanyData = (company: CompanyReponse) => {
  return {
    name: company.name,
    description: company.description,
    industry: company.industry,
    phone: company.phone || "",
    address: company.address || "",
    website: company.website || "",
    isVerified: company.isVerified,
    socialLinks: company.socialLinks || [],
    logoUrl: company.logoUrl || undefined,
    bannerUrl: company.bannerUrl || undefined,
  };
};