import { AuthSchema } from "@/schemas/auth/auth";
import { apiClient } from "../apiClient";
import { AuthResponse } from "@/types";

export const register = async (data: AuthSchema) => {
    return await apiClient<AuthResponse>("/users/register", {
        method: "POST",
        body: JSON.stringify(data),
    });
};