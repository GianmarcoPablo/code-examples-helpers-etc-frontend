import { CompanyReponse } from '@/types'
import { create } from 'zustand'


type Store = {
    company: CompanyReponse
    setCompany: (company: CompanyReponse) => void
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
        logoUrl: null,
        bannerUrl: null,
        isActive: false,
        userId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        id: "",
    },
    setCompany: (company: CompanyReponse) => set({ company }),
    showPreview: false,
    setShowPreview: (showPreview: boolean) => set({ showPreview }),
}))
