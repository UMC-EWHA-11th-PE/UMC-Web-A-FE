import ky from 'ky';
import { env } from "../config/env";
import { useAuthStore } from "../stores/auth-store.ts";

export const apiClient = ky.create({
    baseUrl: env.apiBaseUrl,
    hooks: {
        beforeRequest: [
            ({ request }) => {
                const { accessToken } = useAuthStore.getState();
                if (accessToken) {
                    request.headers.set("Authorization", `Bearer ${accessToken}`);
                }
            },
        ],
        afterResponse: [
            ({ request, response }) => {
                // 토큰을 보냈는데 401이면 만료되었거나 유효하지 않은 토큰
                if (response.status === 401 && request.headers.has("Authorization")) {
                    useAuthStore.getState().clearAuth();
                }
            },
        ],
    },
});
