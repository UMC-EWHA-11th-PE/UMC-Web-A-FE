import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../api/movies/get-movies";

import MovieGrid from "../../components/movies/movie-grid";
import { MovieSortToggle } from "../../components/movies/movie-sort-toggle";
import Pagination from "../../components/movies/pagination";
import { useViewSettingsStore } from "../../stores/view-settings-store";

export const MovieListPage = () => {
  const [page, setPage] = useState(1);

  // 페이지 번호를 query key에 포함해, 페이지마다 목록을 따로 캐시한다
  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page }],
    queryFn: () => getMovies({ page }),
  });

  const movieList = moviesQuery.data?.results ?? [];
  const totalPages = moviesQuery.data?.total_pages ?? 0;

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

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
      {moviesQuery.isPending ? (
        <p>영화 목록을 불러오는 중이에요.</p>
      ) : moviesQuery.isError ? (
        <p>영화 목록을 불러오지 못했어요.</p>
      ) : sortedMovies.length === 0 ? (
        <p>조건에 맞는 영화가 없어요.</p>
      ) : (
        <MovieGrid movies={sortedMovies} />
      )}
      {/* 로딩 중에도 이전 버튼으로 돌아갈 수 있도록 분기 밖에 둔다 */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
};