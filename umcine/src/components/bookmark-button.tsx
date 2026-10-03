import { useBookmarkStore } from "../../stores/bookmark-store";

interface BookmarkButtonProps {
  movieId: number;
}

export function BookmarkButton({ movieId }: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId),
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleBookmark(movieId);
      }}
      className="rounded-lg bg-[#2f5bea] px-5 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-[#2448c7]"
    >
      {isBookmarked ? "북마크 해제" : "북마크 추가"}
    </button>
  );
}
