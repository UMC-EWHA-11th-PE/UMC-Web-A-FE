import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
import { movies } from "../../data/movies";
import Footer from "../../components/layout/footer";

export function SearchPage() {
    const { query } = useSearch({ from: "/search" });
    const navigate = useNavigate({ from: "/search" });
    const [searchText, setSearchText] = useState(query ?? "");
    const [prevQuery, setPrevQuery] = useState(query);

    if (query !== prevQuery) {
        setPrevQuery(query);
        setSearchText(query ?? "");
    }

    const normalizedQuery = query?.trim().toLowerCase() ?? "";
    const searchResults = normalizedQuery
        ? movies.filter(
            (movie) =>
                movie.title.toLowerCase().includes(normalizedQuery) ||
                movie.originalTitle.toLowerCase().includes(normalizedQuery),
        )
        : [];

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const nextQuery = searchText.trim();
        navigate({
            search: nextQuery ? { query: nextQuery } : {},
        });
    }

    if (!normalizedQuery) {
        return (
            <main className="flex flex-1 flex-col items-center px-[72px] pt-[209px] pb-[210px]">
                <div className="flex w-full max-w-[790px] flex-col items-center gap-9">
                    <h1 className="text-[46px] font-bold leading-[52.44px] tracking-[-2.3px]">어떤 영화를 찾고 있나요?</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="flex h-[74px] items-center gap-[14px] self-stretch rounded-xl border-2 border-(--color-text-primary) bg-(--color-bg-surface) pl-[21px] pr-[17px] shadow-[0_12px_34px_0_rgba(17,19,24,0.08)]"
                    >
                        <img className="size-6" src="/icons/movie-icons/search.svg" alt="" />
                        <input
                            aria-label="검색어"
                            placeholder="예: 스파이더맨"
                            className="flex-1 self-stretch bg-transparent px-[2px] py-[1px] text-[17px] leading-[normal] outline-none placeholder:text-(--color-text-tertiary)"
                            value={searchText}
                            onChange={(event) => setSearchText(event.target.value)}
                        />
                        <button
                            type="submit"
                            className="flex h-[42px] items-center justify-center rounded-lg border border-(--color-text-primary) bg-(--color-text-primary) px-4 text-sm font-extrabold text-(--color-bg-surface)"
                        >
                            검색
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    return (
        <div className="flex flex-1 flex-col">
            <main className="flex flex-1 flex-col px-20 py-6">
                <div className="flex flex-col gap-[17px]">
                    <h1 className="text-[38px] font-bold leading-11 tracking-[-1.71px]">영화 검색</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="flex h-[54px] items-center gap-[18px] rounded-[9px] border border-(--color-border-default) bg-(--color-bg-surface) pl-[15px] pr-[10px]"
                    >
                        <img className="size-6" src="/icons/movie-icons/search.svg" alt="" />
                        <input
                            aria-label="검색어"
                            className="flex-1 self-stretch bg-transparent px-[2px] py-[1px] text-sm font-bold leading-[normal] outline-none"
                            value={searchText}
                            onChange={(event) => setSearchText(event.target.value)}
                        />
                        {searchText && (
                            <button type="button" aria-label="검색어 지우기" onClick={() => setSearchText("")}>
                                <img className="size-6" src="/icons/movie-icons/close.svg" alt="" />
                            </button>
                        )}
                        <button
                            type="submit"
                            className="flex h-[42px] items-center justify-center rounded-lg border border-(--color-bg-surface) bg-(--color-text-primary) px-4 text-sm font-extrabold text-(--color-bg-surface)"
                        >
                            다시 검색
                        </button>
                    </form>
                </div>

                <div className="flex h-[54px] items-center justify-between border-y border-(--color-border-default)">
                    <h2 className="text-lg font-bold leading-[normal]">‘{query}’ 검색 결과</h2>
                    <p className="text-xs leading-[normal] text-(--color-text-tertiary)">영화 {searchResults.length}편</p>
                </div>

                {searchResults.length === 0 ? (
                    <p className="py-20 text-center text-sm text-(--color-text-secondary)">검색 결과가 없어요.</p>
                ) : (
                    <ul className="grid auto-rows-[240px] grid-cols-2 gap-x-10">
                        {searchResults.map((movie) => (
                            <li key={movie.id} className="flex items-start gap-[18px] border-b border-(--color-border-default) py-5">
                                <Link
                                    to="/movies/$movieId"
                                    params={{ movieId: String(movie.id) }}
                                    className="h-[190px] w-[126px] shrink-0 overflow-hidden rounded-[10px] bg-(--color-bg-page)"
                                >
                                    <img className="size-full object-cover" src={movie.posterPath} alt={`${movie.title} 포스터`} />
                                </Link>
                                <div className="flex min-w-0 flex-1 flex-col gap-2 pt-1">
                                    <h3 className="text-lg font-bold leading-[24.3px]">{movie.title}</h3>
                                    <p className="flex gap-2 text-xs leading-[normal] text-(--color-text-tertiary)">
                                        <span>{movie.originalTitle}</span>
                                        <span>{movie.releaseDate}</span>
                                    </p>
                                    <p className="line-clamp-3 h-[66px] text-[12.5px] leading-[20.25px] text-(--color-text-secondary)">
                                        {movie.overview}
                                    </p>
                                    <Link
                                        to="/movies/$movieId"
                                        params={{ movieId: String(movie.id) }}
                                        className="flex items-center gap-1 self-start text-xs font-extrabold leading-[normal] text-(--color-action-primary)"
                                    >
                                        상세 보기
                                        <img className="size-4" src="/icons/movie-icons/arrow-right-primary.svg" alt="" />
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
            <Footer />
        </div>
    );
}