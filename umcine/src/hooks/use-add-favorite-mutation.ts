import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFavorites } from "../api/favorites/post-favorite";


export function useAddFavoirteMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: postFavorites,
        onSuccess: () => {
            queryClient.invalidateQueries({ //캐시 다시 가져오도록 요청
                queryKey: ["favorites"],
            })
        },
        onError: () => {
            alert("즐겨찾기 등록에 실패했어요. 다시 시도해주세요.");
        },
    });
}