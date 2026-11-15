// 내 정보 응답에는 memberId가 없어서 토큰 payload의 sub에서 꺼낸다
export function getMemberIdFromToken(accessToken: string | null) {
    if (!accessToken) return null;

    try {
        const payload = accessToken.split(".")[1];
        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        const { sub } = JSON.parse(atob(base64)) as { sub?: unknown };
        const memberId = Number(sub);

        return Number.isSafeInteger(memberId) && memberId > 0 ? memberId : null;
    } catch {
        return null;
    }
}
