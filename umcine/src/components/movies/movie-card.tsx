import { Link } from "@tanstack/react-router";

import type { TmdbMovieListItem } from "../../api/movies/models";
import { BookmarkButton } from "../bookmark-button";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";



interface MovieCardProps {
  movie: TmdbMovieListItem; 
  isBookmarked: boolean;
  onToggleBookmark: (movieId: number) => void;
}

export function MovieCard({movie}: MovieCardProps) {

  return (
    <div className="movie-card flex justify-between flex-col items-stretch w-[100%] h-full gap-[10px] relative">

      <Link 
        to="/movies/$movieId"
        params={{ movieId: String(movie.id) }}
        className="flex flex-col gap-[6px]"
      >
        <img src={getTmdbPosterUrl(movie.poster_path) ?? undefined} alt="이미지 없음" className="w-[241.6px] h-[274px] object-cover rounded-[8px] bg-[#F6F7F9]"/>
        <h1 className="align-middle block w-[100%] h-[22px] pt-[5px] font-extrabold text-[16px] text-[#17191E] truncate">{movie.title}</h1>
      
      </Link>

      <p className="flex itmes-center justify-between w-[241.6px] h-[14px] font-regular text-[12px] color-[#969DA8]">{movie.release_date}</p>

      <BookmarkButton
        movieId={movie.id} 
        buttonStyle="absolute right-[10px] top-[10px] flex items-center justify-center box-border w-[34px] h-[34px] rounded-[8px]"
      >
        {(isBookmarked) =>
          <img 
            src= {isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
            className="w-[34px] h-[34px] brightness-0 invert"
          />
        }

      </BookmarkButton>

    </div>
  )
}
