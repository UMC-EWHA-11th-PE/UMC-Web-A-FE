"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthHydrated } from "../../hooks/use-auth-hydrated";
import { useAuthStore } from "../../stores/auth-store";

// 이미 로그인했다면 로그인 화면 대신 홈으로 보낸다
export function GuestOnly({ children }: { children: ReactNode }) {
  const isHydrated = useAuthHydrated();
  const accessToken = useAuthStore((state) => state.accessToken);
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && accessToken) {
      router.replace("/");
    }
  }, [isHydrated, accessToken, router]);

  if (isHydrated && accessToken) {
    return null;
  }

  return children;
}
