import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ratingQueries} from "../api/ratings/rating-queries.ts";
import {createRating, updateRating} from "../api/ratings/ratings.ts";

interface SaveRatingVariables {
    ratingId: number | null;
    movieId: number;
    score: number;
    comment?: string;
}

export function useSaveRatingMutation(memberId: number | null) {
    const queryClient = useQueryClient();

    return useMutation({
        // 이미 남긴 평점이 있으면 수정, 없으면 새로 등록
        mutationFn: ({ratingId, movieId, score, comment}: SaveRatingVariables) =>
            ratingId === null
                ? createRating({movieId, score, comment})
                : updateRating(ratingId, {score, comment}),
        onSuccess: (rating) => {
            queryClient.setQueryData(ratingQueries.byMember(memberId).queryKey, (prev) => {
                if (!prev) return prev;
                const others = prev.filter((item) => item.ratingId !== rating.ratingId);
                return [rating, ...others];
            });
        },
    });
}
