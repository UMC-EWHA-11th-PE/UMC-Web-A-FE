import {queryOptions} from "@tanstack/react-query";
import {getMemberRatings} from "./ratings.ts";

const ratingQueries = {
    all: ["ratings"] as const,

    byMember: (memberId: number | null) =>
        queryOptions({
            queryKey: ["ratings", "member", memberId],
            queryFn: () => getMemberRatings(memberId!),
            enabled: memberId !== null,
        }),
};

export {ratingQueries};
