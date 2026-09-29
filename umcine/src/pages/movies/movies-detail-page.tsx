import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-5 bg-[#f7f7f8] px-5 py-24">
        <h1 className="text-xl font-bold text-[#111]">
          영화를 찾을 수 없어요.
        </h1>

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
      <img
        src={movie.backdropPath}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#111827]/95 via-[#111827]/85 to-[#111827]/65"
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
          <img
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
            className="aspect-[2/3] w-48 shrink-0 self-center rounded-xl bg-white/10 object-cover shadow-2xl sm:w-56 sm:self-start lg:w-72"
          />

          <div className="min-w-0 flex-1 sm:py-3">
            <h1 className="break-words text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {movie.title}
            </h1>

            <p className="mt-3 text-base text-white/60 sm:text-lg">
              {movie.originalTitle}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90"
                >
                  {genre}
                </span>
              ))}
            </div>

            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4 text-sm">
              <div>
                <dt className="text-white/50">개봉일</dt>
                <dd className="mt-1 font-medium">{movie.releaseDate}</dd>
              </div>

              <div>
                <dt className="text-white/50">상영 시간</dt>
                <dd className="mt-1 font-medium">{movie.runtime}</dd>
              </div>
            </dl>

            <section className="mt-8 border-t border-white/15 pt-8">
              <h2 className="text-xl font-semibold leading-relaxed text-white sm:text-2xl">
                {movie.tagline}
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
                {movie.overview}
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}