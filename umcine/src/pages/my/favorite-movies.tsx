import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { movieQueries } from "../../api/movies/movie-queries.ts";
import MovieCard from "../../components/movies/movie-card.tsx";
import Pagination from "../../components/movies/pagination.tsx";
import { useBookmarkStore } from "../../stores/bookmark-store.ts";

const PAGE_SIZE = 5;
const MESSAGE_CLASS = "py-10 text-center text-sm text-(--color-text-secondary)";

export function FavoriteMovies() {
    const bookmarkedMovieIds = useBookmarkStore((state) => state.bookmarkedMovieIds);
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(bookmarkedMovieIds.length / PAGE_SIZE));
    // 즐겨찾기를 해제해 마지막 페이지가 사라져도 빈 페이지가 보이지 않게 한다.
    const currentPage = Math.min(page, totalPages);
    const pageMovieIds = bookmarkedMovieIds.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE,
    );

    const movieQueryResults = useQueries({
        queries: pageMovieIds.map((movieId) => movieQueries.detail(movieId)),
    });

    const movies = movieQueryResults.flatMap(({ data }) =>
        data ? [{ ...data, genre_ids: data.genres.map((genre) => genre.id) }] : [],
    );
    const isLoading = movieQueryResults.some((result) => result.isPending);
    const hasFailedMovie = movieQueryResults.some((result) => result.isError && !result.data);

    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-[17px] font-bold leading-[normal]">내 즐겨찾기</h2>

            {bookmarkedMovieIds.length === 0 ? (
                <p className={MESSAGE_CLASS}>아직 즐겨찾기한 영화가 없어요.</p>
            ) : (
                <>
                    {movies.length > 0 && (
                        <div className="grid grid-cols-2 gap-x-[18px] gap-y-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {movies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    )}
                    {isLoading && <p className={MESSAGE_CLASS}>즐겨찾기한 영화를 불러오는 중이에요.</p>}
                    {hasFailedMovie && <p className={MESSAGE_CLASS}>일부 영화를 불러오지 못했어요.</p>}
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
                </>
            )}
        </section>
    );
}
