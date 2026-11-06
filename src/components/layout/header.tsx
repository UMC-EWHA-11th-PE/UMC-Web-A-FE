import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex h-16 w-full items-center justify-between px-10">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold text-[#111111]">
            UMCine
          </Link>

          <nav className="flex items-center gap-6 text-sm text-gray-600">
            <Link to="/" className="hover:text-black">
              영화
            </Link>

            <Link to="/search" className="hover:text-black">
              검색
            </Link>
          </nav>
        </div>

        <button
          type="button"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          로그인
        </button>
      </div>
    </header>
  );
}