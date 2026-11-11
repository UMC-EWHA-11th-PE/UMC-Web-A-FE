import { isHTTPError } from "ky";

// 백엔드가 보낸 message가 있으면 그대로 쓰고, 없으면 기본 문구를 사용
export function getApiErrorMessage(error: unknown, fallback: string) {
    if (isHTTPError(error)) {
        const data = error.data as { message?: unknown } | null | string | undefined;

        if (data !== null && typeof data === "object" && typeof data.message === "string") {
            return data.message;
        }
    }

    return fallback;
}
