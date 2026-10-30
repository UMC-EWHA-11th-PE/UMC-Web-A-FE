import type {TmdbMovieListItem} from "../../api/movies/models.ts";
import {Link} from "@tanstack/react-router";
import {cn} from "../../utils/cn.ts";
import {useBookmarkStore} from "../../stores/bookmark-store.ts";
import {getTmdbPosterUrl} from "../../utils/movies/tmdb-image.ts";

interface MovieCardProps{
    movie: TmdbMovieListItem;
}

export default function MovieCard({movie}: MovieCardProps){
    const isBookmarked=useBookmarkStore((state)=>state.bookmarkedMovieIds.includes(movie.id));
    const toggleBookmark=useBookmarkStore((state)=>state.toggleBookmark);
    const posterUrl = getTmdbPosterUrl(movie.poster_path);

    return(
        <article className="flex flex-col items-start gap-1">
            <div className="relative aspect-2/3 overflow-hidden self-stretch rounded-[10px] bg-(--color-bg-page) xl:aspect-auto xl:h-[274px]">
                <Link to="/movies/$movieId" params={{movieId:String(movie.id)}} className="block h-full">
                    {posterUrl ? (
                        <img className="h-full w-full object-cover"
                            src={posterUrl} alt={`${movie.title} 포스터`}/>
                    ) : (
                        <div className="grid h-full w-full place-items-center bg-gray-200 text-xs text-(--color-text-tertiary)">
                            이미지 없음
                        </div>
                    )}
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
            <p className="self-stretch text-xs font-normal text-(--color-text-tertiary)">{movie.release_date}</p>
        </article>
    );
}
