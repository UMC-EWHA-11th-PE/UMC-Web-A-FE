"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/auth-store";
import {
  useFavorite,
  useAddFavorite,
  useDeleteFavorite,
} from "../hooks/use-favorites";

interface BookmarkButtonProps {
  movieId: number;
}

export function BookmarkButton({
  movieId,
}: BookmarkButtonProps) {
  const router = useRouter();

  const accessToken = useAuthStore(
    (state) => state.accessToken,
  );

  const favoriteQuery = useFavorite(movieId);
  const addFavoriteMutation = useAddFavorite();
  const deleteFavoriteMutation = useDeleteFavorite();

  const isBookmarked = favoriteQuery.data ?? false;

  const isPending =
    addFavoriteMutation.isPending ||
    deleteFavoriteMutation.isPending;

  function handleClick() {
    if (!accessToken) {
      alert("로그인 후 이용할 수 있어요.");
      router.push("/login");
      return;
    }

    if (favoriteQuery.isError) {
      favoriteQuery.refetch();
      return;
    }

    if (favoriteQuery.isPending || isPending) return;

    if (isBookmarked) {
      deleteFavoriteMutation.mutate(movieId);
    } else {
      addFavoriteMutation.mutate(movieId);
    }
  }

  const buttonClass = isBookmarked
    ? "rounded-lg bg-blue-600 px-3 py-2 text-xs text-white"
    : "rounded-lg bg-black/60 px-3 py-2 text-xs text-white";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending || (Boolean(accessToken) && favoriteQuery.isPending)}
      className={`${buttonClass} disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {isPending
        ? "처리 중..."
        : accessToken && favoriteQuery.isPending
          ? "확인 중..."
          : favoriteQuery.isError
            ? "다시 시도"
            : isBookmarked
              ? "북마크 해제"
              : "북마크 추가"}
    </button>
  );
}
