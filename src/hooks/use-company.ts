import { CompanyReponse } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Store = {
    company: CompanyReponse
    setCompany: (company: CompanyReponse) => void
    showPreview: boolean
    setShowPreview: (showPreview: boolean) => void
    resetCompany: () => void
}

const initialCompany: CompanyReponse = {
    name: "",
    description: "",
    industry: "",
    phone: "",
    address: "",
    website: "",
    isVerified: false,
    socialLinks: [],
    logoUrl: null,
    bannerUrl: null,
    isActive: false,
    userId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    id: "",
}

export const useCompanyStore = create<Store>()(

    (set) => ({
        company: initialCompany,
        setCompany: (company: CompanyReponse) => set({ company }),
        showPreview: false,
        setShowPreview: (showPreview: boolean) => set({ showPreview }),
        resetCompany: () => set({ company: initialCompany, showPreview: false }),
    }),

)