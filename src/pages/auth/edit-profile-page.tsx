
import { useState, type SubmitEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  getProfile,
  saveProfile,
} from "../../utils/profile-storage";

export function EditProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() => getProfile());
  const [nickname, setNickname] = useState(profile.nickname);

  const isNicknameValid =
    nickname.trim().length >= 2 &&
    nickname.trim().length <= 12;

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isNicknameValid) return;

    const updatedProfile = {
      ...profile,
      nickname: nickname.trim(),
    };

    saveProfile(updatedProfile);
    setProfile(updatedProfile);

    alert("내 정보가 수정되었어요.");
    navigate({ to: "/mypage" });
  }

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#f8f9fa] px-5 py-12">
      <div className="w-full max-w-[420px]">
        <h1 className="mb-6 text-2xl font-bold text-[#111111]">
          내 정보 수정
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="profile-email"
              className="mb-2 block text-xs font-bold text-[#111111]"
            >
              이메일
            </label>

            <input
              id="profile-email"
              type="email"
              value={profile.email}
              disabled
              className="w-full rounded-md border border-gray-200 bg-gray-100 px-3 py-3 text-sm text-gray-500"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="profile-nickname"
              className="mb-2 block text-xs font-bold text-[#111111]"
            >
              닉네임
            </label>

            <input
              id="profile-nickname"
              type="text"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              placeholder="2~12자"
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#4b63e6]"
            />

            {nickname && !isNicknameValid && (
              <p className="mt-2 text-xs text-red-500">
                닉네임은 2~12자로 입력해 주세요.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isNicknameValid}
            className="w-full rounded-md bg-[#4b63e6] py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            수정 완료
          </button>

          <button
            type="button"
            onClick={() => navigate({ to: "/mypage" })}
            className="mt-3 w-full rounded-md border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-600"
          >
            취소
          </button>
        </form>
      </div>
    </main>
  );
}
