import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRating } from "../api/ratings/update-rating";

import type { UpdateRatingInfo } from "../api/ratings/update-rating";

interface UpdateRatingVariables {
    memberId: number;
    ratingId: number;
    data: UpdateRatingInfo;
}

export function useUpdateRatingMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ ratingId, data }: UpdateRatingVariables) => {
            console.log("PATCH ratingId:", ratingId);
            console.log("PATCH body:", data);

            return updateRating(ratingId, data);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["ratings", variables.memberId],
            });
            alert("평점 수정에 성공했어요.");
        },
        onError: () => {
            alert("평점 수정에 실패했어요. 다시 시도해주세요.");
        },
    });
}