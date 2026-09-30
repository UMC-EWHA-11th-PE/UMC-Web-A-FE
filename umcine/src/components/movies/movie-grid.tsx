
import { useState } from "react";

import type { Movie } from "../../types/movie";
import { MovieCard } from "./movie-card";
import { readBookmarkIds, saveBookmarkIds } from "../../utils/bookmark-storage";

interface MovieGridProps {
    movies: Movie[];
}

export function MovieGrid({movies}:MovieGridProps) {

    const [bookmarkState, setBookmark] = useState(() => readBookmarkIds());

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