import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRating } from "../api/ratings/update-rating";

export function useUpdateRatingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRating,
    onSuccess: () => {
      alert("평점을 수정했어요.");
    },
    onError: () => {
      alert("평점을 수정하지 못했어요. 다시 시도해 주세요.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["ratings"] });
    },
  });
}
