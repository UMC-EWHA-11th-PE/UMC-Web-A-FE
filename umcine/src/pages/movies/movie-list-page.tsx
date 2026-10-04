
import { useState, useEffect } from "react";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";

import { Pagination } from "../../components/movies/pagination";
import { MovieGrid } from "../../components/movies/movie-grid";
//import { movies } from "../../data/movies";



export function MovieListPages() {

  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    async function loadMovies() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await getMovies({ page: 1 });
        if (!ignore) setMovies(response.results);
      } catch {
        if (!ignore) setErrorMessage("영화 목록을 불러오지 못했어요.");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadMovies();

    return () => {
      ignore = true;
    };
  }, []);



  const totalPages = 500;
  const [pageState, setPage] = useState(1);
  
  const changePage = (newPage: number) => {
    setPage(newPage)
  }


  if(isLoading){
    return (
      <p>영화 목록을 불러오는 중이에요.</p>
    )
  }

  if(errorMessage != null) {
    return (
    <p>{errorMessage}</p>
    )
  }

  return (

    <main className="flex m-auto box-border flex-col w-[1440px] gap-[30px] px-20 py-6">
      <h1 className="box-border text-center mt-0 w-[134px] h-11 font-bold text-[38px]/[44px] tracking-[-1.71px] align-middle text-[#17191E]">영화 목록</h1>

      <MovieGrid
        movies={movies.slice((pageState-1)*10, ( (pageState*10<movies.length) ? pageState*10 : movies.length)) }
      />

      <div className="flex justify-center self-center w-fulls">
        <Pagination
          currentPage={pageState}
          totalPages={totalPages}
          onPageChange={changePage}
        />
      </div>

    </main>
  );
}