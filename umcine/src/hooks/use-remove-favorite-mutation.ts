import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFavorite } from "../api/favorites/remove-favorite";

export function useRemoveFavoriteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFavorite,
    onError: () => {
      alert("즐겨찾기를 해제하지 못했어요. 다시 시도해 주세요.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}
