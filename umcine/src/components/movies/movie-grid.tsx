import type { Movie } from "../../types/movie";
import MovieCard from "./movie-card";
import { useBookmarkStore } from "../../../stores/bookmark-store";

interface MovieGridProps {
  movies: Movie[];
}

function MovieGrid({ movies }: MovieGridProps) {
  const bookmarkedIds = useBookmarkStore((state) => state.bookmarkedMovieIds);
  const handleToggleBookmark = useBookmarkStore(
    (state) => state.toggleBookmark,
  );

  return (
    <section className="bg-[#f7f7f8] px-20 py-6">
      <h2 className="m-0 mb-5 text-[22px] font-bold text-[#111]">영화 목록</h2>

      <div className="grid grid-cols-5 gap-5 [@media(max-width:1024px)]:grid-cols-3 [@media(max-width:640px)]:grid-cols-2">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isBookmarked={bookmarkedIds.includes(movie.id)}
            onToggleBookmark={handleToggleBookmark}
          />
        ))}
      </div>
    </section>
  );
}

export default MovieGrid;
