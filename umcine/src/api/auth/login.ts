import { apiClient } from "../api-client.ts";
import type { ApiResponse } from "../api-response.ts";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResult {
    nickname: string;
    accessToken: string;
}

export async function login(body: LoginRequest) {
    const response = await apiClient
        .post("auth/login", { json: body })
        .json<ApiResponse<LoginResult>>();

    return response.result;
}
