import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ProfileStore {
  // 줄인 프로필 이미지(data URL). 고른 적이 없으면 null
  profileImage: string | null;
  setProfileImage: (profileImage: string | null) => void;
}

// 닉네임과 이메일은 서버의 내 정보(GET /members/me)를 씀.
// 프로필 이미지 API는 없어서 이미지만 브라우저에 저장함
export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profileImage: null,
      setProfileImage: (profileImage) => set({ profileImage }),
    }),
    {
      name: "umcine-profile-store",
      storage: createJSONStorage(() => localStorage),
      // 서버 렌더링 결과와 맞추려고 자동으로 불러오지 않고, Providers에서 브라우저에 붙은 뒤 불러옴
      skipHydration: true,
      partialize: (state) => ({ profileImage: state.profileImage }),
    },
  ),
);
