import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "../../utils/cn";

interface NavLinkProps {
  to: "/" | "/search";
  active: boolean;
  children: string;
}

function NavLink({ to, active, children }: NavLinkProps) {
  return (
    <Link
      to={to}
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
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  // 영화 목록(/)과 영화 상세(/movies/...)는 "영화" 메뉴, 검색(/search)은 "검색" 메뉴가 활성 상태예요.
  const isMovieActive = pathname === "/" || pathname.startsWith("/movies");
  const isSearchActive = pathname.startsWith("/search");

  return (
    <header className="flex h-[91px] items-center justify-between border-b border-line bg-surface px-20 py-6">
      <div className="flex items-center gap-[42px]">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg border-2 border-fg">
            <img src="/icons/movie.svg" alt="" className="size-6" />
          </span>
          <span className="text-xl leading-none font-black tracking-[-0.7px] text-fg">
            UMCine
          </span>
        </Link>
        <nav className="flex items-center gap-[30px]">
          <NavLink to="/" active={isMovieActive}>영화</NavLink>
          <NavLink to="/search" active={isSearchActive}>검색</NavLink>
        </nav>
      </div>
      <div className="flex items-center gap-2.5">
        <Link
          to="/search"
          aria-label="검색"
          className="flex size-[42px] cursor-pointer items-center justify-center rounded-lg border border-line bg-surface"
        >
          {/* search.svg는 검정색이라, 마스크로 쓰고 Figma의 secondary 텍스트 색을 입혀요. */}
          <span
            aria-hidden="true"
            className="size-6 bg-fg-secondary mask-[url('/icons/search.svg')] mask-center mask-no-repeat"
          />
        </Link>
        <button
          type="button"
          className="h-[42px] cursor-pointer rounded-lg border border-white bg-action px-4 text-sm font-extrabold text-white hover:bg-action-hover active:bg-action-pressed"
        >
          로그인
        </button>
      </div>
    </header>
  );
}
