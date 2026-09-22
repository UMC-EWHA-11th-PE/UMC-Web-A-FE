import type { Movie } from '../types/movie';
import './movie-card.css';

interface MovieCardProps {
  movie: Movie;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
}

function MovieCard({ movie, isBookmarked, onToggleBookmark }: MovieCardProps) {
  return (
    <div className="movie-card">
      <div className="movie-card__poster-wrap">
        <img src={movie.posterPath} alt={movie.title} className="movie-card__poster" />
        <button
          className="movie-card__bookmark"
          onClick={() => onToggleBookmark(movie.id)}
          aria-label={isBookmarked ? '북마크 해제' : '북마크 추가'}
        >
          {isBookmarked ? '🔖' : '📑'}
        </button>
      </div>
      <p className="movie-card__title">{movie.title}</p>
      <p className="movie-card__date">{movie.releaseDate}</p>
    </div>
  );
}

export default MovieCard;
