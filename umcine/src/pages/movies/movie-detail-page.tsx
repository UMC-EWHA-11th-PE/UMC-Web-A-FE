import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Footer from "../../components/layout/footer.tsx";
import {BookmarkButton} from "../../components/bookmark-button.tsx";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { getTmdbBackdropUrl, getTmdbPosterUrl } from "../../utils/movies/tmdb-image";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";

const ratingScores = [1, 2, 3, 4, 5];

function formatRuntime(runtime: number | null) {
    if (runtime === null) return "상영 시간 정보가 없어요.";
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
}

export function MovieDetailPage() {
    const { movieId } = useParams({ from: "/movies/$movieId" });
    const parsedMovieId = Number(movieId);
    const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;

    const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;

        async function loadMovieDetail() {
            setMovie(null);
            setErrorMessage(null);

            if (!isValidMovieId) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);

            try {
                const response = await getMovieDetail(parsedMovieId);
                if (!ignore) setMovie(response);
            } catch (error) {
                if (!ignore) setErrorMessage(getMovieDetailErrorMessage(error));
            } finally {
                if (!ignore) setIsLoading(false);
            }
        }

        loadMovieDetail();

        return () => {
            ignore = true;
        };
    }, [parsedMovieId, isValidMovieId]);

    if (!isValidMovieId) {
        return <main className="px-4 py-20 text-center md:px-20">올바르지 않은 영화 번호예요.</main>;
    }

    if (isLoading) {
        return <main className="px-4 py-20 text-center md:px-20">영화 정보를 불러오는 중이에요.</main>;
    }

    if (errorMessage || !movie) {
        return <main className="px-4 py-20 text-center md:px-20">{errorMessage ?? "영화를 찾을 수 없어요."}</main>;
    }

    const posterUrl = getTmdbPosterUrl(movie.poster_path);
    const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);

    return (
        <>
            <div className="relative h-90">
                {backdropUrl ? (
                    <img
                        className="absolute inset-0 size-full object-cover"
                        src={backdropUrl} alt="" aria-hidden="true" />
                ) : (
                    <div className="absolute inset-0 grid place-items-center bg-gray-500 text-sm text-white">이미지 없음</div>
                )}
                <div className="absolute inset-0 flex flex-col justify-between items-start px-4 py-6 md:px-20 text-(--color-bg-surface)">
                    <Link className="flex items-center gap-1 text-[13px] font-bold" to="/">
                        <img className="size-6 invert" src="/icons/movie-icons/chevron-left.svg" alt="" />
                        영화 목록
                    </Link>
                    <div className="max-w-200 space-y-2">
                        <h1 className="text-[32px] font-bold leading-[36px] tracking-[-1.2px] md:text-[46px] md:leading-[49.68px] md:tracking-[-2.3px]">{movie.title}</h1>
                        <p className="text-sm leading-[normal]">{movie.original_title}</p>
                        <p className="flex flex-wrap gap-x-2 text-[13px] font-bold leading-[normal]">
                            <span>{movie.release_date}</span>
                            <span>{movie.genres.map((genre) => genre.name).join(", ")}</span>
                            <span>{formatRuntime(movie.runtime)}</span>
                        </p>
                    </div>
                </div>
            </div>

            <main className="flex flex-col gap-8 px-4 py-6 md:px-20 lg:flex-row lg:items-start">
                <div className="w-50 h-71.5 shrink-0 overflow-hidden rounded-[10px] bg-(--color-bg-page) shadow-[0_12px_30px_rgba(12,15,20,0.12)]">
                    {posterUrl ? (
                        <img className="size-full object-cover" src={posterUrl} alt={`${movie.title} 포스터`} />
                    ) : (
                        <div className="grid size-full place-items-center bg-gray-200 text-xs text-(--color-text-tertiary)">이미지 없음</div>
                    )}
                </div>

                <section className="min-w-0 flex-1 space-y-3">
                    <h2 className="text-[21px] font-bold leading-[normal] tracking-[-0.63px]">{movie.tagline}</h2>
                    <p className="text-sm leading-6 text-(--color-text-secondary)">{movie.overview}</p>
                    <BookmarkButton movieId={movie.id} />
                </section>

                <aside className="w-full shrink-0 space-y-2 border-t border-(--color-border-default) pt-6 lg:w-90 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-[30px] lg:pb-[41px]">
                    <h2 className="text-[21px] font-bold leading-[normal] tracking-[-0.63px]">내 평점</h2>
                    <p className="text-xs leading-[normal] text-(--color-text-tertiary)">
                        별점은 필수, 후기는 선택이에요.
                    </p>
                    <div className="flex gap-1" role="group" aria-label="영화 별점">
                        {ratingScores.map((score) => (
                            <button
                                key={score}
                                type="button"
                                className="grid size-[38px] place-items-center rounded-lg border border-(--color-border-default) bg-(--color-bg-surface)"
                                aria-label={`${score}점`}>
                                <img className="size-6 opacity-70" src="/icons/movie-icons/star.svg" alt="" />
                            </button>
                        ))}
                    </div>
                    <textarea
                        id="review-text"
                        className="block w-full h-[102px] resize-none rounded-lg border border-(--color-border-default) bg-(--color-bg-surface) px-3 pt-4 pb-[18px] text-[13px] leading-[19.5px] placeholder:text-(--color-text-tertiary)"
                        placeholder="영화를 보고 느낀 점을 남겨보세요." />
                    <button
                        id="save-rating"
                        type="button"
                        className="w-full h-10.5 rounded-lg border border-(--color-bg-surface) bg-(--color-text-primary) text-sm font-extrabold text-(--color-bg-surface)">
                        평점 저장
                    </button>
                </aside>
            </main>
            <Footer/>
        </>
    );
}
