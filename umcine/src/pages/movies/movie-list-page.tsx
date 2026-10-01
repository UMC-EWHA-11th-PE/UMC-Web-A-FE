import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { movies } from "../../data/movies";

const MovieListPage = () => {
  return (
    <main className="flex-1">
      <MovieGrid movies={movies} />
      <Pagination totalPages={1} />
    </main>
  );
};

export default MovieListPage;