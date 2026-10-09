import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { BookmarkButton } from "../../components/bookmark-button";
import {
  getTmdbBackdropUrl,
  getTmdbPosterUrl,
} from "../../utils/movies/tmdb-image";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const parsedMovieId = Number(movieId);

  const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    setMovie(null);
    setErrorMessage(null);

    if (
      !Number.isInteger(parsedMovieId) ||
      parsedMovieId <= 0
    ) {
      setErrorMessage("올바르지 않은 영화 번호예요.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    getMovieDetail(parsedMovieId)
      .then((response) => {
        if (!ignore) setMovie(response);
      })
      .catch((error: unknown) => {
        if (!ignore) {
          setErrorMessage(getMovieDetailErrorMessage(error));
        }
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [parsedMovieId]);

  if (isLoading) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <p role="status" className="text-lg text-gray-500">
          영화 정보를 불러오는 중이에요.
        </p>
      </main>
    );
  }

  if (errorMessage || !movie) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <p role="alert" className="text-lg text-gray-500">
          {errorMessage || "영화 정보를 찾을 수 없어요."}
        </p>
      </main>
    );
  }

  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const posterUrl = getTmdbPosterUrl(movie.poster_path);

  const runtimeText =
    movie.runtime === null
      ? "상영 시간 정보가 없어요."
      : `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`;

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <section className="relative h-[300px] w-full overflow-hidden bg-gray-200 md:h-[400px]">
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            이미지 없음
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[1200px] px-5 pb-8">
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              {movie.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-8">
        <Link
          to="/"
          className="mb-6 inline-block text-sm font-medium text-blue-600"
        >
          ← 영화 목록
        </Link>

        <div className="flex flex-col gap-8 md:flex-row">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`${movie.title} 포스터`}
              className="w-full max-w-[220px] self-center rounded-lg object-cover md:self-start"
            />
          ) : (
            <div className="flex aspect-[2/3] w-full max-w-[220px] items-center justify-center self-center rounded-lg bg-gray-200 text-gray-500 md:self-start">
              이미지 없음
            </div>
          )}

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#111111]">
              {movie.title}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {movie.original_title}
            </p>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
              <span>{movie.release_date || "개봉일 정보 없음"}</span>
              <span>
                {movie.genres.map((genre) => genre.name).join(" · ") || "장르 정보 없음"}
              </span>
              <span>{runtimeText}</span>
            </div>

            <div className="mt-5">
              <BookmarkButton movieId={movie.id} />
            </div>

            {movie.tagline && (
              <h3 className="mt-8 text-lg font-bold text-[#111111]">
                {movie.tagline}
              </h3>
            )}

            <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-700">
              {movie.overview || "줄거리 정보가 없어요."}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
