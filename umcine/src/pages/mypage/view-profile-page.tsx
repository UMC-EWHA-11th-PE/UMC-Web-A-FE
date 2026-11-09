import { MovieGrid } from "../../components/movies/movie-grid"
import { Pagination } from "../../components/movies/pagination"
//import { getBookmarkMovie } from "../../api/movies/get-movies";
import type { TmdbMovie } from "../../api/movies/models";
import { useBookmarkStore } from "../../stores/bookmark-store";
import { getMovies } from "../../api/movies/get-movies";
import { Link } from "@tanstack/react-router";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";



export function ViewProfilePage() {


  const [page, setPage] = useState(1);

  const changePage = (nextPage: number) => {
    setPage(nextPage);
  }

  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page }],
    queryFn: () => getMovies({ page }),
  })




  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds
  );


  const movies = moviesQuery.data?.results ?? [];
  const bookmarkedMovies = movies.filter((movie : TmdbMovie) =>
    bookmarkedMovieIds.includes(movie.id)
  );

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
                <p className="text-[14px] font-bold">gs0428</p>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-regular text-[#969DA8]">이메일</p>
              <p className="text-[14px] font-bold">gwangsoo@cinemalab.kr</p>
            </div>
          </div>

        </div>

        <div className="flex flex-col my-5 gap-4">
          <h2 className="text-[17px] font-bold">내 즐겨찾기</h2>

          <MovieGrid
            movies={bookmarkedMovies}
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