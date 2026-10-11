import { Link } from "@tanstack/react-router";
import {BookmarkButton} from "../bookmark-button";
import type { Movie } from "../../types/movie";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    // Figma: 포스터 274px + 제목 22px + 날짜 14px, 요소 사이 간격 4px (= 318px)
    <article className="flex flex-col gap-1">
      <div className="relative">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }} className="block">
          {/* 포스터: 높이 274px, radius 10px, 이미지가 뜨기 전에는 page 색 */}
          <img
            src={movie.posterPath}
            alt={movie.title}
            className="block h-[274px] w-full rounded-[10px] bg-page object-cover"
          />
        </Link>

        <BookmarkButton movieId={movie.id} />
      </div>

      {/* 제목: 14px ExtraBold, 위 여백 5px / 날짜: 12px, tertiary 색 */}
      <h3 className="pt-[5px] text-sm leading-[17px] font-extrabold text-fg">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          {movie.title}
        </Link>
      </h3>
      <p className="text-xs leading-[14px] text-fg-tertiary">{movie.releaseDate}</p>
    </article>
  );
}
