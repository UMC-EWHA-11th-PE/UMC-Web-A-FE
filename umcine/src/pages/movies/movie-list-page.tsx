import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { useState, useEffect } from "react";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";

const MovieListPage = () => {
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function loadMovies() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await getMovies({ page });

        if (!ignore) {
          setMovies(response.results);
          setTotalPages(Math.min(response.total_pages, 500));
        }
      } catch {
        if (!ignore) {
          setErrorMessage("영화 목록을 불러오지 못했어요.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadMovies();

    return () => {
      ignore = true;
    };
  }, [page]);

  if (isLoading) {
    return <main className="flex-1 p-5">불러오는 중이에요.</main>;
  }

  if (errorMessage) {
    return <main className="flex-1 p-5">{errorMessage}</main>;
  }

  if (movies.length === 0) {
    return <main className="flex-1 p-5">표시할 영화가 없어요.</main>;
  }

  return (
    <main className="flex-1">
      <MovieGrid movies={movies} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </main>
  );
};

export default MovieListPage;
