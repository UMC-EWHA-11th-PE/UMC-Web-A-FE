"use client";

import {useQuery, useQueryClient} from "@tanstack/react-query";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {favoriteQueries} from "../../api/favorites/favorite-queries.ts";
import {memberQueries} from "../../api/members/member-queries.ts";
import {ratingQueries} from "../../api/ratings/rating-queries.ts";
import {useAuthStore} from "../../stores/auth-store.ts";
import {cn} from "../../utils/cn.ts";

const NAV_ITEMS = [
    {href: "/", label: "영화", exact: true},
    {href: "/search", label: "검색", exact: false},
    {href: "/mypage", label: "내 정보", exact: false},
] as const;

export function Header() {
    const pathname = usePathname();
    const hasHydrated = useAuthStore((state) => state.hasHydrated);
    const isLoggedIn = useAuthStore((state) => state.accessToken !== null);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const queryClient = useQueryClient();

    const handleLogout = () => {
        clearAuth();
        queryClient.removeQueries({queryKey: memberQueries.me(false).queryKey});
        queryClient.removeQueries({queryKey: favoriteQueries.all});
        queryClient.removeQueries({queryKey: ratingQueries.all});
    };

    const meQuery = useQuery(memberQueries.me(isLoggedIn));

    return (
        <header
            className="flex items-center justify-between self-stretch border-b border-(--color-border-default) bg-(--color-bg-surface) px-4 py-4 md:px-20 md:py-6">
            <div className="flex items-center gap-4 md:gap-[42px]">
                <div className="flex items-center gap-2.5">
                    <span className="grid size-8 place-items-center rounded-lg border-2 border-(--color-text-primary)">
                        <img className="size-6" src="/icons/movie-icons/movie.svg" alt=""/>
                    </span>
                    <span className="text-xl font-black tracking-[-0.7px]">UMCine</span>
                </div>
                <nav className="flex items-center gap-4 whitespace-nowrap md:gap-[30px]">
                    {NAV_ITEMS.map(({href, label, exact}) => {
                        // TanStack Router의 activeProps 대신 현재 경로를 직접 비교한다
                        const isActive = exact ? pathname === href : pathname.startsWith(href);

                        return (
                            <Link
                                key={href}
                                href={href}
                                aria-current={isActive ? "page" : undefined}
                                className={cn(
                                    "text-sm font-bold",
                                    isActive
                                        ? "text-(--color-text-primary) underline"
                                        : "text-(--color-text-secondary) no-underline",
                                )}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="flex items-center gap-2.5">
                <button type="button"
                        className="hidden size-[42px] place-items-center rounded-lg border border-(--color-border-default) bg-(--color-bg-surface) sm:grid"
                        aria-label="영화 검색">
                    <img className="size-6" src="/icons/movie-icons/search.svg" alt=""/>
                </button>
                {/* 토큰을 읽기 전에는 로그인 버튼이 잠깐 보이지 않도록 자리만 잡아 둔다 */}
                {!hasHydrated || (isLoggedIn && meQuery.isLoading) ? (
                    <span className="h-[42px] w-[84px] animate-pulse rounded-lg bg-(--color-border-default)" />
                ) : !isLoggedIn ? (
                    <Link href="/login"
                          className="flex h-[42px] items-center rounded-lg border border-(--color-bg-surface) bg-(--color-action-primary) px-4 text-sm font-extrabold text-(--color-bg-surface)">로그인</Link>
                ) : (
                    <button type="button" onClick={handleLogout}
                            className="h-[42px] rounded-lg border border-(--color-border-default) bg-(--color-bg-surface) px-4 text-sm font-extrabold text-(--color-text-secondary)">로그아웃</button>
                )}
            </div>
        </header>
    );
}
