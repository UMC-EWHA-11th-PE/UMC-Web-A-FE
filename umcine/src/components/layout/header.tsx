import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/members/me";
import { useAuthStore } from "../../stores/auth-store";
import search from "../../assets/search.svg";

function Header() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  return (
    <header className="flex items-center justify-between border-b border-[#e5e5e5] bg-white px-8 py-4">
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-lg font-bold text-[#111] no-underline"
        >
          영화
        </Link>

        <Link to="/search" className="pb-0.5 text-sm text-[#555] no-underline">
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
        <Link
          to="/search"
          aria-label="검색"
          className="grid h-9 w-9 place-items-center rounded-full border border-[#ddd] bg-white"
        >
          <img src={search} alt="" className="h-5 w-5" />
        </Link>

        {!accessToken ? (
          <Link
            to="/login"
            className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white no-underline"
          >
            로그인
          </Link>
        ) : meQuery.isLoading ? (
          <span
            className="h-10 w-24 animate-pulse rounded-lg bg-gray-200"
            role="status"
            aria-label="내 정보 불러오는 중"
          />
        ) : (
          <Link
            to="/my"
            className="rounded-md border border-[#2f5bea] bg-white px-4 py-2 text-sm font-semibold text-[#2f5bea] no-underline"
          >
            마이페이지
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
