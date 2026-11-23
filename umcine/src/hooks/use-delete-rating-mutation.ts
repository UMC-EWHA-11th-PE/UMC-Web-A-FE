import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ratingQueries} from "../api/ratings/rating-queries.ts";
import {deleteRating} from "../api/ratings/ratings.ts";

export function useDeleteRatingMutation(memberId: number | null) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteRating,
        onSuccess: (_, ratingId) => {
            queryClient.setQueryData(ratingQueries.byMember(memberId).queryKey, (prev) =>
                prev?.filter((item) => item.ratingId !== ratingId),
            );
        },
    });
}
