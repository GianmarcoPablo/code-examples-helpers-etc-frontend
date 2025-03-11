import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif"];

export const editCompanySchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    description: z.string().min(1, "La descripción es obligatoria"),
    bannerUrl: z
        .union([z.instanceof(File), z.string().url()])
        .optional()
        .refine((file) => {
            if (typeof file === 'string') return true; // Acepta URLs
            if (file instanceof File) {
                return file.size <= MAX_FILE_SIZE && ACCEPTED_IMAGE_TYPES.includes(file.type);
            }
            return false;
        }, {
            message: `La imagen es demasiado grande o no es un tipo válido. Elige una imagen menor de ${MAX_FILE_SIZE / 1024 / 1024}MB y de tipo ${ACCEPTED_IMAGE_TYPES.join(", ")}.`,
        }),
    logoUrl: z
        .union([z.instanceof(File), z.string().url()])
        .optional()
        .refine((file) => {
            if (typeof file === 'string') return true; // Acepta URLs
            if (file instanceof File) {
                return file.size <= MAX_FILE_SIZE && ACCEPTED_IMAGE_TYPES.includes(file.type);
            }
            return false;
        }, {
            message: `La imagen es demasiado grande o no es un tipo válido. Elige una imagen menor de ${MAX_FILE_SIZE / 1024 / 1024}MB y de tipo ${ACCEPTED_IMAGE_TYPES.join(", ")}.`,
        }),
    phone: z.string().optional(),
    address: z.string().optional(),
    industry: z.string().min(1, "La industria es obligatoria"),
    isVerified: z.boolean().optional(),
    socialLinks: z
        .array(z.string().url("Debe ser una URL válida").optional())
        .optional()
        .default([]),  // Permite que el array esté vacío sin errores
    website: z.string().url("Debe ser una URL válida").optional(),
});

export type EditCompanySchema = z.infer<typeof editCompanySchema>;