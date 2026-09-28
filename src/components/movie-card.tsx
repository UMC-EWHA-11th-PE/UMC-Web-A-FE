import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (id: number) => void;
}

export function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <div className="movie-card">
      <div className="poster-wrapper">
        <img src={movie.posterPath} alt={movie.title} className="poster-img" />
        
        <button
          type="button"
          className={`bookmark-btn ${movie.isBookmarked ? "active" : ""}`}
          onClick={() => onToggleBookmark(movie.id)}
          aria-label={`${movie.title} 북마크`}
        >
          <svg width="16" height="20" viewBox="0 0 16 20" fill={movie.isBookmarked ? "#ffffff" : "none"}>
            <path d="M1 1H15V19L8 14L1 19V1Z" stroke="white" strokeWidth="2" />
          </svg>
        </button>
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-date">{movie.releaseDate}</p>
      </div>
    </div>
  );
}