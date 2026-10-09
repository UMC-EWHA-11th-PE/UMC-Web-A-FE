import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { searchMovies } from "../../api/movies/search-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { BookmarkButton } from "../../components/bookmark-button";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

export function SearchPage() {
  const { query = "" } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  useEffect(() => {
    let ignore = false;
    const normalizedQuery = query.trim();

    setMovies([]);
    setErrorMessage(null);

    if (!normalizedQuery) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    searchMovies({ query: normalizedQuery })
      .then((response) => {
        if (!ignore) setMovies(response.results);
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

  const normalizedQuery = query.trim();

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextQuery = searchText.trim();

    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  if (!normalizedQuery) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-[1200px] items-center justify-center px-5">
        <div className="w-full max-w-[600px]">
          <h1 className="mb-6 text-center text-xl font-bold text-[#111111]">
            어떤 영화를 찾고 있나요?
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex overflow-hidden rounded-md border border-gray-300 bg-white"
          >
            <input
              aria-label="검색어"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="영화 제목을 입력해 주세요."
              className="min-w-0 flex-1 px-4 py-3 text-sm outline-none"
            />

            <button
              type="submit"
              className="m-1 cursor-pointer rounded bg-[#1b1d2e] px-4 text-sm text-white"
            >
              검색
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <div className="mx-auto max-w-[1200px] px-5 py-8">
        <h1 className="text-2xl font-bold text-[#111111]">
          영화 검색
        </h1>

        <p className="mb-6 mt-2 text-sm text-gray-500">
          ‘{query}’ 검색 결과 · 영화 {movies.length}편
        </p>

        <form
          onSubmit={handleSubmit}
          className="mb-8 flex overflow-hidden rounded-md border border-gray-300 bg-white"
        >
          <input
            aria-label="검색어"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            className="min-w-0 flex-1 px-4 py-3 text-sm outline-none"
          />

          <button
            type="submit"
            className="m-1 cursor-pointer rounded bg-[#1b1d2e] px-4 text-sm text-white"
          >
            검색
          </button>
        </form>

        {isLoading ? (
          <p role="status" className="py-20 text-center text-gray-500">
            검색 결과를 불러오는 중이에요.
          </p>
        ) : errorMessage ? (
          <p role="alert" className="py-20 text-center text-gray-500">
            {errorMessage}
          </p>
        ) : movies.length === 0 ? (
          <p className="py-20 text-center text-gray-500">
            검색 결과가 없어요.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
            {movies.map((movie) => (
              <li key={movie.id} className="flex gap-4">
                <Link
                  to="/movies/$movieId"
                  params={{ movieId: String(movie.id) }}
                  className="shrink-0"
                >

                  {getTmdbPosterUrl(movie.poster_path) ? (
                    <img
                      src={getTmdbPosterUrl(movie.poster_path)!}
                      alt={`${movie.title} 포스터`}
                      className="w-24 rounded-md object-cover"
                    />
                  ) : (
                    <div className="flex aspect-[2/3] w-24 items-center justify-center rounded-md bg-gray-200 text-xs text-gray-500">
                      이미지 없음
                    </div>
                  )}
                </Link>

                <div className="min-w-0">
                  <Link
                    to="/movies/$movieId"
                    params={{ movieId: String(movie.id) }}
                  >
                    <h2 className="font-bold text-[#111111]">
                      {movie.title}
                    </h2>
                  </Link>

                  <p className="mt-1 text-xs text-gray-500">
                    {movie.original_title}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {movie.release_date}
                  </p>

                  <p className="mt-2 line-clamp-3 text-xs leading-5 text-gray-600">
                    {movie.overview}
                  </p>

                  <div className="mt-2">
                    <BookmarkButton movieId={movie.id} />
                  </div>

                  <Link
                    to="/movies/$movieId"
                    params={{ movieId: String(movie.id) }}
                    className="mt-2 inline-block text-xs font-medium text-blue-600"
                  >
                    상세 보기
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
