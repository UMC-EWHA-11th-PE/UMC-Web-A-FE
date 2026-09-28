import { useState } from "react";
import MovieGrid from "../../components/movies/movie-grid";
import { movies } from "../../data/movies";
import type { Movie } from "../../types/movie";

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
    // Figma: 좌우 80px / 상하 24px 여백, 제목과 목록 사이 20px
    <main className="flex flex-col gap-5 px-20 py-6">
      <h1 className="text-[38px] leading-[44px] font-bold">영화 목록</h1>
      <MovieGrid movies={movieList} onToggleBookmark={handleToggleBookmark} />
    </main>
  );
};