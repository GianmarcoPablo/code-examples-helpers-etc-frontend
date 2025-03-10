export interface AuthResponse {
    token: string;
}

export interface CompanyReponse {
    id: string;
    name: string;
    description: string;
    logoUrl: string | null;
    bannerUrl: string | null;
    industry: string;
    isVerified: boolean;
    isActive: boolean;
    socialLinks: string[];
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    website?: string;
    phone?: string;
    address?: string;
}