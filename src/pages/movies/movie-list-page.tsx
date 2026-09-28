import { useState } from "react";
import { movies } from "../../data/movies";
import { MovieGrid } from "../../components/movies/movie-grid";
import type { Movie } from "../../types/movie";

export function MovieListPage() {
  const [movieList, setMovieList] = useState<Movie[]>(movies);

  function handleToggleBookmark(id: number) {
    setMovieList((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie
      )
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <div className="w-full px-10">
        <h1 className="mb-6 text-2xl font-bold text-[#111111]">
          영화 목록
        </h1>

        <MovieGrid
          movies={movieList}
          onToggleBookmark={handleToggleBookmark}
        />
      </div>
    </main>
  );
}