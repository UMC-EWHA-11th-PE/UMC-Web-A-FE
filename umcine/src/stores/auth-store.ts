import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
    accessToken: string | null;
    setAccessToken: (accessToken: string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            accessToken: null,
            setAccessToken: (accessToken) => set({ accessToken }),
            clearAuth: () => set({ accessToken: null }),
        }),
        {
            name: "umcine-auth",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ accessToken: state.accessToken }),
        },
    ),
);
