import { useEffect, useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { useBookmarkStore } from "../../stores/bookmark-store";
import { formatRuntime } from "../../utils/movies/format-runtime";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import { getTmdbBackdropUrl, getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const parsedMovieId = Number(movieId);
  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;

  const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    let ignore = false;

    setMovie(null);
    setErrorMessage(null);

    if (!Number.isInteger(parsedMovieId) || parsedMovieId <= 0) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    getMovieDetail(parsedMovieId)
      .then((response) => {
        if (!ignore) setMovie(response);
      })
      .catch((error) => {
        if (!ignore) setErrorMessage(getMovieDetailErrorMessage(error));
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [parsedMovieId]);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (!isValidMovieId) {
    return <main className="px-20 py-6">올바르지 않은 영화 번호예요.</main>;
  }

  if (isLoading) {
    return <main className="px-20 py-6">영화 정보를 불러오는 중이에요.</main>;
  }

  if (errorMessage) {
    return <main className="px-20 py-6">{errorMessage}</main>;
  }

  if (!movie) {
    return null;
  }

  const posterUrl = getTmdbPosterUrl(movie.poster_path);
  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);

  return (
    <main>
      {/* 상단 배경: 높이 360px, 왼쪽 위 뒤로가기 / 왼쪽 아래 제목 */}
      <section className="relative flex h-[360px] flex-col justify-between overflow-hidden px-20 py-6">
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-page text-sm text-fg-tertiary">
            이미지 없음
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-black/10" />

        <Link
          to="/"
          className="relative flex w-fit items-center gap-1 text-[13px] leading-4 font-bold text-white"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          영화 목록
        </Link>

        <div className="relative flex flex-col gap-2 text-white">
          <h1 className="text-[46px] leading-[50px] font-bold tracking-[-2.3px]">{movie.title}</h1>
          <p className="text-sm leading-[17px]">{movie.original_title}</p>
          <div className="flex items-center gap-2 text-[13px] leading-4 font-bold">
            <span>{movie.release_date}</span>
            <span>{movie.genres.map((genre) => genre.name).join(" · ")}</span>
            <span>{formatRuntime(movie.runtime)}</span>
          </div>
        </div>
      </section>

      {/* 본문: 포스터 200px + 줄거리 + 평점 패널 360px, 간격 32px */}
      <div className="flex items-start gap-8 px-20 py-6">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${movie.title} 포스터`}
            className="h-[286px] w-[200px] shrink-0 rounded-[10px] bg-page object-cover shadow-[0_12px_30px_rgba(12,15,20,0.12)]"
          />
        ) : (
          <div className="flex h-[286px] w-[200px] shrink-0 items-center justify-center rounded-[10px] bg-page text-sm text-fg-tertiary shadow-[0_12px_30px_rgba(12,15,20,0.12)]">
            이미지 없음
          </div>
        )}

        <section className="flex min-w-0 flex-1 flex-col items-start gap-3">
          <h2 className="text-[21px] leading-[25px] font-bold tracking-[-0.63px] text-fg">
            {movie.tagline}
          </h2>
          <p className="text-sm leading-6 text-fg-secondary">{movie.overview}</p>
          <DetailBookmarkButton movieId={movie.id} />
        </section>

        <aside className="flex w-[360px] shrink-0 flex-col gap-2 border-l border-line pb-[41px] pl-[30px]">
          <h2 className="text-[21px] leading-[25px] font-bold tracking-[-0.63px] text-fg">내 평점</h2>
          <p className="text-xs leading-[14px] text-fg-tertiary">별점은 필수, 후기는 선택이에요.</p>

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                type="button"
                aria-label={`${score}점`}
                className="grid size-[38px] cursor-pointer place-items-center rounded-lg border border-line bg-white text-2xl leading-none text-fg-secondary"
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            placeholder="영화를 보고 느낀 점을 남겨보세요."
            className="h-[102px] w-full resize-none rounded-lg border border-line bg-white px-3 pt-4 pb-[18px] text-[13px] leading-5 text-fg placeholder:text-fg-tertiary"
          />

          <button
            type="button"
            className="h-[42px] w-full cursor-pointer rounded-lg border border-white bg-fg text-sm font-extrabold text-white"
          >
            평점 저장
          </button>
        </aside>
      </div>
    </main>
  );
}

function DetailBookmarkButton({ movieId }: { movieId: number }) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId),
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  return (
    <button
      type="button"
      aria-pressed={isBookmarked}
      onClick={() => toggleBookmark(movieId)}
      className="inline-flex h-[42px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-white bg-action px-4 text-sm font-extrabold text-white"
    >
      <img
        src={isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
        alt=""
        className="size-4 invert"
      />
      {isBookmarked ? "즐겨찾기 해제" : "즐겨찾기"}
    </button>
  );
}