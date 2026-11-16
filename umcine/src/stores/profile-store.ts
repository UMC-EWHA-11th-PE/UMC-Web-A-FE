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
      partialize: (state) => ({ profileImage: state.profileImage }),
    },
  ),
);
