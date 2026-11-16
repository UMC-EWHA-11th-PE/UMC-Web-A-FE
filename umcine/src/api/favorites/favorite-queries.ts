import {queryOptions} from "@tanstack/react-query";
import {getFavorites, getFavoriteStatus} from "./favorites.ts";

const favoriteQueries = {
    all: ["favorites"] as const,

    list: (isLoggedIn: boolean) =>
        queryOptions({
            queryKey: ["favorites", "list"],
            queryFn: getFavorites,
            enabled: isLoggedIn,
        }),

    status: (movieId: number, isLoggedIn: boolean) =>
        queryOptions({
            queryKey: ["favorites", "status", movieId],
            queryFn: () => getFavoriteStatus(movieId),
            enabled: isLoggedIn,
        }),
};

export {favoriteQueries};
