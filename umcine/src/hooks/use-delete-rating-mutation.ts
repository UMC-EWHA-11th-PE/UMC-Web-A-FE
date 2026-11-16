import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRating } from "../api/ratings/delete-rating";

export function useDeleteRatingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRating,
    onSuccess: () => {
      alert("평점을 삭제했어요.");
    },
    onError: () => {
      alert("평점을 삭제하지 못했어요. 다시 시도해 주세요.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["ratings"] });
    },
  });
}
