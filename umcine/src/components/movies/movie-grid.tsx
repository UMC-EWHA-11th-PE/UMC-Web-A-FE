import type {Movie} from "../../types/movie.ts";
import MovieCard from "./movie-card.tsx";
import {useViewSettingsStore} from "../../stores/view-settings-store.ts";
import {cn} from "../../utils/cn.ts";

interface MovieGridProps{
    movies: Movie[];
}

export default function MovieGrid({movies}:MovieGridProps){
    const cardSize=useViewSettingsStore((state)=>state.cardSize);

    return(
        <section className={cn(
            "grid gap-3 sm:gap-5",
            cardSize==="large"
                ?"grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                :"grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7",
        )}>
            {movies.map((movie)=>(
                <MovieCard key={movie.id} movie={movie}/>
            ))}
        </section>
    );
}
