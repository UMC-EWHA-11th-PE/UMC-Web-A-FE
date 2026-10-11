import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { searchMovies } from "../../api/movies/search-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    let ignore = false;
    const normalizedQuery = (query ?? "").trim();

    setMovies([]);
    setTotalResults(0);
    setErrorMessage(null);

    if (!normalizedQuery) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    searchMovies({ query: normalizedQuery })
      .then((response) => {
        if (!ignore) {
          setMovies(response.results);
          setTotalResults(response.total_results);
        }
      })
      .catch(() => {
        if (!ignore) setErrorMessage("검색 결과를 불러오지 못했어요.");
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [query]);

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  const normalizedQuery = (query ?? "").trim();
  const searchResults = movies;

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();

    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  return (
    <main className="flex-1 bg-[#f7f7f8] px-5 py-20 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl text-center font-semibold text-[#111]">
          어떤 영화를 찾고 있나요?
        </h1>
        <div className="border-black border-1 rounded-xl px-2 py-1 mt-8  shadow-gray-300 bg-white">
          <form onSubmit={handleSubmit} role="search" className=" flex py-1">
            <input
              type="search"
              aria-label="검색어"
              placeholder="영화 제목을 입력하세요"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              className="min-w-0 flex-1 px-4 text-sm text-[#111] placeholder:text-[#999]"
            />

            <button
              type="submit"
              className="shrink-0 cursor-pointer rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2448c7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f5bea]"
            >
              검색
            </button>
          </form>
        </div>

        {!normalizedQuery ? (
          <div className="mt-8 rounded-xl border border-[#e5e5e5] bg-white px-6 py-20 text-center">
            <p className="font-semibold text-[#333]">검색어를 입력해 주세요.</p>
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

            {isLoading ? (
              <p className="mt-5 text-sm text-[#777]" role="status">
                검색 중이에요.
              </p>
            ) : errorMessage ? (
              <p className="mt-5 text-sm text-red-600" role="alert">
                {errorMessage}
              </p>
            ) : searchResults.length === 0 ? (
              <div className="mt-5 rounded-xl border border-[#e5e5e5] bg-white px-6 py-20 text-center">
                <p className="font-semibold text-[#333]">검색 결과가 없어요.</p>
                <p className="mt-2 text-sm text-[#888]">
                  다른 검색어를 입력하거나 띄어쓰기를 확인해 주세요.
                </p>
              </div>
            ) : (
              <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {searchResults.map((movie) => (
                  <li key={movie.id}>
                    <Link
                      to="/movies/$movieId"
                      params={{ movieId: String(movie.id) }}
                      className="group flex h-60 gap-4 rounded-xl border border-[#e5e5e5] bg-white p-4 no-underline transition hover:border-[#2f5bea]/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f5bea] sm:gap-6 sm:p-5"
                    >
                      <img
                        src={getTmdbPosterUrl(movie.poster_path) ?? undefined}
                        alt={`${movie.title} 포스터`}
                        loading="lazy"
                        className="aspect-[2/3] w-24 shrink-0 self-start rounded-lg bg-[#eee] object-cover sm:w-32"
                      />

                      <div className="flex min-w-0 flex-1 flex-col items-start py-1">
                        <h3 className="text-base font-bold text-[#111] transition-colors group-hover:text-[#2f5bea] sm:text-xl">
                          {movie.title}
                        </h3>

                        <p className="mt-1 text-sm text-[#888]">
                          {movie.original_title}
                        </p>

                        <p className="mt-2 text-xs text-[#777] sm:text-sm">
                          개봉일 · {movie.release_date}
                        </p>

                        <p className="mt-2 text-sm  line-clamp-3  leading-relaxed text-[#555]">
                          {movie.overview}
                        </p>
                        <span className="mt-auto  pt-4 text-sm ml-auto hover:underline font-semibold text-[#2f5bea]">
                          → 상세 보기
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
