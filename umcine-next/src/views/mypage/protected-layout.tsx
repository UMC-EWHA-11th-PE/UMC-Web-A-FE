"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../stores/auth-store";

export function ProtectedLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (hasHydrated && !accessToken) router.replace("/login");
  }, [hasHydrated, accessToken, router]);

  // 저장된 로그인 정보를 읽기 전, 또는 로그인이 안 된 상태에서는 내용을 보여주지 않아요.
  if (!hasHydrated || !accessToken) return null;

  return <>{children}</>;
}
