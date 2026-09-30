import { Link } from "@tanstack/react-router";
import { cn } from "../../utils/cn";

import type { Movie } from "../../types/movie";


interface MovieCardProps {
  movie: Movie; 
  onToggleBookmark: (movieId: number) => void;
}

export function MovieCard({movie, onToggleBookmark}: MovieCardProps) {
  return (
    <div className="movie-card flex justify-between flex-col items-stretch w-[100%] h-full gap-[10px] relative">

      <Link 
        to="/movies/$movieId"
        params={{ movieId: String(movie.id) }}
        className="flex flex-col gap-[6px]"
      >
        <img src={movie.posterPath} className="w-[241.6px] h-[274px] object-cover rounded-[8px] bg-[#F6F7F9]"/>
        <h1 className="align-middle block w-[100%] h-[22px] pt-[5px] font-extrabold text-[16px] text-[#17191E] truncate">{movie.title}</h1>
      
      </Link>

      <p className="flex itmes-center justify-between w-[241.6px] h-[14px] font-regular text-[12px] color-[#969DA8]">{movie.releaseDate}</p>

      <button 
        aria-pressed={movie.isBookmarked} 
        onClick={() =>onToggleBookmark(movie.id)}
        className={cn(
          "absolute right-[10px] top-[10px] flex items-center justify-center box-border w-[34px] h-[34px] rounded-[8px]",
          movie.isBookmarked ? "bg-[#2563EB] border-blue-100" : "bg-black/60 border border-white",
        )}
      >
        <img 
          src= {movie.isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
          className="w-[34px] h-[34px] brightness-0 invert"
        />
      </button>

    </div>
  )
}
