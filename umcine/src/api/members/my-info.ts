import { apiClient } from "../api-client.ts";
import type { ApiResponse } from "../api-response.ts";

export interface MyInfo {
    email: string;
    nickname: string;
    createdAt: string;
}

export interface UpdateMyInfoRequest {
    nickname: string;
}

export async function getMyInfo() {
    const response = await apiClient.get("members/me").json<ApiResponse<MyInfo>>();

    return response.result;
}

export async function updateMyInfo(body: UpdateMyInfoRequest) {
    const response = await apiClient
        .patch("members/me", { json: body })
        .json<ApiResponse<MyInfo>>();

    return response.result;
}
