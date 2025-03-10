"use server"
import { CompanyReponse } from "@/types";
import { apiClient } from "../apiClient";


export const form1Api = async () => {
    return apiClient("/company", { auth: true, method: "POST" });
}

export const form1ApiGetById = async (id: string) => {
    return apiClient<CompanyReponse>(`/company/one-company-of-user/${id}`, { auth: true, method: "GET" });
}