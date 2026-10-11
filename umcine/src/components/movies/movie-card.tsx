import type {Movie} from "../../types/movie.ts"
import {Link} from "@tanstack/react-router";
import {cn} from "../../utils/cn.ts";
import {useBookmarkStore} from "../../stores/bookmark-store.ts";

interface MovieCardProps{
    movie: Movie;
}

export default function MovieCard({movie}: MovieCardProps){
    const isBookmarked=useBookmarkStore((state)=>state.bookmarkedMovieIds.includes(movie.id));
    const toggleBookmark=useBookmarkStore((state)=>state.toggleBookmark);

    return(
        <article className="flex flex-col items-start gap-1">
            <div className="relative aspect-2/3 overflow-hidden self-stretch rounded-[10px] bg-(--color-bg-page) xl:aspect-auto xl:h-[274px]">
                <Link to="/movies/$movieId" params={{movieId:String(movie.id)}} className="block h-full">
                    <img className="h-full w-full object-cover"
                        src={movie.posterPath} alt={`${movie.title} 포스터`}/>
                </Link>
                <button type="button"
                    className={cn(
                        "absolute right-[9.8px] top-[10px] grid size-[34px] place-items-center rounded-lg border border-(--color-bg-surface)",
                        isBookmarked
                            ?"border-(--color-action-primary) bg-(--color-action-primary)"
                            :"bg-(--color-text-primary)",
                        )}
                    aria-pressed={isBookmarked}
                    aria-label={`${movie.title} 즐겨찾기`}
                    onClick={()=>toggleBookmark(movie.id)}>
                    <img
                        className="size-6 invert"
                        src={isBookmarked
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
