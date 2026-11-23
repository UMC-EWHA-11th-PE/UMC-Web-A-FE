import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type MovieSortOrder = "default" | "latest" | "title";

interface ViewSettingsStore {
  sortOrder: MovieSortOrder;
  setSortOrder: (sortOrder: MovieSortOrder) => void;
}

export const useViewSettingsStore = create<ViewSettingsStore>()(
  persist(
    (set) => ({
      sortOrder: "default",
      setSortOrder: (sortOrder) => set({ sortOrder }),
    }),
    {
      name: "umcine-view-settings",
      storage: createJSONStorage(() => localStorage),
      // 서버 렌더링 결과와 맞추려고 자동으로 불러오지 않고, Providers에서 브라우저에 붙은 뒤 불러옴
      skipHydration: true,
      partialize: (state) => ({ sortOrder: state.sortOrder }),
    },
  ),
);