import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";
import { BookmarkButton } from "../../components/bookmark-button";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <p className="text-lg text-gray-500">
          영화를 찾을 수 없어요.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <section className="relative h-[300px] w-full overflow-hidden md:h-[400px]">
        <img
          src={movie.backdropPath}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />

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
          <img
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
            className="w-full max-w-[220px] self-center rounded-lg object-cover md:self-start"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#111111]">
              {movie.title}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {movie.originalTitle}
            </p>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
              <span>{movie.releaseDate}</span>
              <span>{movie.genres.join(" · ")}</span>
              <span>{movie.runtime}</span>
            </div>

            <div className="mt-5">
              <BookmarkButton movieId={movie.id} />
            </div>

            <h3 className="mt-8 text-lg font-bold text-[#111111]">
              {movie.tagline}
            </h3>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-700">
              {movie.overview}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}