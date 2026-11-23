export function getMemberIdFromToken(token: string): number {
    const payload = JSON.parse(
        atob(
            token.split(".")[1]
                .replace(/-/g, "+")
                .replace(/_/g, "/")
        )
    );

    const memberId = Number(payload.sub);

    if (!Number.isSafeInteger(memberId) || memberId <= 0) {
        throw new Error("유효하지 않은 memberId입니다.");
    }

    return memberId;
}