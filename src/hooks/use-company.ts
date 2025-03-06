import { create } from 'zustand'

interface Company {
    name: string
    description: string
    industry: string
    phone?: string
    address?: string
    website?: string
    isVerified?: boolean
    socialLinks?: (string | undefined)[]
    logoUrl?: File
    bannerUrl?: File
}

type Store = {
    company: Company
    setCompany: (company: Company) => void
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
    setCompany: (company: Company) => set({ company }),
    showPreview: false,
    setShowPreview: (showPreview: boolean) => set({ showPreview }),
}))
