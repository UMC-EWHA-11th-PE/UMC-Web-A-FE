import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import MovieGrid from "./components/movie-grid";
import Footer from "./components/footer";
import { movies } from "./data/movies";
import type { Movie } from "./types/movie";

export default function App() {
  const [movieList, setMovieList] = useState<Movie[]>(movies);

  const handleToggleBookmark = (id: number) => {
    setMovieList((prev) =>
      prev.map((movie) =>
        movie.id === id ? { ...movie, isBookmarked: !movie.isBookmarked } : movie
      )
    );
  };

  return (
    <>
      <Header />
      <main className="movie-list">
        <h1 className="movie-list__title">영화 목록</h1>
        <MovieGrid movies={movieList} onToggleBookmark={handleToggleBookmark} />
      </main>
      <Footer />
    </>
  );
}