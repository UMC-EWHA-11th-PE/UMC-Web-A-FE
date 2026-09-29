import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { movies } from "../../data/movies";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

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

  return (
    <main className="flex-1 bg-[#f7f7f8] px-5 py-10 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-[#111]">영화 검색</h1>
        <p className="mt-2 text-sm text-[#777]">
          영화 제목이나 원제로 원하는 영화를 찾아보세요.
        </p>

        <form
          onSubmit={handleSubmit}
          role="search"
          className="mt-6 flex gap-2"
        >
          <input
            type="search"
            aria-label="검색어"
            placeholder="영화 제목을 입력하세요"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            className="min-w-0 flex-1 rounded-lg border border-[#ddd] bg-white px-4 py-3 text-sm text-[#111] outline-none placeholder:text-[#999] focus:border-[#2f5bea] focus:ring-2 focus:ring-[#2f5bea]/20"
          />

          <button
            type="submit"
            className="shrink-0 cursor-pointer rounded-lg bg-[#2f5bea] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2448c7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f5bea]"
          >
            검색
          </button>
        </form>

        {!normalizedQuery ? (
          <div className="mt-8 rounded-xl border border-[#e5e5e5] bg-white px-6 py-20 text-center">
            <p className="font-semibold text-[#333]">
              검색어를 입력해 주세요.
            </p>
            <p className="mt-2 text-sm text-[#888]">
              보고 싶은 영화의 제목으로 검색할 수 있어요.
            </p>
          </div>
        ) : (
          <section className="mt-10" aria-label="검색 결과">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="break-words text-lg font-bold text-[#111]">
                ‘{query}’ 검색 결과
              </h2>
              <p className="text-sm text-[#777]">
                영화{" "}
                <span className="font-semibold text-[#2f5bea]">
                  {searchResults.length}
                </span>
                편
              </p>
            </div>

            {searchResults.length === 0 ? (
              <div className="mt-5 rounded-xl border border-[#e5e5e5] bg-white px-6 py-20 text-center">
                <p className="font-semibold text-[#333]">
                  검색 결과가 없어요.
                </p>
                <p className="mt-2 text-sm text-[#888]">
                  다른 검색어를 입력하거나 띄어쓰기를 확인해 주세요.
                </p>
              </div>
            ) : (
              <ul className="mt-5 space-y-4">
                {searchResults.map((movie) => (
                  <li key={movie.id}>
                    <Link
                      to="/movies/$movieId"
                      params={{ movieId: String(movie.id) }}
                      className="group flex gap-4 rounded-xl border border-[#e5e5e5] bg-white p-4 no-underline transition hover:border-[#2f5bea]/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f5bea] sm:gap-6 sm:p-5"
                    >
                      <img
                        src={movie.posterPath}
                        alt={`${movie.title} 포스터`}
                        loading="lazy"
                        className="aspect-[2/3] w-24 shrink-0 self-start rounded-lg bg-[#eee] object-cover sm:w-32"
                      />

                      <div className="flex min-w-0 flex-1 flex-col items-start py-1">
                        <h3 className="text-base font-bold text-[#111] transition-colors group-hover:text-[#2f5bea] sm:text-xl">
                          {movie.title}
                        </h3>

                        <p className="mt-1 text-sm text-[#888]">
                          {movie.originalTitle}
                        </p>

                        <p className="mt-3 text-xs text-[#777] sm:text-sm">
                          개봉일 · {movie.releaseDate}
                        </p>

                        <p className="mt-3 text-sm leading-relaxed text-[#555]">
                          {movie.overview}
                        </p>

                        <span className="mt-auto pt-4 text-sm font-semibold text-[#2f5bea]">
                          상세 보기 →
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
    </main>
  );
}