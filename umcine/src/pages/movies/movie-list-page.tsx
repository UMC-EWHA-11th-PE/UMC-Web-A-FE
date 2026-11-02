
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../api/movies/get-movies";

import { Pagination } from "../../components/movies/pagination";
import { MovieGrid } from "../../components/movies/movie-grid";


export function MovieListPages() {

  const [page, setPage] = useState(1);

  const changePage = (nextPage: number) => {
    setPage(nextPage);
  }

  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page }],
    queryFn: () => getMovies({ page }),
  })

  const movies = moviesQuery.data?.results ?? [];
  const totalPages = moviesQuery.data?.total_pages ?? 0;


  return (
    <>
    {moviesQuery.isPending ? (
      <p>영화를 불러오는 중이에요.</p>
    ) : moviesQuery.isError ? (
      <p>{moviesQuery.error.message}</p>
    ) : movies.length === 0 ? (
      <p>표시할 영화가 없어요.</p>
    ) : (
      <main className="flex m-auto box-border flex-col w-[1440px] gap-[30px] px-20 py-6">
        <h1 className="box-border text-center mt-0 w-[134px] h-11 font-bold text-[38px]/[44px] tracking-[-1.71px] align-middle text-[#17191E]">영화 목록</h1>

        <MovieGrid
          movies={movies}
        />

        <div className="flex justify-center self-center w-fulls">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={changePage}
          />
        </div>

      </main>
    )}

    </>
  )
}