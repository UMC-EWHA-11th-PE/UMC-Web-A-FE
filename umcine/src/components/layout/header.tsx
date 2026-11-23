"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../utils/cn";
import { useMeQuery } from "../../hooks/use-me-query";
import { useAuthStore } from "../../stores/auth-store";

interface NavLinkProps {
  href: "/" | "/search" | "/my";
  active: boolean;
  children: string;
}

function NavLink({ href, active, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm leading-none font-bold",
        active ? "text-fg" : "text-fg-secondary",
      )}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();

  // 영화 목록(/)과 영화 상세(/movies/...)는 "영화" 메뉴, 검색(/search)은 "검색" 메뉴가 활성 상태예요.
  const isMovieActive = pathname === "/" || pathname.startsWith("/movies");
  const isSearchActive = pathname.startsWith("/search");
  const isMyActive = pathname.startsWith("/my");

  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useMeQuery();

  return (
    <header className="flex h-[91px] items-center justify-between border-b border-line bg-surface px-20 py-6">
      <div className="flex items-center gap-[42px]">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg border-2 border-fg">
            <img src="/icons/movie.svg" alt="" className="size-6" />
          </span>
          <span className="text-xl leading-none font-black tracking-[-0.7px] text-fg">
            UMCine
          </span>
        </Link>
        <nav className="flex items-center gap-[30px]">
          <NavLink href="/" active={isMovieActive}>영화</NavLink>
          <NavLink href="/search" active={isSearchActive}>검색</NavLink>
          <NavLink href="/my" active={isMyActive}>내 정보</NavLink>
        </nav>
      </div>
      <div className="flex items-center gap-2.5">
        <Link
          href="/search"
          aria-label="검색"
          className="flex size-[42px] cursor-pointer items-center justify-center rounded-lg border border-line bg-surface"
        >
          {/* search.svg는 검정색이라, 마스크로 쓰고 Figma의 secondary 텍스트 색을 입혀요. */}
          <span
            aria-hidden="true"
            className="size-6 bg-fg-secondary mask-[url('/icons/search.svg')] mask-center mask-no-repeat"
          />
        </Link>
        {/* 로그인 전: 로그인 링크 / 첫 조회 중: 버튼 크기의 로딩 표시 / 토큰이 있으면: 마이페이지 링크 */}
        {!accessToken ? (
          <Link href="/login" className={ACTION_LINK_CLASS_NAME}>
            로그인
          </Link>
        ) : meQuery.isLoading ? (
          <span aria-label="내 정보 불러오는 중" className="h-[42px] w-24 animate-pulse rounded-lg bg-line" />
        ) : (
          <Link href="/my" className={ACTION_LINK_CLASS_NAME}>
            마이페이지
          </Link>
        )}
      </div>
    </header>
  );
}

const ACTION_LINK_CLASS_NAME =
  "flex h-[42px] cursor-pointer items-center rounded-lg border border-white bg-action px-4 text-sm font-extrabold text-white hover:bg-action-hover active:bg-action-pressed";
