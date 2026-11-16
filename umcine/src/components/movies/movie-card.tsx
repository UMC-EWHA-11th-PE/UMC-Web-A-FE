import type {TmdbMovieListItem} from "../../api/movies/models.ts";
import {useQuery} from "@tanstack/react-query";
import {Link, useNavigate} from "@tanstack/react-router";
import {favoriteQueries} from "../../api/favorites/favorite-queries.ts";
import {useToggleFavoriteMutation} from "../../hooks/use-toggle-favorite-mutation.ts";
import {useAuthStore} from "../../stores/auth-store.ts";
import {cn} from "../../utils/cn.ts";
import {getTmdbPosterUrl} from "../../utils/movies/tmdb-image.ts";

interface MovieCardProps{
    movie: TmdbMovieListItem;
}

export default function MovieCard({movie}: MovieCardProps){
    const isLoggedIn = useAuthStore((state) => state.accessToken !== null);
    const navigate = useNavigate();
    // 카드마다 상태를 따로 요청하지 않고 즐겨찾기 목록 하나를 같이 쓴다
    const favoriteQuery = useQuery({
        ...favoriteQueries.list(isLoggedIn),
        select: (favorites) => favorites.some((favorite) => favorite.movieId === movie.id),
    });
    const toggleMutation = useToggleFavoriteMutation(movie.id);
    const isBookmarked = isLoggedIn && favoriteQuery.data === true;

    const handleToggleBookmark = () => {
        if (!isLoggedIn) {
            void navigate({to: "/login"});
            return;
        }
        toggleMutation.mutate(isBookmarked);
    };
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
                    disabled={toggleMutation.isPending}
                    onClick={handleToggleBookmark}>
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
