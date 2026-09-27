import "./App.css";

import { useState } from "react";

import { Header } from "./components/header";
import { Pagination } from "./components/pagination";
import { MovieGrid } from "./components/movie-grid";
import { movies } from "./data/movies";



export default function App() {
  const totalPages = Math.ceil(movies.length/10);


  const [pageState, setPage] = useState(1);

  function handlePageChange (page: number) {
    setPage(() => 
      ((pageState >0) && (pageState < totalPages))?
        page:pageState
      )
  }


  return (
    <main className="main">
      <Header
        isLoggedIn={true}
      />
      <h1>영화 목록</h1>

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