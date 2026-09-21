
import type { Movie } from "../types/movie";


interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export function MovieCard({movie, onToggleBookmark}: MovieCardProps) {
  return (
    <div>
      <img src={movie.posterPath} />
      <h6>{movie.title}</h6>
      <p>{movie.releaseDate}</p>
      <button aria-pressed={movie.isBookmarked} onClick={() =>onToggleBookmark(movie.id)}>
        {movie.isBookmarked ? "북마크 해제" : "북마크 추가"}
      </button>
    </div>
  )
}