import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../api/movies/get-movies";
import { MovieGrid } from "../../components/movies/movie-grid";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

export function MovieListPage() {
  const [page, setPage] = useState(1);

  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page }],
    queryFn: () => getMovies({ page }),
  });

  const movies = moviesQuery.data?.results ?? [];
  const totalPages = moviesQuery.data?.total_pages ?? 0;

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <div className="w-full px-10">
        <h1 className="mb-6 text-2xl font-bold text-[#111111]">
          영화 목록
        </h1>

        {moviesQuery.isPending ? (
          <p role="status">영화 목록을 불러오는 중이에요.</p>
        ) : moviesQuery.isError ? (
          <p role="alert">
            {moviesQuery.error.message}
          </p>
        ) : movies.length === 0 ? (
          <p>조건에 맞는 영화가 없어요.</p>
        ) : (
          <>
            <MovieGrid
              movies={movies.map((movie) => ({
                id: movie.id,
                title: movie.title,
                releaseDate: movie.release_date,
                posterPath: getTmdbPosterUrl(movie.poster_path),
              }))}
            />

            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="rounded-lg border px-4 py-2 disabled:opacity-40"
              >
                이전
              </button>

              <span className="text-sm">
                {page} / {totalPages}
              </span>

              <button
                type="button"
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
                className="rounded-lg border px-4 py-2 disabled:opacity-40"
              >
                다음
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
