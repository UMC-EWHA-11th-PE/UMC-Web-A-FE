import { MovieGrid } from "../../components/movies/movie-grid"
import { Pagination } from "../../components/movies/pagination"
//import { getBookmarkMovie } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";

import { getMovies } from "../../api/movies/get-movies";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { Link } from "@tanstack/react-router";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useQueries } from "@tanstack/react-query";
import { useMeQuery } from "../../hooks/use-me-query";
import { useFavoritesQuery } from "../../hooks/use-favorite-query";



export function ViewProfilePage() {

  const {data: me} = useMeQuery();
  const {data:favorites = [] } = useFavoritesQuery();
  const [page, setPage] = useState(1);


  // 즐겨찾기한 영화 ID로 TMDB 상세 정보 조회
  const favoriteMovieQueries = useQueries({
    queries: favorites.map((favorite) => ({
      queryKey: ["movies", "detail", favorite.movieId],
      queryFn: () => getMovieDetail(favorite.movieId),
    })),
  });

  // 조회가 완료된 영화 데이터만 추출
  const favoriteMovies: TmdbMovieListItem[] = favoriteMovieQueries
    .map((query) => query.data)
    .filter((movie) => movie !== undefined)
    .map((movie) => ({
      ...movie,
      genre_ids: movie.genres.map((genre) => genre.id),
    }));



  const changePage = (nextPage: number) => {
    setPage(nextPage);
  }

  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page }],
    queryFn: () => getMovies({ page }),
  })

  const totalPages = moviesQuery.data?.total_pages ?? 0;



  return (
    <div className="flex w-full justify-center mx-12">
      <div className="flex flex-col max-w-[1280px] min-w-[50%]">

        <div className="flex flex-row justify-between items-center w-full my-5">
          <h1 className="text-[31px] font-bold">내 정보</h1>
          <Link
            to="/mypage/edit"
            className="items-center justify-between border border-white rounded-[8px] p-4 h-[42px] bg-[#2563EB] text-white text-[14px] font-extrabold mr-22"
          >
            정보 수정
          </Link>
        </div>

        <div className="flex flex-col py-5 gap-[16px] border-y border-y-[#E3E6EB]">

          <h2 className="text-[17px] font-bold">기본 정보</h2>

          <div className="flex flex-row h-[82px]">
            <div className="flex flex-row w-[50%] gap-[28px]">
              <img 
                src="/icons/person.svg" 
                className="w-[82px] h-[82px] rounded-full p-5 bg-[#E3E6EB]"
              />
              <div className="flex flex-col">
                <p className="text-[11px] font-regular text-[#969DA8]">닉네임</p>
                <p className="text-[14px] font-bold">{me?.nickname}</p>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-regular text-[#969DA8]">이메일</p>
              <p className="text-[14px] font-bold">{me?.email}</p>
            </div>
          </div>

        </div>

        <div className="flex flex-col my-5 gap-4">
          <h2 className="text-[17px] font-bold">내 즐겨찾기</h2>

          <MovieGrid
            movies={favoriteMovies}
          />

          <div className="flex justify-center self-center w-full">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={changePage}
            />
          </div>
        </div>

      </div>
    </div>

  )

}