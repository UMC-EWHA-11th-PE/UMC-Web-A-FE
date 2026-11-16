import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRating } from "../api/ratings/create-rating";

export function useCreateRatingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRating,
    onSuccess: () => {
      alert("평점을 저장했어요.");
    },
    onError: () => {
      alert("평점을 저장하지 못했어요. 다시 시도해 주세요.");
    },
    // 성공과 실패 모두 서버 기준으로 평점 목록을 다시 맞춤
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["ratings"] });
    },
  });
}
