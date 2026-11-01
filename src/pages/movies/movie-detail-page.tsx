import { Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { BookmarkButton } from "../../components/bookmark-button";
import {
  getTmdbBackdropUrl,
  getTmdbPosterUrl,
} from "../../utils/movies/tmdb-image";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";

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
    staleTime: 30 * 1000,
  });

  if (!isValidMovieId) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <p role="alert" className="text-lg text-gray-500">
          올바르지 않은 영화 번호예요.
        </p>
      </main>
    );
  }

  if (movieDetailQuery.isPending) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <p role="status" className="text-lg text-gray-500">
          영화 정보를 불러오는 중이에요.
        </p>
      </main>
    );
  }

  if (movieDetailQuery.isError) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <p role="alert" className="text-lg text-gray-500">
          {getMovieDetailErrorMessage(movieDetailQuery.error)}
        </p>
      </main>
    );
  }

  const movie = movieDetailQuery.data;

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
                {movie.genres.map((genre) => genre.name).join(" · ") ||
                  "장르 정보 없음"}
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
