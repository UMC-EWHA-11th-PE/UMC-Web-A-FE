import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../api/movies/get-movies";

const MovieListPage = () => {
  const [page, setPage] = useState(1);

  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page }],
    queryFn: () => getMovies({ page }),
  });

  const movies = moviesQuery.data?.results ?? [];
  const totalPages = Math.min(moviesQuery.data?.total_pages ?? 0, 500);

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  if (moviesQuery.isPending) {
    return <main className="flex-1 p-5">불러오는 중이에요.</main>;
  }

  if (moviesQuery.isError) {
    return <main className="flex-1 p-5">영화 목록을 불러오지 못했어요.</main>;
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
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default MovieListPage;
