import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/members/me";
import { useAuthStore } from "../../stores/auth-store";
import { useFavorites } from "../../hooks/use-favorites";

export function MyPage() {
  const accessToken = useAuthStore(
    (state) => state.accessToken,
  );

  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const favoritesQuery = useFavorites();

  if (!accessToken) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#f8f9fa]">
        <p className="text-sm text-gray-500">
          로그인이 필요합니다.
        </p>
      </main>
    );
  }

  if (meQuery.isPending) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#f8f9fa]">
        <p className="text-sm text-gray-500">
          내 정보를 불러오는 중...
        </p>
      </main>
    );
  }

  if (meQuery.isError) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#f8f9fa]">
        <p className="text-sm text-red-500">
          내 정보를 불러오지 못했어요.
        </p>
      </main>
    );
  }

  const profile = meQuery.data;

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#f8f9fa] px-5 py-12">
      <div className="w-full max-w-[420px]">
        <h1 className="mb-6 text-2xl font-bold text-[#111111]">
          내 정보
        </h1>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-6">
            <p className="mb-2 text-xs font-bold text-gray-500">
              이메일
            </p>

            <p className="text-sm text-[#111111]">
              {profile.email}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs font-bold text-gray-500">
              닉네임
            </p>

            <p className="text-sm text-[#111111]">
              {profile.nickname}
            </p>
          </div>
        </div>

        <Link
          to="/mypage/edit"
          className="mt-5 block rounded-md bg-[#4b63e6] py-3 text-center text-sm font-bold text-white"
        >
          내 정보 수정
        </Link>

        <h2 className="mb-4 mt-10 text-xl font-bold text-[#111111]">
          내 즐겨찾기
        </h2>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          {favoritesQuery.isPending ? (
            <p className="text-sm text-gray-500">
              즐겨찾기를 불러오는 중...
            </p>
          ) : favoritesQuery.isError ? (
            <p className="text-sm text-red-500">
              즐겨찾기를 불러오지 못했어요.
            </p>
          ) : favoritesQuery.data.length === 0 ? (
            <p className="text-sm text-gray-500">
              아직 즐겨찾기한 영화가 없어요.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {favoritesQuery.data.map((favorite) => (
                <Link
                  key={favorite.movieId}
                  to="/movies/$movieId"
                  params={{
                    movieId: String(favorite.movieId),
                  }}
                  className="rounded-md border border-gray-200 px-4 py-3 text-sm text-[#111111] hover:border-[#4b63e6]"
                >
                  {favorite.title ||
                    `영화 #${favorite.movieId}`}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
