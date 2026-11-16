import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Profile {
  nickname: string;
  email: string;
  // 줄인 프로필 이미지(data URL). 고른 적이 없으면 null
  profileImage: string | null;
}

interface ProfileStore {
  profile: Profile;
  updateProfile: (profile: Profile) => void;
}

// 내 정보 조회/수정 API는 8주차에 연결. 그전까지는 화면에서 입력한 값을 여기에 저장해 보여줌
export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: {
        nickname: "moviefan",
        email: "umc@example.com",
        profileImage: null,
      },
      updateProfile: (profile) => set({ profile }),
    }),
    {
      name: "umcine-profile-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
