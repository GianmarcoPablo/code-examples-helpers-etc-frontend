export interface AuthResponse {
    token: string;
}

export interface CompanyReponse {
    id: string;
    name: string;
    description: string;
    logoUrl: string | null;
    bannerUrl: string | null;
    phone: string | null;
    address: string | null;
    industry: string;
    isVerified: boolean;
    isActive: boolean;
    socialLinks: string[];
    website: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    User: {
        id: string;
        // Aquí puedes agregar más campos del modelo User si es necesario
    };
    Job: {
        id: string;
        // Aquí puedes agregar más campos del modelo Job si es necesario
    }[];
}