import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postRating } from "../api/ratings/post-rating";

interface AddRatingVariables {
    memberId: number;
    movieId: number;
    score: number;
    comment?: string;
}

export function useAddRatingMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (variables: AddRatingVariables) => 
            postRating({
                movieId: variables.movieId,
                score: variables.score,
                comment: variables.comment,
            }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ //캐시 다시 가져오도록 요청
                queryKey: ["ratings", variables.memberId],
            })
        },
        onError: () => {
            alert("평점 등록에 실패했어요. 다시 시도해주세요.");
        },
    });
}