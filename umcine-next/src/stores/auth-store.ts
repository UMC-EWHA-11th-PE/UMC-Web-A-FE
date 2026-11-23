import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
    accessToken: string | null;
    memberId: number | null;
    hasHydrated: boolean;
    setHasHydrated: (hasHydrated: boolean) => void;
    setAccessToken: (accessToken: string | null) => void;
    setMemberId: (memberId: number | null) => void;
}

export const useAuthStore = create<AuthStore>() (
    persist(
        (set) => ({
            accessToken: null,
            memberId: null,
            hasHydrated: false,
            setHasHydrated: (hasHydrated) => set({ hasHydrated }),
            setAccessToken: (accessToken) => set({ accessToken }),
            setMemberId: (memberId) => set({ memberId }),
        }),
        {
            name: "umcine-auth-store",
            storage: createJSONStorage(() => localStorage),
            skipHydration: true, // 서버/클라이언트 첫 렌더링을 맞추기 위해, 저장값 복원은 Providers에서 직접 해요.
            onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
            partialize: (state) => ({
                accessToken: state.accessToken,
                memberId: state.memberId,
            }),
        }
    )
)