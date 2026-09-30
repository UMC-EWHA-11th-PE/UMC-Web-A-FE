
import { useState } from "react";

import { Pagination } from "../../components/movies/pagination";
import { MovieGrid } from "../../components/movies/movie-grid";
import { movies } from "../../data/movies";



export function MovieListPages() {
  const totalPages = Math.ceil(movies.length/10);


  const [pageState, setPage] = useState(1);

  function handlePageChange (page: number) {
    setPage(() => 
      ((pageState >0) && (pageState < totalPages))?
        page:pageState
      )
  }



  return (
    <main className="flex items-center justify-between box-border flex-col items-start w-[1440px] h-auto gap-[30px] px-20 py-6">
      <h1 className="box-border text-center mt-0 w-[134px] h-11 font-bold text-[38px]/[44px] tracking-[-1.71px] align-middle text-[#17191E]">영화 목록</h1>

      <MovieGrid
        movies={movies.slice((pageState-1)*10, ( (pageState*10<movies.length) ? pageState*10 : movies.length)) }
      />

      <Pagination
        currentPage={pageState}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

    </main>
  );
}