"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthHydrated } from "../../hooks/use-auth-hydrated";
import { useAuthStore } from "../../stores/auth-store";

// 로그인 전용 페이지를 감싼다. 토큰은 localStorage에 있어서 서버가 아니라 브라우저에서 확인한다
export function AuthGuard({ children }: { children: ReactNode }) {
  const isHydrated = useAuthHydrated();
  const accessToken = useAuthStore((state) => state.accessToken);
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !accessToken) {
      router.replace("/login");
    }
  }, [isHydrated, accessToken, router]);

  // 토큰을 확인하기 전이나 이동하는 동안에는 하위 페이지를 그리지 않음
  if (!isHydrated || !accessToken) {
    return null;
  }

  return children;
}
