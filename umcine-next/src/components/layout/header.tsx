"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/members/me";
import { useAuthStore } from "../../stores/auth-store";

export function Header() {
  const accessToken = useAuthStore((state) => state.accessToken);

  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex h-16 w-full items-center justify-between px-10">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-[#111111]">
            UMCine
          </Link>

          <nav className="flex items-center gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-black">
              영화
            </Link>

            <Link href="/search" className="hover:text-black">
              검색
            </Link>
          </nav>
        </div>

        {!accessToken ? (
          <Link
            href="/login"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
          >
            로그인
          </Link>
        ) : meQuery.isLoading ? (
          <span className="h-10 w-24 animate-pulse rounded-md bg-gray-200" />
        ) : (
          <Link
            href="/mypage"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
          >
            마이페이지
          </Link>
        )}
      </div>
    </header>
  );
}
