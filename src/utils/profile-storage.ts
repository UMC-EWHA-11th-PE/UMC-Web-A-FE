export interface Profile {
    email: string;
    nickname: string;
}

const PROFILE_STORAGE_KEY = "umcine-demo-profile";

const DEFAULT_PROFILE: Profile = {
    email: "name@example.com",
    nickname: "UMCine 사용자",
};

export function getProfile(): Profile {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);

    if (!saved) {
        return { ...DEFAULT_PROFILE };
    }

    try {
        const parsed: unknown = JSON.parse(saved);

        if (
            typeof parsed === "object" &&
            parsed !== null &&
            "email" in parsed &&
            "nickname" in parsed &&
            typeof parsed.email === "string" &&
            typeof parsed.nickname === "string"
        ) {
            return {
                email: parsed.email,
                nickname: parsed.nickname,
            };
        }
    } catch {
        return { ...DEFAULT_PROFILE };
    }

    return { ...DEFAULT_PROFILE };
}

export function saveProfile(profile: Profile) {
    localStorage.setItem(
        PROFILE_STORAGE_KEY,
        JSON.stringify(profile),
    );
}
