import { apiClient } from "./api-Client";

export interface checkEmailDuplicateResponse {
  available: boolean;
}

export function checkEmailDuplicate(email: string) {
  return apiClient
    .get(`members/email/${encodeURIComponent(email)}`)
    .json<checkEmailDuplicateResponse>();
}