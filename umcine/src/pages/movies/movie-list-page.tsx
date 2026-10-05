import MovieGrid from "../../components/movies/movie-grid";
import { toggleBookmark, useMovieList } from "../../stores/movie-store";

export const MovieListPage = () => {
  // 북마크 상태는 페이지 밖(store)에 있어서, 상세 페이지에 다녀와도 유지돼요.
  const movieList = useMovieList();

  return (
    // Figma: 좌우 80px / 상하 24px 여백, 제목과 목록 사이 20px
    <main className="flex flex-col gap-5 px-20 py-6">
      <h1 className="text-[38px] leading-[44px] font-bold">영화 목록</h1>
      <MovieGrid movies={movieList} onToggleBookmark={toggleBookmark} />
    </main>
  );
};