import MovieGrid from "../../components/movies/movie-grid";
import { useMovieList } from "../../stores/movie-store";
import { MovieSortToggle } from "../../components/movies/movie-sort-toggle";
import { useViewSettingsStore } from "../../stores/view-settings-store";

export const MovieListPage = () => {
  // 북마크 상태는 페이지 밖(store)에 있어서, 상세 페이지에 다녀와도 유지돼요.
  const movieList = useMovieList();
  const sortOrder = useViewSettingsStore((state) => state.sortOrder);
  const sortedMovies = [...movieList].sort((a, b) => {
    if (sortOrder === "latest") return b.releaseDate.localeCompare(a.releaseDate);
    if (sortOrder === "title") return a.title.localeCompare(b.title, "ko");
    return 0;
  });

  return (
    // Figma: 좌우 80px / 상하 24px 여백, 제목과 목록 사이 20px
    <main className="flex flex-col gap-5 px-20 py-6">
      <h1 className="text-[38px] leading-[44px] font-bold">영화 목록</h1>
      <MovieSortToggle />
      <MovieGrid movies={sortedMovies} />
    </main>
  );
};