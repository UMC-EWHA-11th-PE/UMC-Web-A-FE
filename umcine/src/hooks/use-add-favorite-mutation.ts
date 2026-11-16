import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavorite } from "../api/favorites/add-favorite";

export function useAddFavoriteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFavorite,
    onError: () => {
      alert("즐겨찾기에 추가하지 못했어요. 다시 시도해 주세요.");
    },
    // 성공과 실패 모두 서버 기준으로 목록과 영화별 여부를 다시 맞춤
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}
