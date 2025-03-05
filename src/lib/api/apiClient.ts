"use server";
import { apiBackendUrl, coockieName } from "@/lib/constants";
import { ApiResponse } from "@/types/api";
import { cookies } from "next/headers";

interface FetchOptions extends RequestInit {
    auth?: boolean; // Controla si agrega o no el token
}

export const apiClient = async <T>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> => {
    const { auth = false, ...rest } = options;
    const headers = new Headers(rest.headers);

    if (auth) {
        const cookieStore = await cookies();
        const token = cookieStore.get(coockieName)?.value;
        if (!token) {
            return {
                data: null,
                error: { msg: "No token found", error: true },
            };
        }
        headers.set("Authorization", `Bearer ${token}`);
    }

    // Manejo del contenido si se envía FormData o JSON
    if (rest.body && !(rest.body instanceof FormData)) {
        headers.set("Content-Type", "application/json");
    }

    try {
        console.log(rest.body)

        const response = await fetch(`${apiBackendUrl}${endpoint}`, {
            ...rest,
            headers,
        });

        if (!response.ok) {
            const error = await response.json();
            console.log(error.error.issues)
            return {
                data: null,
                error: {
                    msg: error.msg || `HTTP error! status: ${response.status}`,
                    error: true,
                },
            };
        }

        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        console.log(error)
        return {
            data: null,
            error: {
                msg: error instanceof Error ? error.message : "Unknown error occurred",
                error: true,
            },
        };
    }
};
