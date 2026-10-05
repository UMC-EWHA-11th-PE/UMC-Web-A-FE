import {useBookmarkStore} from "../stores/bookmark-store";
import {cn} from "../utils/cn.ts";

interface BookmarkButtonProps {
    movieId: number;
    className?: string;
}

export function BookmarkButton({movieId, className}: BookmarkButtonProps) {
    const isBookmarked = useBookmarkStore((state) =>
        state.bookmarkedMovieIds.includes(movieId),
    );
    const toggleBookmark = useBookmarkStore(
        (state) => state.toggleBookmark,
    );

    return (
        <button
            type="button"
            aria-pressed={isBookmarked}
            onClick={() => toggleBookmark(movieId)}
            className={cn(
                "inline-flex items-center gap-2 h-10.5 px-4 rounded-lg border border-(--color-bg-surface) bg-(--color-action-primary) text-sm font-extrabold text-(--color-bg-surface)",
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