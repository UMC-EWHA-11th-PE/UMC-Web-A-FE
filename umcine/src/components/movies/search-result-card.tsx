import { Link } from "@tanstack/react-router";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";
import { BookmarkButton } from "../bookmark-button";

interface SearchResultCardProps {
  movie: TmdbMovieListItem;
}

export default function SearchResultCard({ movie }: SearchResultCardProps) {
  const posterUrl = getTmdbPosterUrl(movie.poster_path);

  return (
    // Figma: 카드 높이 240px, 위아래 여백 20px, 포스터와 글 사이 18px, 아래 구분선 1px
    <article className="flex h-full min-h-60 gap-[18px] border-b border-line py-5">
      {/* 포스터: 126x190, radius 10px, 포스터가 없으면 같은 크기의 빈 영역 */}
      <div className="relative shrink-0">
        <Link
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
          className="block h-[190px] w-[126px] overflow-hidden rounded-[10px] bg-page"
        >
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`${movie.title} 포스터`}
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-xs text-fg-tertiary">
              이미지 없음
            </div>
          )}
        </Link>

        <BookmarkButton movieId={movie.id} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-start gap-2 pt-1">
        {/* 제목: 18px Bold, line-height 24.3px(=1.35) */}
        <h3 className="text-lg leading-[1.35] font-bold text-fg">{movie.title}</h3>

        {/* 원제·개봉일: 12px, tertiary 색, 간격 8px */}
        <div className="flex items-center gap-2 text-xs leading-[14px] text-fg-tertiary">
          <span>{movie.original_title}</span>
          <span>{movie.release_date}</span>
        </div>

        {/* 줄거리: 12.5px / 20.25px, 최대 3줄. 짧아도 66px을 차지해서 링크 위치가 카드마다 같아요. */}
        <p className="line-clamp-3 min-h-[66px] text-[12.5px] leading-[20.25px] text-fg-secondary">
          {movie.overview}
        </p>

        {/* arrow-right.svg는 24px 기준이라 contain으로 16px 안에 맞춰요. */}
        <Link
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
          className="inline-flex items-center gap-1 text-xs leading-[14px] font-extrabold text-action"
        >
          상세 보기
          <span
            aria-hidden="true"
            className="size-4 bg-action mask-[url('/icons/arrow-right.svg')] mask-contain mask-center mask-no-repeat"
          />
        </Link>
      </div>
    </article>
  );
}