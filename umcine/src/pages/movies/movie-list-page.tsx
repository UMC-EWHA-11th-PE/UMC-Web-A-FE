import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { useState } from "react";

const MovieListPage = () => {
  const [movies] = useState([
    {
      id: 1,
      title: "Movie 1",
      releaseDate: "2023-01-01",
      posterPath: "/path/to/poster1.jpg"
    },
    {
      id: 2,
      title: "Movie 2",
      releaseDate: "2023-02-01",
      posterPath: "/path/to/poster2.jpg"
    }
  ]);

  return (
    <main className="MovieListPage">
      <MovieGrid movies={movies} />
      <Pagination totalPages={1} />
    </main>
  );
};

export default MovieListPage;
