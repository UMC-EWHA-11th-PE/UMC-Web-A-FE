import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFavorite } from "../../api/favorites/get-favorite";
import { addFavorite } from "../../api/favorites/add-favorite";
import { deleteFavorite } from "../../api/favorites/delete-favorite";
import { getMemberRatings } from "../../api/ratings/get-member-ratings";
import { createRating } from "../../api/ratings/create-ratings";
import { updateRating } from "../../api/ratings/update-ratings";
import { deleteRating } from "../../api/ratings/delete-ratings";
import { useAuthStore } from "../../stores/auth-store";
import { Link, useParams } from "@tanstack/react-router";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { useState } from "react";

function getMemberId(accessToken: string | null): number | null {
  if (!accessToken) return null;

  try {
    const payload = accessToken.split(".")[1];
    if (!payload) return null;

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const { sub } = JSON.parse(atob(base64)) as { sub?: unknown };
    if (typeof sub !== "string") return null;

    const memberId = Number(sub);
    return Number.isSafeInteger(memberId) && memberId > 0 ? memberId : null;
  } catch {
    return null;
  }
}

function RatingStars({
  initialScore,
  disabled,
}: {
  initialScore: number;
  disabled: boolean;
}) {
  const [score, setScore] = useState(initialScore);

  return (
    <fieldset disabled={disabled} className="flex gap-1.5">
      <legend className="sr-only">별점</legend>

      {[1, 2, 3, 4, 5].map((value) => (
        <label key={value} className="relative">
          <input
            type="radio"
            name="score"
            value={value}
            checked={score === value}
            onChange={() => setScore(value)}
            aria-label={`${value}점`}
            required
            className="peer sr-only"
          />
          <span className="grid h-10 w-10 cursor-pointer place-items-center rounded-lg border border-[#dce1e8] bg-white hover:border-[#929bab] peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
            <img
              src={
                value <= score ? "/icons/star.svg" : "/icons/star-outline.svg"
              }
              alt=""
              className="h-6 w-6"
            />
          </span>
        </label>
      ))}
    </fieldset>
  );
}

export function MovieDetailPage() {
  const { movieId: movieIdParam } = useParams({
    from: "/movies/$movieId",
  });

  const movieId = Number(movieIdParam);
  const isValidMovieId = Number.isInteger(movieId) && movieId > 0;

  const movieDetailQuery = useQuery({
    queryKey: ["movies", "detail", movieId],
    queryFn: () => getMovieDetail(movieId),
    enabled: isValidMovieId,
  });

  const movie = movieDetailQuery.data;

  const accessToken = useAuthStore((state) => state.accessToken);
  const memberId = getMemberId(accessToken);
  const queryClient = useQueryClient();

  const favoriteKey = ["favorites", "detail", memberId, movieId] as const;
  const ratingsKey = ["ratings", "member", memberId] as const;

  const favoriteQuery = useQuery({
    queryKey: favoriteKey,
    queryFn: () => getFavorite(movieId),
    enabled: memberId !== null && isValidMovieId,
  });

  const ratingsQuery = useQuery({
    queryKey: ratingsKey,
    queryFn: () => getMemberRatings(memberId!),
    enabled: memberId !== null && isValidMovieId,
  });

  const myRating = ratingsQuery.data?.find(
    (rating) => rating.movieId === movieId,
  );
  const isFavorite = favoriteQuery.data === true;

  const favoriteMutation = useMutation({
    mutationFn: async (currentlyFavorited: boolean): Promise<void> => {
      if (currentlyFavorited) {
        await deleteFavorite(movieId);
      } else {
        await addFavorite(movieId);
      }
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: favoriteKey }),
        queryClient.invalidateQueries({ queryKey: ["favorites", "list"] }),
      ]);
    },
  });

  const saveRatingMutation = useMutation({
    mutationFn: async ({
      score,
      comment,
    }: {
      score: number;
      comment: string;
    }) => {
      if (myRating) {
        await updateRating(myRating.ratingId, { score, comment });
      } else {
        await createRating({ movieId, score, comment });
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ratingsKey }),
  });

  const deleteRatingMutation = useMutation({
    mutationFn: deleteRating,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ratingsKey }),
  });

  const isRatingBusy =
    saveRatingMutation.isPending || deleteRatingMutation.isPending;

  const statusMessage = !isValidMovieId
    ? "올바르지 않은 영화 번호예요."
    : movieDetailQuery.isPending
      ? "불러오는 중이에요."
      : movieDetailQuery.isError
        ? "영화 정보를 불러오지 못했어요."
        : !movie
          ? "영화를 찾을 수 없어요."
          : null;

  if (statusMessage || !movie) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-5 bg-[#f7f7f8] px-5 py-24">
        <h1 className="text-xl font-bold text-[#111]">{statusMessage}</h1>

        <Link
          to="/"
          className="rounded-lg bg-[#2f5bea] px-5 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-[#2448c7]"
        >
          영화 목록으로 돌아가기
        </Link>
      </main>
    );
  }

  return (
    <main className="relative isolate flex-1 overflow-hidden bg-[#111827] text-white">
      {movie.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg -gradient-to-r from-[#111827]/95 via-[#111827]/85 to-[#111827]/65"
      />

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-10 sm:py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded text-sm font-medium text-white/75 no-underline transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <span aria-hidden="true">←</span>
          영화 목록
        </Link>

        <div className="mt-8 flex flex-col gap-8 sm:mt-12 sm:flex-row sm:items-start sm:gap-10 lg:gap-14">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} 포스터`}
              className="aspect-[2/3] w-48 shrink-0 self-center rounded-xl bg-white/10 object-cover shadow-2xl sm:w-56 sm:self-start lg:w-72"
            />
          ) : (
            <div className="flex aspect-[2/3] w-48 shrink-0 items-center justify-center self-center rounded-xl bg-white/10 text-white/60 sm:w-56 sm:self-start lg:w-72">
              포스터가 없어요.
            </div>
          )}
          <div className="min-w-0 flex-1 sm:py-3">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
              <div className="min-w-0">
                <h1 className="break-words text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  {movie.title}
                </h1>

                <p className="mt-3 text-base text-white/60 sm:text-lg">
                  {movie.original_title}
                </p>

                {memberId === null ? (
                  <Link
                    to="/login"
                    className="mt-5 inline-block text-sm underline"
                  >
                    로그인하고 즐겨찾기와 평점 남기기
                  </Link>
                ) : (
                  <div className="mt-5 space-y-4">
                    <button
                      type="button"
                      aria-pressed={isFavorite}
                      disabled={
                        !favoriteQuery.isSuccess || favoriteMutation.isPending
                      }
                      onClick={() => favoriteMutation.mutate(isFavorite)}
                      className={`rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-50 ${
                        isFavorite
                          ? "bg-yellow-400 text-[#111827]"
                          : "bg-white/15 text-white"
                      }`}
                    >
                      {favoriteQuery.isPending
                        ? "즐겨찾기 확인 중"
                        : isFavorite
                          ? "★ 즐겨찾기 해제"
                          : "☆ 즐겨찾기 추가"}
                    </button>

                    {favoriteQuery.isError && (
                      <p role="alert" className="text-sm">
                        즐겨찾기를 불러오지 못했어요.
                      </p>
                    )}
                    {favoriteMutation.isError && (
                      <p role="alert" className="text-sm">
                        즐겨찾기 변경에 실패했어요.
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4 text-sm">
                  <div>
                    <dt className="text-white/50">개봉일</dt>
                    <dd className="mt-1 font-medium">
                      {movie.release_date || "정보 없음"}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-white/50">상영 시간</dt>
                    <dd className="mt-1 font-medium">
                      {movie.runtime != null && movie.runtime > 0
                        ? `${movie.runtime}분`
                        : "정보 없음"}
                    </dd>
                  </div>
                </dl>
              </div>

              {memberId !== null && (
                <div className="min-w-0 lg:border-l lg:border-white/15 lg:pl-6">
                  <section className="max-w-md rounded-lg border border-white/20 p-4">
                    <h2 className="mb-3 font-semibold">내 평점</h2>

                    {ratingsQuery.isPending && (
                      <p className="text-sm">평점 불러오는 중</p>
                    )}
                    {ratingsQuery.isError && (
                      <p role="alert" className="text-sm">
                        평점을 불러오지 못했어요.
                      </p>
                    )}

                    {ratingsQuery.isSuccess && (
                      <form
                        key={JSON.stringify([memberId, movieId, myRating])}
                        className="space-y-3"
                        onSubmit={(event) => {
                          event.preventDefault();
                          if (isRatingBusy) return;

                          const formData = new FormData(event.currentTarget);
                          deleteRatingMutation.reset();
                          saveRatingMutation.mutate({
                            score: Number(formData.get("score")),
                            comment: String(
                              formData.get("comment") ?? "",
                            ).trim(),
                          });
                        }}
                      >
                        <p className="text-xs text-[#667085]">
                          별점은 필수, 후기는 선택이에요.
                        </p>

                        <RatingStars
                          initialScore={myRating?.score ?? 0}
                          disabled={isRatingBusy}
                        />

                        <textarea
                          name="comment"
                          aria-label="영화를 보고 느낀 점"
                          placeholder="영화를 보고 느낀 점을 남겨보세요."
                          defaultValue={myRating?.comment ?? ""}
                          maxLength={500}
                          disabled={isRatingBusy}
                          className="block min-h-28 w-full resize-y rounded-lg border border-[#dce1e8] bg-white px-3.5 py-4 text-sm text-[#17191d] placeholder:text-[#8b95a5] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />

                        <div className="flex gap-2">
                          <button
                            type="submit"
                            disabled={isRatingBusy}
                            className="rounded bg-blue-600 px-3 py-2 text-sm font-semibold disabled:opacity-50"
                          >
                            {myRating ? "평점 수정" : "평점 등록"}
                          </button>

                          {myRating && (
                            <button
                              type="button"
                              disabled={isRatingBusy}
                              onClick={() => {
                                saveRatingMutation.reset();
                                deleteRatingMutation.mutate(myRating.ratingId);
                              }}
                              className="rounded border border-white/30 px-3 py-2 text-sm disabled:opacity-50"
                            >
                              평점 삭제
                            </button>
                          )}
                        </div>
                      </form>
                    )}

                    {(saveRatingMutation.isError ||
                      deleteRatingMutation.isError) && (
                      <p role="alert" className="mt-2 text-sm">
                        평점 변경에 실패했어요.
                      </p>
                    )}
                  </section>
                </div>
              )}
            </div>

            <section className="mt-8 border-t border-white/15 pt-8">
              {movie.tagline && (
                <h2 className="text-xl font-semibold leading-relaxed text-white sm:text-2xl">
                  {movie.tagline}
                </h2>
              )}

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
                {movie.overview || "등록된 줄거리가 없어요."}
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
