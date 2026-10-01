import { Link } from '@tanstack/react-router';
import type { Movie } from '../../types/movie';
import { cn } from '../../utils/cn';

interface MovieCardProps {
  movie: Movie;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
}

function MovieCard({
  movie,
  isBookmarked,
  onToggleBookmark,
}: MovieCardProps) {
  return (
    <div className="relative">
      <Link
        to="/movies/$movieId"
        params={{ movieId: String(movie.id) }}
        className="group flex flex-col gap-2 rounded-lg no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f5bea]"
      >
        <div className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-[#222]">
          <img
            src={movie.posterPath}
            alt={movie.title}
            className="block h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <p className="m-0 truncate text-sm font-semibold text-[#111] group-hover:text-[#2f5bea]">
          {movie.title}
        </p>

        <p className="m-0 text-xs text-[#888]">
          {movie.releaseDate}
        </p>
      </Link>

      <button
        type="button"
        className={cn(
          'absolute right-2 top-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border-0 text-sm text-white',
          isBookmarked ? 'bg-blue-600' : 'bg-black/60',
        )}
        onClick={() => onToggleBookmark(movie.id)}
        aria-label={isBookmarked ? '북마크 해제' : '북마크 추가'}
        aria-pressed={isBookmarked}
      >
        {isBookmarked ? '🔖' : '📑'}
      </button>
    </div>
  );
}

export default MovieCard;