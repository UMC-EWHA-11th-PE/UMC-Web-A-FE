import {apiClient} from "../api-client.ts";

export interface CheckNicknameDuplicateResponse {
    available: boolean;
}

export function checkNicknameDuplicate(nickname: string) {
    return apiClient
        .get(`members/nickname/${encodeURIComponent(nickname)}`)
        .json<CheckNicknameDuplicateResponse>();
}