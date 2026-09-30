
import { useState } from "react";

import type { Movie } from "../../types/movie";
import { MovieCard } from "./movie-card";

interface MovieGridProps {
    movies: Movie[];
}

export function MovieGrid({movies}:MovieGridProps) {
    const [movieState, setMovies] = useState(movies);

    function handleToggleBookmark(movieId :number) {
        setMovies((currentMovies: Movie[]) => 
            currentMovies.map((movie:Movie)=> 
                (movie.id===movieId)?{...movie, isBookmarked: !movie.isBookmarked}:movie
            )
        )
    }

    return(
        <ul className="grid grid-cols-5 grid-rows-[repeat(2,auto)] w-[1280px] gap-y-[20px] gap-x-[18px] list-none box-border">
          {movieState.map((movie) => (
            <li key={movie.id}>
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onToggleBookmark={handleToggleBookmark}
                />
            </li>
          ))}
        </ul>
    )
}