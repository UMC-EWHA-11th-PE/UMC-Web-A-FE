import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFavorites } from "../api/favorites/delete-favorite";


export function useDeleteFavoirteMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteFavorites,
        onSuccess: () => {
            queryClient.invalidateQueries({ //캐시 다시 가져오도록 요청
                queryKey: ["favorites"],
            })
        },
        onError: () => {
            alert("즐겨찾기 삭제에 실패했어요. 다시 시도해주세요.");
        },
    });
}