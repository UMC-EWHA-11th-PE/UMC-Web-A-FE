import { useState } from 'react';
import type { Movie } from '../types/movie';
import MovieCard from './movie-card';
import './movie-grid.css';

interface MovieGridProps {
  movies: Movie[];
}

function MovieGrid({ movies }: MovieGridProps) {
  // 처음에 isBookmarked: true인 영화들의 id만 모아서 초기 상태로 사용
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(
    movies.filter((movie) => movie.isBookmarked).map((movie) => movie.id)
  );

  // 클릭된 영화의 id만 토글되도록 함 (다른 카드는 영향 없음)
  const handleToggleBookmark = (id: number) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((movieId) => movieId !== id) : [...prev, id]
    );
  };

  return (
    <section className="movie-grid">
      <h2 className="movie-grid__title">영화 목록</h2>
      <div className="movie-grid__list">
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
