"use client";

import {type ReactNode, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useAuthStore} from "../../stores/auth-store.ts";

interface GuestOnlyProps {
    children: ReactNode;
}

// 이미 로그인한 사용자가 로그인 페이지에 들어오면 홈으로 보낸다
export function GuestOnly({children}: GuestOnlyProps) {
    const router = useRouter();
    const hasHydrated = useAuthStore((state) => state.hasHydrated);
    const isLoggedIn = useAuthStore((state) => state.accessToken !== null);

    useEffect(() => {
        if (hasHydrated && isLoggedIn) {
            router.replace("/");
        }
    }, [hasHydrated, isLoggedIn, router]);

    if (!hasHydrated || isLoggedIn) {
        return null;
    }

    return children;
}
