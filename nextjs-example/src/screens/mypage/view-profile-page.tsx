"use client";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import { deleteFavorite } from "../../api/favorites/delete-favorite";
import { getFavorites } from "../../api/favorites/get-favorites";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { getMe } from "../../api/members/me";
import MovieGrid from "@/components/movies/movie-grid";

export function ViewProfilePage() {
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery({
    queryKey: ["favorites", "list"],
    queryFn: getFavorites,
  });

  const favorites = favoritesQuery.data ?? [];

  const favoriteMovieQueries = useQueries({
    queries: favorites.map(({ movieId }) => ({
      queryKey: ["movies", "detail", movieId],
      queryFn: () => getMovieDetail(movieId),
    })),
  });

  const removeFavorite = useMutation({
    mutationFn: deleteFavorite,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["favorites", "list"] }),
        queryClient.invalidateQueries({ queryKey: ["favorites", "detail"] }),
      ]);
    },
  });
  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
  });

  return (
    <div className="flex w-full justify-center mx-12">
      <div className="flex flex-col max-w-[1280px] min-w-[50%]">
        <div className="flex flex-row justify-between items-center w-full my-5">
          <h1 className="text-[31px] font-bold">내 정보</h1>
          <Link
            href="/my-edit"
            className="mr-22 inline-flex h-[42px] items-center justify-center rounded-[8px] border border-white bg-[#2563EB] px-4 text-[14px] font-bold text-white"
          >
            정보 수정
          </Link>
        </div>

        <div className="flex flex-col py-5 gap-[16px] border-y border-y-[#E3E6EB]">
          <h2 className="text-[17px] font-bold">기본 정보</h2>

          <div className="flex flex-row h-[82px]">
            <div className="flex flex-row w-[50%] gap-[28px]">
              <img
                src="/icons/person.svg"
                className="w-[82px] h-[82px] rounded-full p-5 bg-[#E3E6EB]"
              />
              <div className="flex flex-col">
                <p className="text-[11px] font-regular text-[#969DA8]">
                  닉네임
                </p>
                <p className="text-[14px] font-bold">
                  {meQuery.data?.nickname ??
                    (meQuery.isPending ? "불러오는 중…" : "조회 실패")}
                </p>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-regular text-[#969DA8]">이메일</p>
              <p className="text-[14px] font-bold">
                {meQuery.data?.email ??
                  (meQuery.isPending ? "불러오는 중…" : "조회 실패")}
              </p>
            </div>
          </div>
        </div>

        <section className="my-5 flex flex-col gap-4">
          <h2 className="text-[17px] font-bold">내 즐겨찾기</h2>

          {favoritesQuery.isPending && <p>즐겨찾기를 불러오는 중이에요.</p>}
          {favoritesQuery.isError && (
            <p role="alert">즐겨찾기를 불러오지 못했어요.</p>
          )}
          {favoritesQuery.isSuccess && favorites.length === 0 && (
            <p>아직 즐겨찾기한 영화가 없어요.</p>
          )}
          {removeFavorite.isError && (
            <p role="alert">
              즐겨찾기를 해제하지 못했어요. 다시 시도해 주세요.
            </p>
          )}

          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {favorites.map(({ movieId }, index) => {
              const movieQuery = favoriteMovieQueries[index];
              const movie = movieQuery?.data;

              return (
                <li
                  key={movieId}
                  className="overflow-hidden rounded-lg border border-[#E3E6EB]"
                >
                  <Link
                    href={`/movies/${movieId}`}
                    className="block text-inherit no-underline"
                  >
                    {movie?.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt=""
                        className="aspect-[2/3] w-full object-cover"
                      />
                    ) : (
                      <div className="grid aspect-[2/3] place-items-center bg-gray-100 text-xs text-gray-500">
                        {movieQuery?.isPending ? "불러오는 중" : "포스터 없음"}
                      </div>
                    )}
                    <p className="p-3 text-sm font-semibold">
                      {movie?.title ?? `영화 #${movieId}`}
                    </p>
                  </Link>

                  <button
                    type="button"
                    disabled={removeFavorite.isPending}
                    onClick={() => removeFavorite.mutate(movieId)}
                    className="mx-3 mb-3 rounded-md border px-3 py-1.5 text-xs disabled:opacity-50"
                  >
                    {removeFavorite.isPending &&
                    removeFavorite.variables === movieId
                      ? "해제 중"
                      : "즐겨찾기 해제"}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
