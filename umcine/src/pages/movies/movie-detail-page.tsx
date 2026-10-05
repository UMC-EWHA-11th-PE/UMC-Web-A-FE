import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";
import Footer from "../../components/layout/footer.tsx";
import {BookmarkButton} from "../../components/bookmark-button.tsx";

const ratingScores = [1, 2, 3, 4, 5];

export function MovieDetailPage() {
    const { movieId } = useParams({ from: "/movies/$movieId" });
    const movie = movies.find((item) => item.id === Number(movieId));

    if (!movie) {
        return <main>영화를 찾을 수 없어요.</main>;
    }

    return (
        <>
            <div className="relative h-90">
                <img
                    className="absolute inset-0 size-full object-cover"
                    src={movie.backdropPath} alt="" aria-hidden="true" />
                <div className="absolute inset-0 flex flex-col justify-between items-start px-4 py-6 md:px-20 text-(--color-bg-surface)">
                    <Link className="flex items-center gap-1 text-[13px] font-bold" to="/">
                        <img className="size-6 invert" src="/icons/movie-icons/chevron-left.svg" alt="" />
                        영화 목록
                    </Link>
                    <div className="max-w-200 space-y-2">
                        <h1 className="text-[32px] font-bold leading-[36px] tracking-[-1.2px] md:text-[46px] md:leading-[49.68px] md:tracking-[-2.3px]">{movie.title}</h1>
                        <p className="text-sm leading-[normal]">{movie.originalTitle}</p>
                        <p className="flex flex-wrap gap-x-2 text-[13px] font-bold leading-[normal]">
                            <span>{movie.releaseDate}</span>
                            <span>{movie.genres.join(" · ")}</span>
                            <span>{movie.runtime}</span>
                        </p>
                    </div>
                </div>
            </div>

            <main className="flex flex-col gap-8 px-4 py-6 md:px-20 lg:flex-row lg:items-start">
                <div className="w-50 h-71.5 shrink-0 overflow-hidden rounded-[10px] bg-(--color-bg-page) shadow-[0_12px_30px_rgba(12,15,20,0.12)]">
                    <img className="size-full object-cover" src={movie.posterPath} alt={`${movie.title} 포스터`} />
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
