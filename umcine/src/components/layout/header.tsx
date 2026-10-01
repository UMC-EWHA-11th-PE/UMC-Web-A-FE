import { Link } from "@tanstack/react-router";

interface HeaderProps {
  isLoggedIn?: boolean;
}

function Header({ isLoggedIn = false }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-[#e5e5e5] bg-white px-8 py-4">
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-lg font-bold text-[#111] no-underline"
        >
          영화
        </Link>

        <Link
          to="/search"
          className="pb-0.5 text-sm text-[#555] no-underline"
        >
          검색
        </Link>

        <nav className="flex gap-5">
          <Link
            to="/my"
            className="pb-0.5 text-sm text-[#555] no-underline"
            activeProps={{
              className: "border-b-2 border-[#111] !font-semibold !text-[#111]",
            }}
          >
            내정보
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="h-9 w-9 cursor-pointer rounded-full border border-[#ddd] bg-white"
          aria-label="검색"
        >
          🔍
        </button>

        {isLoggedIn ? (
          <button
            type="button"
            className="cursor-pointer rounded-md border border-[#2f5bea] bg-white px-4 py-2 text-sm font-semibold text-[#2f5bea]"
          >
            마이페이지
          </button>
        ) : (
          <button
            type="button"
            className="cursor-pointer rounded-md border-0 bg-[#2f5bea] px-4 py-2 text-sm font-semibold text-white"
          >
            로그인
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;