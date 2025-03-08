import { CreateCompanySchema } from '@/schemas/forms/form-1.schema'
import { create } from 'zustand'


type Store = {
    company: CreateCompanySchema
    setCompany: (company: CreateCompanySchema) => void
    showPreview: boolean
    setShowPreview: (showPreview: boolean) => void
}

export const useCompanyStore = create<Store>()((set) => ({
    company: {
        name: "",
        description: "",
        industry: "",
        phone: "",
        address: "",
        website: "",
        isVerified: false,
        socialLinks: [],
        logoUrl: undefined,
        bannerUrl: undefined,
    },
    setCompany: (company: CreateCompanySchema) => set({ company }),
    showPreview: false,
    setShowPreview: (showPreview: boolean) => set({ showPreview }),
}))
