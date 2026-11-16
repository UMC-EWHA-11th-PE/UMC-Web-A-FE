import {useMutation, useQueryClient} from "@tanstack/react-query";
import {favoriteQueries} from "../api/favorites/favorite-queries.ts";
import {addFavorite, removeFavorite} from "../api/favorites/favorites.ts";

export function useToggleFavoriteMutation(movieId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        // 현재 즐겨찾기 상태를 받아 반대로 바꾸고, 추가했으면 추가된 항목을 돌려준다
        mutationFn: async (isFavorite: boolean) => {
            if (isFavorite) {
                await removeFavorite(movieId);
                return null;
            }
            return addFavorite(movieId);
        },
        onSuccess: (favorite) => {
            queryClient.setQueryData(favoriteQueries.status(movieId, true).queryKey, {
                isFavorite: favorite !== null,
            });
            queryClient.setQueryData(favoriteQueries.list(true).queryKey, (prev) => {
                if (!prev) return prev;
                const others = prev.filter((item) => item.movieId !== movieId);
                return favorite ? [favorite, ...others] : others;
            });
        },
        onError: () => {
            alert("즐겨찾기를 변경하지 못했어요. 다시 시도해 주세요.");
        },
    });
}
