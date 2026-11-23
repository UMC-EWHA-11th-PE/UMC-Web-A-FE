import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (accessToken) => set({ accessToken }),
    }),
    {
      name: "umcine-auth-store",
      storage: createJSONStorage(() => localStorage),
      // 서버 렌더링 결과와 맞추려고 자동으로 불러오지 않고, Providers에서 브라우저에 붙은 뒤 불러옴
      skipHydration: true,
      partialize: (state) => ({ accessToken: state.accessToken }),
    },
  ),
);