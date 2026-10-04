import { useBookmarkStore } from "../stores/bookmark-store";

interface BookmarkButtonProps {
  movieId: number;
}

export function BookmarkButton({ movieId }: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId),
  );

  const toggleBookmark = useBookmarkStore(
    (state) => state.toggleBookmark,
  );

  return (
    <button
      type="button"
      onClick={() => toggleBookmark(movieId)}
      className={
        isBookmarked
          ? "rounded-lg bg-blue-600 px-3 py-2 text-xs text-white"
          : "rounded-lg bg-black/60 px-3 py-2 text-xs text-white"
      }
    >
      {isBookmarked ? "북마크 해제" : "북마크 추가"}
    </button>
  );
}