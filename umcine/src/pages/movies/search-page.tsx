import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { movies } from "../../data/movies";
import { BookmarkButton } from "../../components/bookmark-button";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const searchResults = normalizedQuery
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.originalTitle.toLowerCase().includes(normalizedQuery),
      )
    : [];

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  


  if (!normalizedQuery) { 
    return (

      <main className="flex flex-col items-center gap-4 w-[1440px] h-[582px] px-18 pb-[210px] pt-[200px]">
        <h1 className="w-110 h-16 font-bold text-[46px] leading-14 tracking-[-0.023em] font-['Font_5'] align-middle" >어떤 영화를 찾고있나요?</h1>
        <form 
          onSubmit={handleSubmit}
          className="flex items-center w-[790px] h-[74px] pl-6 pr-[17px] gap-[14px] rounded-[12px] border-2 border-[#17191E] bg-white shadow-lg">
          <img src="/icons/search.svg" className="w-6 h-6" />
          <input
            aria-label="검색어"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            className="w-[637px] h-11 py-1 px=[1px]"
            placeholder="예: 스파이더맨"
          />
          <button type="submit" className="w-[59px] h-[42px] px-4 rounded-[12px] border border-[#17191E] bg-[#17191E] font-[Font_5] font-extrabold text-[14px] leading-none tracking-normal text-center align-middle text-white"
          >검색
          </button>
        </form>
      </main>
    

    )
  }


  else{
    return(
      <main className="felx flex-col w-[1440px] h-[1024px] px-20 py-6">

        <div className="flex flex-col justify-between w-[1280px] h-[115px]">
          <h1 className="flex w-[1208px] h-11 font-bold text-[38px] leading-[44px] tracking-[-1.71px] align-middle text-[#17191E]">영화 검색</h1>
          <form 
            onSubmit={handleSubmit}
            className="flex items-center w-auto max-w-[1280px] h-[54px] rounded-[9px] border pr-[10px] pl-[15px] gap-[18px] bg-white border-[#E3E6EB] align-middle">

            <img src="/icons/search.svg" className="w-6 h-6" />
            <input
              aria-label="검색어"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              className="w-[1065px] h-[19px] py-1 px=[1px] py-[2px]"
              placeholder="예: 스파이더맨"
            />

            <button>
              <img src="/icons/close.svg" className="w-6 h-6"/>
            </button>
            <button type="submit" className="w-[86px] h-[42px] px-4 rounded-[8px] border border-[#FFFFFF] bg-[#17191E] font-extrabold text-[14px] leading-none tracking-normal text-center align-middle text-white shrink-0"
            >다시 검색
            </button>
          </form>
        </div>


        <div className="flex flex-row items-center justify-between w-auto max-w-[1280px] h-[54px] border-y gab-[1045.8px] border-y-[#E3E6EB]">
          <h2 className="text-[18px] font-bold align-middle text-[#17191E]">‘{query}’ 검색 결과</h2>
          <p className="text-[12px] font-regular align-middle text-[#969DA8]">영화 {searchResults.length}편</p>
        </div>


        {searchResults.length === 0 ? (
          <p>검색 결과가 없어요.</p>
        ) : (
          <ul className="grid grid-cols-2 gap-x-0 gap-y-0 w-full">
            {searchResults.map((movie) => (
              <li key={movie.id}
                className="flex flex-row gap-[18px] w-auto h-[240px] border-b py-[20px] border-b-[#E3E6EB]"
              >
                <img src={movie.posterPath} alt={`${movie.title} 포스터`} 
                  className="w-[126px] h-[190px] rounded-[10px] bg-[#F6F7F9]"
                />
                
                <div className="flex flex-col gap-[8px]">
                  <h3 className="text-[18px] font-bold leading-[24.3px] align-middle text-[#17191E]">{movie.title}</h3>
                  <div className="flex flex-row h-[14px] gap-2 items-center font-regular text-3 text-[#969DA8]">
                    <p>{movie.originalTitle}</p>
                    <p>{movie.releaseDate}</p>
                  </div>
                  <p className="text-[12.5px] font-regular leading-[20px] text-[#606774]">{movie.overview}</p>


                  <BookmarkButton
                    movieId={movie.id} 
                    buttonStyle="right-[10px] top-[10px] flex items-center justify-center box-border w-[34px] h-[34px] rounded-[8px]"
                  >
                    {(isBookmarked) =>
                      <img 
                        src= {isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
                        className="w-[34px] h-[34px] brightness-0 invert"
                      />
                    }

                  </BookmarkButton>


                  <Link
                    to="/movies/$movieId"
                    params={{ movieId: String(movie.id) }}
                    className="flex flex-row items-center text-[12px] font-extrabold align-middle text-[#2563EB]"
                  >
                    <p>상세보기</p>
                    <img src="/icons/arrow-right.svg" className="w-4 h-4"/>
                  </Link>


                </div>

                
              </li>
            ))}
          </ul>
        )}
      </main>
      )
  }
  

}