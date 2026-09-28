// 1. TanStack Router에서 Link 컴포넌트를 불러옵니다.
import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import "./movie-card.css";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (id: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="movie-card">
      <div className="movie-card__poster">
        {/* 2. 대문자 Link 컴포넌트를 사용하고 지시사항의 prop을 전달합니다. */}
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          <img src={movie.posterPath} alt={movie.title} />
        </Link>
        
        <button
          type="button"
          className={`movie-card__bookmark${movie.isBookmarked ? " movie-card__bookmark--active" : ""}`}
          aria-label={movie.isBookmarked ? "북마크 해제" : "북마크"}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img
            src={movie.isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
            alt=""
          />
        </button>
      </div>
      
      <h3 className="movie-card__title">
        {/* 제목을 눌렀을 때도 이동하게 하려면 제목도 동일하게 감싸줍니다. */}
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          {movie.title}
        </Link>
      </h3>
      <p className="movie-card__date">{movie.releaseDate}</p>
    </article>
  );
}