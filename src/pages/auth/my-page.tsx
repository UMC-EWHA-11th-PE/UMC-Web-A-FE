import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { getProfile } from "../../utils/profile-storage";

export function MyPage() {
  const [profile] = useState(() => getProfile());

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#f8f9fa] px-5 py-12">
      <div className="w-full max-w-[420px]">
        <h1 className="mb-6 text-2xl font-bold text-[#111111]">
          내 정보
        </h1>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-6">
            <p className="mb-2 text-xs font-bold text-gray-500">
              이메일
            </p>

            <p className="text-sm text-[#111111]">
              {profile.email}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs font-bold text-gray-500">
              닉네임
            </p>

            <p className="text-sm text-[#111111]">
              {profile.nickname}
            </p>
          </div>
        </div>

        <Link
          to="/mypage/edit"
          className="mt-5 block rounded-md bg-[#4b63e6] py-3 text-center text-sm font-bold text-white"
        >
          내 정보 수정
        </Link>

        <p className="mt-4 text-center text-xs text-gray-400">
          현재는 화면 실습용 예시 정보입니다.
        </p>
      </div>
    </main>
  );
}
