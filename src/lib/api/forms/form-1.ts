"use sever"
import { apiClient } from "../apiClient";


export const form1Api = async () => {
    return apiClient("/form", { auth: true, method: "POST" });
}