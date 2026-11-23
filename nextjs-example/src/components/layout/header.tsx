"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth-store";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((state) => state.accessToken);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  async function handleLogout() {
    useAuthStore.getState().setAccessToken(null);
    await queryClient.cancelQueries();
    queryClient.clear();
    router.replace("/login");
  }

  return (
    <header className="flex items-center justify-between border-b border-[#e5e5e5] bg-white px-6 py-4">
      <nav className="flex items-center gap-6">
        <Link href="/" className="text-lg font-bold">
          UMCine
        </Link>

        <Link href="/search" className="text-sm text-[#555]">
          검색
        </Link>

        <Link
          href="/my"
          className={`text-sm ${
            pathname.startsWith("/my")
              ? "border-b-2 border-black font-semibold"
              : "text-[#555]"
          }`}
        >
          내 정보
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        {!hasHydrated ? (
          <span className="h-9 w-20 animate-pulse rounded bg-gray-200" />
        ) : accessToken ? (
          <>
            <Link href="/my" className="text-sm font-semibold text-blue-600">
              마이페이지
            </Link>
            <button
              type="button"
              onClick={() => void handleLogout()}
              className="rounded-md border px-3 py-2 text-sm"
            >
              로그아웃
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white"
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
