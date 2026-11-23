
import { useEffect, useState } from "react";

import type { TmdbMovieListItem } from "../../api/movies/models";
import { MovieCard } from "./movie-card";
import { readBookmarkIds, saveBookmarkIds } from "@/src/utils/bookmark-storage";

interface MovieGridProps {
    movies: TmdbMovieListItem[];
}

export function MovieGrid({movies}:MovieGridProps) {

    const [bookmarkState, setBookmark] = useState<number[]>([]);

    // localStorage는 브라우저에서만 있어서, 마운트된 뒤에 읽어요.
    useEffect(() => {
        setBookmark(readBookmarkIds());
    }, []);

    function handleToggleBookmark(bookmarkId :number) {
        setBookmark((currentMovieIds: number[]) => {
            const newMovieIds = (currentMovieIds.includes(bookmarkId))?
            currentMovieIds.filter((id) => id !== bookmarkId):
            [...currentMovieIds, bookmarkId]

            saveBookmarkIds(newMovieIds);
            return newMovieIds
        })
    }

    return(
        <ul className="grid grid-cols-5 grid-rows-[repeat(2,auto)] w-[1280px] gap-y-[20px] gap-x-[18px] list-none box-border">
          {movies.map((movie) => (
            <li key={movie.id}>
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    isBookmarked={bookmarkState.includes(movie.id)}
                    onToggleBookmark={handleToggleBookmark}
                />
            </li>
          ))}
        </ul>
    )
}