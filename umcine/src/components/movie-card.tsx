import "./movie-card.css";

import type { Movie } from "../types/movie";


interface MovieCardProps {
  movie: Movie; 
  onToggleBookmark: (movieId: number) => void;
}

export function MovieCard({movie, onToggleBookmark}: MovieCardProps) {
  return (
    <div className="movie-card">
      <img src={movie.posterPath} />
      <h6>{movie.title}</h6>
      <p>{movie.releaseDate}</p>
      <button aria-pressed={movie.isBookmarked} onClick={() =>onToggleBookmark(movie.id)}>
        <img src= {movie.isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}/>
      </button>
    </div>
  )
}
