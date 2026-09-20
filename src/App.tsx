import { useState } from "react";
import { movies } from "./data/movies";
import { Header } from "./components/header";
import { MovieGrid } from "./components/movie-grid";
import type { Movie } from "./types/movie";
import "./App.css";

export default function App() {
  const [movieList, setMovieList] = useState<Movie[]>(movies);

  function handleToggleBookmark(id: number) {
    setMovieList((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, isBookmarked: !movie.isBookmarked } : movie
      )
    );
  }

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <h2 className="page-title">영화 목록</h2>
        <MovieGrid movies={movieList} onToggleBookmark={handleToggleBookmark} />
      </main>
    </div>
  );
}