import { useState } from "react";
import MovieGrid from "../../components/movies/movie-grid";
import { movies } from "../../data/movies";
import type { Movie } from "../../types/movie";
import "./movie-list-page.css";

export const MovieListPage = () => {
  const [movieList, setMovieList] = useState<Movie[]>(movies);

  const handleToggleBookmark = (id: number) => {
    setMovieList((prev) =>
      prev.map((movie) =>
        movie.id === id ? { ...movie, isBookmarked: !movie.isBookmarked } : movie
      )
    );
  };

  return (
    <main className="movie-list">
      <h1 className="movie-list__title">영화 목록</h1>
      <MovieGrid movies={movieList} onToggleBookmark={handleToggleBookmark} />
    </main>
  );
};