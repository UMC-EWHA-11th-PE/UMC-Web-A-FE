import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (id: number) => void;
}

export function MovieCard({
  movie,
  onToggleBookmark,
}: MovieCardProps) {
  return (
    <article className="flex flex-col">
      <div className="relative w-full overflow-hidden rounded-xl">
        <Link
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
        >
          <img
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
            className="block aspect-[2/3] w-full object-cover"
          />
        </Link>

        <button
          type="button"
          aria-label="북마크"
          className={cn(
            "absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-xs text-white",
            movie.isBookmarked ? "bg-blue-600" : "bg-black/60",
          )}
          onClick={() => onToggleBookmark(movie.id)}
        >
          ★
        </button>
      </div>

      <Link
        to="/movies/$movieId"
        params={{ movieId: String(movie.id) }}
      >
        <h3 className="mb-0.5 mt-2.5 text-sm font-bold text-[#111111]">
          {movie.title}
        </h3>
      </Link>

      <p className="text-xs text-[#8b95a1]">
        {movie.releaseDate}
      </p>
    </article>
  );
}