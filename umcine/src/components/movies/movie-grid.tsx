// import type { Movie } from "../../types/movie";
import type { TmdbMovieListItem } from "../../api/movies/models";
import MovieCard from "./movie-card";

interface MovieGridProps {
  movies: TmdbMovieListItem[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  return (
    // Figma: 5열, 열 간격 18px, 행 간격 20px
    <section className="grid grid-cols-5 gap-x-[18px] gap-y-5">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}
