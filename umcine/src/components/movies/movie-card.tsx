import { Link } from "@tanstack/react-router";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { cn } from "../../utils/cn";
import bookmarkWhite from "../../assets/bookmark-white.svg";
import bookmarkBlack from "../../assets/bookmark-black.svg";

interface MovieCardProps {
  movie: TmdbMovieListItem;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
}

function MovieCard({ movie, isBookmarked, onToggleBookmark }: MovieCardProps) {
  return (
    <div className="relative">
      <Link
        to="/movies/$movieId"
        params={{ movieId: String(movie.id) }}
        className="group flex flex-col gap-2 rounded-lg no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f5bea]"
      >
        <div className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-[#222]">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} 포스터`}
              className="block h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-white/60">
              포스터가 없어요.
            </div>
          )}
        </div>

        <p className="m-0 truncate text-sm font-semibold text-[#111] group-hover:text-[#2f5bea]">
          {movie.title}
        </p>

        <p className="m-0 text-xs text-[#888]">
          {movie.release_date || "개봉일 정보 없음"}
        </p>
      </Link>

      <button
        type="button"
        className={cn(
          "absolute right-2 top-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border-0 text-sm text-white",
          isBookmarked ? "bg-blue-600" : "bg-black/60",
        )}
        onClick={() => onToggleBookmark(movie.id)}
        aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}
        aria-pressed={isBookmarked}
      >
        <img
          src={isBookmarked ? bookmarkWhite : bookmarkBlack}
          alt=""
          aria-hidden="true"
          className="h-5 w-5"
        />
      </button>
    </div>
  );
}

export default MovieCard;
