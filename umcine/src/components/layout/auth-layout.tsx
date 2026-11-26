"use client";

import {type ReactNode, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useAuthStore} from "../../stores/auth-store.ts";

interface AuthLayoutProps {
    children: ReactNode;
}

// 로그인한 사용자만 볼 수 있는 페이지를 감싼다.
// 토큰이 localStorage에 있어서 서버(proxy)에서는 알 수 없으므로 브라우저에서 확인한다.
export function AuthLayout({children}: AuthLayoutProps) {
    const router = useRouter();
    const hasHydrated = useAuthStore((state) => state.hasHydrated);
    const isLoggedIn = useAuthStore((state) => state.accessToken !== null);

    // 처음 들어왔을 때 + 페이지를 보는 중에 토큰이 만료되어 지워진 경우
    useEffect(() => {
        if (hasHydrated && !isLoggedIn) {
            router.replace("/login");
        }
    }, [hasHydrated, isLoggedIn, router]);

    if (!hasHydrated || !isLoggedIn) {
        return null;
    }

    return children;
}
