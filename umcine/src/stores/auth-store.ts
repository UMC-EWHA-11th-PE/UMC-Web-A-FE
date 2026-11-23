import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
    accessToken: string | null;
    memberId: number | null;
    setAccessToken: (accessToken: string | null) => void;
    setMemberId: (memberId: number | null) => void;
}

export const useAuthStore = create<AuthStore>() (
    persist(
        (set) => ({
            accessToken: null,
            memberId: null,
            setAccessToken: (accessToken) => set({ accessToken }),
            setMemberId: (memberId) => set({ memberId }),
        }),
        {
            name: "umcine-auth-store",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                accessToken: state.accessToken,
                memberId: state.memberId,
            }),
        }
    )
)