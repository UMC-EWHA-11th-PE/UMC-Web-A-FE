import type {Movie} from "../../types/movie.ts";
import MovieCard from "./movie-card.tsx";

interface MovieGridProps{
    movies: Movie[];
}

export default function MovieGrid({movies}:MovieGridProps){
    return(
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
            {movies.map((movie)=>(
                <MovieCard key={movie.id} movie={movie}/>
            ))}
        </section>
    );
}
