import { useQuery } from "@tanstack/react-query";
import { getRatings } from "../api/ratings/get-ratings";

export function useRatingQuery(memberId: number | null) {
    return useQuery({
        queryKey: ["ratings", memberId],
        queryFn: () => {
            if (memberId === null) {
                throw new Error("로그인이 필요합니다.");
            }

            return getRatings(memberId);
        },
        enabled: memberId !== null,
    })
}