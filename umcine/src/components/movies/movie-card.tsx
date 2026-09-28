import { Link } from "@tanstack/react-router";
import { cn } from "../../utils/cn"; 
import type { Movie } from "../../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (id: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="flex flex-col gap-3">
      <div className="relative">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }} className="block">
          {/* .movie-card__poster > a > img: 
              width: 100% -> w-full
              height: 274px -> h-[274px]
              object-fit: cover -> object-cover
              border-radius: 12px -> rounded-xl 
          */}
          <img 
            src={movie.posterPath} 
            alt={movie.title} 
            className="block w-full h-[274px] object-cover rounded-xl"
          />
        </Link>
        
        <button
          type="button"
          className={cn(
            "absolute top-[10px] right-[10px] flex items-center justify-center w-[34px] h-[34px] border border-white rounded-lg",
            movie.isBookmarked 
              ? "bg-blue-600 border-blue-600" 
              : "bg-[#111]"                   
          )}
          aria-label={movie.isBookmarked ? "북마크 해제" : "북마크"}
          onClick={() => onToggleBookmark(movie.id)}
        >
          {/* .movie-card__bookmark img: 
              width: 24px, height: 24px -> w-6, h-6
              filter: invert(1) -> invert 
          */}
          <img
            src={movie.isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
            alt=""
            className="w-6 h-6 invert"
          />
        </button>
      </div>
      
      <h3 className="text-lg font-bold">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          {movie.title}
        </Link>
      </h3>
      <p className="text-sm text-gray-500">{movie.releaseDate}</p>
    </article>
  );
}