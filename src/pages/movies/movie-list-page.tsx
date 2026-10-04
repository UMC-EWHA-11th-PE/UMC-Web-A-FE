import { movies } from "../../data/movies";
import { MovieGrid } from "../../components/movies/movie-grid";

export function MovieListPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <div className="w-full px-10">
        <h1 className="mb-6 text-2xl font-bold text-[#111111]">
          영화 목록
        </h1>

        <MovieGrid movies={movies} />
      </div>
    </main>
  );
}