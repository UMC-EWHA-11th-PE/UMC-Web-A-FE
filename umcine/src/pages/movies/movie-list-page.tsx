import { useEffect, useState } from "react";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";

import MovieGrid from "../../components/movies/movie-grid";
import { MovieSortToggle } from "../../components/movies/movie-sort-toggle";
import { useViewSettingsStore } from "../../stores/view-settings-store";

export const MovieListPage = () => {
  const [movieList, setMovieList] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadMovies() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await getMovies({page : 1});
        if (!ignore) setMovieList(response.results);
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

  const sortOrder = useViewSettingsStore((state) => state.sortOrder);
  const sortedMovies = [...movieList].sort((a, b) => {
    if (sortOrder === "latest") return b.release_date.localeCompare(a.release_date);
    if (sortOrder === "title") return a.title.localeCompare(b.title, "ko");
    return 0;
  });

  return (
    // Figma: 좌우 80px / 상하 24px 여백, 제목과 목록 사이 20px
    <main className="flex flex-col gap-5 px-20 py-6">
      <h1 className="text-[38px] leading-[44px] font-bold">영화 목록</h1>
      <MovieSortToggle />
      {isLoading ? (
        <p>영화 목록을 불러오는 중이에요.</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : sortedMovies.length === 0 ? (
        <p>조건에 맞는 영화가 없어요.</p>
      ) : (
        <MovieGrid movies={sortedMovies} />
      )}
    </main>
  );
};