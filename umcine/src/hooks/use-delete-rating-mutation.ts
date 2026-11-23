import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRating } from "../api/ratings/delete-ratings";


interface DeleteRatingVariables {
    ratingId: number;
    memberId: number;
}


export function useDeleteRatingMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ratingId}: DeleteRatingVariables) =>  deleteRating(ratingId),
        onSuccess: (_, variables) => {
            alert("평점이 삭제되었어요.");

            queryClient.invalidateQueries({
                queryKey: ["ratings", variables.memberId],
            });
        },
        onError: () => {
            alert("평점 삭제에 실패했어요. 다시 시도해주세요.");
        },
    });
}
