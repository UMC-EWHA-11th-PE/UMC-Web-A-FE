import { useQuery } from "@tanstack/react-query";
import { getIsFavorite } from "../api/favorites/get-isFavorite";

export function useIsFavoritesQuery(movieId:number) {
    return useQuery({
        queryKey: ["favorites", movieId],
        queryFn: () => getIsFavorite(movieId),
    })
}