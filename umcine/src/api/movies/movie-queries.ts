import {queryOptions} from "@tanstack/react-query";
import {getMovies} from "./get-movies.ts";
import {searchMovies} from "./search-movies.ts";
import {getMovieDetail} from "./get-movie-detail.ts";

const movieQueries = {
    list: (page: number) =>
        queryOptions({
            queryKey: ["movies", "list", {page}],
            queryFn: () => getMovies({page}),
        }),

    search: (query: string) =>
        queryOptions({
            queryKey: ["movies", "search", {query}],
            queryFn: () => searchMovies({query}),
            enabled: query.length > 0,
        }),

    detail: (movieId: number)=>queryOptions({
        queryKey: ["movies", "detail", movieId],
        queryFn: () => getMovieDetail(movieId),
        staleTime: 30*1000,
    }),
};

export {movieQueries};