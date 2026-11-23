import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
    accessToken: string | null;
    // localStorage에서 토큰을 다 읽어왔는지 여부. 읽기 전에는 로그인 여부를 판단할 수 없다.
    hasHydrated: boolean;
    setAccessToken: (accessToken: string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            accessToken: null,
            hasHydrated: false,
            setAccessToken: (accessToken) => set({ accessToken }),
            clearAuth: () => set({ accessToken: null }),
        }),
        {
            name: "umcine-auth",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ accessToken: state.accessToken }),
            // 서버에는 localStorage가 없어서 첫 렌더링은 항상 비로그인 상태로 그려진다.
            // 클라이언트가 바로 localStorage를 읽으면 서버 HTML과 달라지므로(hydration 불일치)
            // 마운트된 뒤 StoreHydrator에서 직접 rehydrate한다.
            skipHydration: true,
            onRehydrateStorage: () => () => {
                useAuthStore.setState({ hasHydrated: true });
            },
        },
    ),
);
