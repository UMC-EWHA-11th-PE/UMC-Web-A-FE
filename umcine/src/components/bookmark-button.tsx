import {useQuery} from "@tanstack/react-query";
import {useNavigate} from "@tanstack/react-router";
import {favoriteQueries} from "../api/favorites/favorite-queries.ts";
import {useToggleFavoriteMutation} from "../hooks/use-toggle-favorite-mutation.ts";
import {useAuthStore} from "../stores/auth-store.ts";
import {cn} from "../utils/cn.ts";

interface BookmarkButtonProps {
    movieId: number;
    className?: string;
}

export function BookmarkButton({movieId, className}: BookmarkButtonProps) {
    const isLoggedIn = useAuthStore((state) => state.accessToken !== null);
    const navigate = useNavigate();
    const statusQuery = useQuery(favoriteQueries.status(movieId, isLoggedIn));
    const toggleMutation = useToggleFavoriteMutation(movieId);

    const isBookmarked = isLoggedIn && statusQuery.data?.isFavorite === true;
    const isDisabled = toggleMutation.isPending || (isLoggedIn && statusQuery.isPending);

    const handleClick = () => {
        if (!isLoggedIn) {
            void navigate({to: "/login"});
            return;
        }
        toggleMutation.mutate(isBookmarked);
    };

    return (
        <button
            type="button"
            aria-pressed={isBookmarked}
            disabled={isDisabled}
            onClick={handleClick}
            className={cn(
                "inline-flex items-center gap-2 h-10.5 px-4 rounded-lg border border-(--color-bg-surface) bg-(--color-action-primary) text-sm font-extrabold text-(--color-bg-surface) disabled:cursor-not-allowed disabled:opacity-60",
                className,
            )}
        >
            <img
                className="size-4 invert"
                src={
                    isBookmarked
                        ? "/icons/movie-icons/bookmark.svg"
                        : "/icons/movie-icons/bookmark-outline.svg"
                }
                alt=""
            />
            {isBookmarked ? "즐겨찾기 해제" : "즐겨찾기"}
        </button>
    );
}
