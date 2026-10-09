
import { Link } from "@tanstack/react-router";
import { BookmarkButton } from "../bookmark-button";

export interface MovieCardData {
  id: number;
  title: string;
  posterPath: string | null;
  releaseDate: string;
}

interface MovieCardProps {
  movie: MovieCardData;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="flex flex-col">
      <div className="relative w-full overflow-hidden rounded-xl">
        <Link
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
        >
          {movie.posterPath ? (
            <img
              src={movie.posterPath}
              alt={`${movie.title} 포스터`}
              className="block w-full"
            />
          ) : (
            <div className="flex aspect-[2/3] w-full items-center justify-center bg-gray-200 text-sm text-gray-500">
              이미지 없음
            </div>
          )}
        </Link>

        <div className="absolute right-3 top-3">
          <BookmarkButton movieId={movie.id} />
        </div>
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
