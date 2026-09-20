import "./movie-card.css"
import type {Movie} from "../types/movie"

interface MovieCardProps{
    movie: Movie;
    onToggleBookmark: (id:number)=>void;
}

export default function MovieCard({movie, onToggleBookmark}: MovieCardProps){
    return(
        <article className="movie-card">
            <div className="movie-card__poster">
                <img className="movie-card__poster-image"
                    src={movie.posterPath} alt={`${movie.title} 포스터`}/>
                <button type="button"
                    className={`movie-card__bookmark${movie.isBookmarked ? " movie-card__bookmark--active" : ""}`}
                    aria-pressed={movie.isBookmarked}
                    aria-label={`${movie.title} 즐겨찾기`}
                    onClick={()=>onToggleBookmark(movie.id)}>
                    <img src={movie.isBookmarked
                        ?"/icons/movie-icons/bookmark.svg"
                        : "/icons/movie-icons/bookmark-outline.svg"}
                         alt=""
                    />
                </button>
            </div>
            <h3 className="movie-card__title">{movie.title}</h3>
            <p className="movie-card__date">{movie.releaseDate}</p>
        </article>
    );
}
