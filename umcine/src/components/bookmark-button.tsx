import { cn } from "../utils/cn";
import { useFavoritesQuery } from "../hooks/use-favorites-query";
import { useToggleFavorite } from "../hooks/use-toggle-favorite";

interface BookmarkButtonProps {
  movieId: number;
}

export function BookmarkButton({ movieId }: BookmarkButtonProps) {
  // 카드마다 요청하지 않도록, 같은 key의 내 즐겨찾기 목록 하나를 공유해서 확인함
  const favoritesQuery = useFavoritesQuery();
  const isBookmarked = favoritesQuery.data?.some((favorite) => favorite.movieId === movieId) ?? false;
  const { toggle, isPending } = useToggleFavorite(movieId, isBookmarked);

  return (
    // 북마크 버튼: 34x34, 포스터 오른쪽 위 10px. 북마크 여부에 따라 색이 바뀌어요.
    <button
      type="button"
      className={cn(
        "absolute top-2.5 right-2.5 flex size-[34px] cursor-pointer items-center justify-center rounded-lg border",
        isBookmarked ? "border-action bg-action" : "border-white bg-fg",
      )}
      aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}
      disabled={isPending}
      onClick={toggle}
    >
      <img
        src={isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
        alt=""
        className="size-6 invert"
      />
    </button>
  );
}