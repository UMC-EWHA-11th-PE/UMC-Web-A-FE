import type {Movie} from "../../types/movie.ts"
import {Link} from "@tanstack/react-router";
import {cn} from "../../utils/cn.ts";

interface MovieCardProps{
    movie: Movie;
    onToggleBookmark: (id:number)=>void;
}

export default function MovieCard({movie, onToggleBookmark}: MovieCardProps){
    return(
        <article className="flex flex-col items-start gap-1">
            <div className="relative overflow-hidden h-[274px] self-stretch rounded-[10px] bg-(--color-bg-page)">
                <Link to="/movies/$movieId" params={{movieId:String(movie.id)}} className="block h-full">
                    <img className="h-full w-full object-cover"
                        src={movie.posterPath} alt={`${movie.title} 포스터`}/>
                </Link>
                <button type="button"
                    className={cn(
                        "absolute right-[9.8px] top-[10px] grid size-[34px] place-items-center rounded-lg border border-(--color-bg-surface)",
                        movie.isBookmarked
                            ?"border-(--color-action-primary) bg-(--color-action-primary)"
                            :"bg-(--color-text-primary)",
                        )}
                    aria-pressed={movie.isBookmarked}
                    aria-label={`${movie.title} 즐겨찾기`}
                    onClick={()=>onToggleBookmark(movie.id)}>
                    <img
                        className="size-6 invert"
                        src={movie.isBookmarked
                        ?"/icons/movie-icons/bookmark.svg"
                        : "/icons/movie-icons/bookmark-outline.svg"}
                         alt=""
                    />
                </button>
            </div>
            <h3 className="self-stretch pt-[5px] text-sm font-extrabold">{movie.title}</h3>
            <p className="self-stretch text-xs font-normal text-(--color-text-tertiary)">{movie.releaseDate}</p>
        </article>
    );
}
