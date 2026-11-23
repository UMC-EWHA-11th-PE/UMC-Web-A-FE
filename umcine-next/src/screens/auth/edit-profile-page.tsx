"use client";

import { useEffect, useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/members/me";
import { useAuthStore } from "../../stores/auth-store";
import { useUpdateMeMutation } from "../../hooks/use-update-me-mutation";

export function EditProfilePage() {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const [nickname, setNickname] = useState("");

  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const updateMeMutation = useUpdateMeMutation();

  useEffect(() => {
    if (meQuery.data) {
      setNickname(meQuery.data.nickname);
    }
  }, [meQuery.data]);

  const isNicknameValid =
    nickname.trim().length >= 2 &&
    nickname.trim().length <= 12;

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isNicknameValid || updateMeMutation.isPending) return;

    updateMeMutation.mutate({
      nickname: nickname.trim(),
    });
  }

  if (!accessToken) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#f8f9fa]">
        <p className="text-sm text-gray-500">
          로그인이 필요합니다.
        </p>
      </main>
    );
  }

  if (meQuery.isPending) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#f8f9fa]">
        <p className="text-sm text-gray-500">
          내 정보를 불러오는 중...
        </p>
      </main>
    );
  }

  if (meQuery.isError) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#f8f9fa]">
        <p className="text-sm text-red-500">
          내 정보를 불러오지 못했어요.
        </p>
      </main>
    );
  }

  const profile = meQuery.data;

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
            disabled={!isNicknameValid || updateMeMutation.isPending}
            className="w-full rounded-md bg-[#4b63e6] py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {updateMeMutation.isPending ? "저장 중" : "수정 완료"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/mypage")}
            className="mt-3 w-full rounded-md border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-600"
          >
            취소
          </button>
        </form>
      </div>
    </main>
  );
}
