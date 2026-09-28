import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import SearchForm from "../../components/movies/search-form";
import SearchResultCard from "../../components/movies/search-result-card";
import { movies } from "../../data/movies";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  // 검색어가 없을 때: Figma "영화 검색" 화면 (위아래 여백 209px, 제목과 검색창 사이 36px)
  if (!normalizedQuery) {
    return (
      <main className="flex flex-col items-center gap-9 px-[72px] py-[209px]">
        <h1 className="text-[46px] leading-[52.44px] font-bold tracking-[-2.3px] text-fg">
          어떤 영화를 찾고 있나요?
        </h1>
        <div className="flex w-full max-w-[790px] flex-col gap-3">
          <SearchForm
            variant="hero"
            value={searchText}
            onChange={setSearchText}
            onSubmit={handleSubmit}
          />
          <p className="text-center text-sm leading-[17px] text-fg-tertiary">
            검색어를 입력해 주세요.
          </p>
        </div>
      </main>
    );
  }

  // 검색어가 있을 때: Figma "영화 검색 결과" 화면 (좌우 80px / 상하 24px 여백)
  return (
    <main className="flex flex-col gap-6 px-4 py-6 sm:px-20">
      <div className="flex flex-col gap-[17px]">
        <h1 className="text-[38px] leading-[44px] font-bold tracking-[-1.71px] text-fg">
          영화 검색
        </h1>
        <SearchForm
          variant="compact"
          value={searchText}
          onChange={setSearchText}
          onSubmit={handleSubmit}
          onClear={() => setSearchText("")}
        />
      </div>

      <section>
        {/* 검색어와 결과 수: 높이 54px, 위아래 1px 구분선 */}
        <div className="flex h-[54px] items-center justify-between border-y border-line">
          <h2 className="text-lg leading-[21px] font-bold text-fg">‘{query}’ 검색 결과</h2>
          <span className="text-xs leading-[14px] text-fg-tertiary">
            영화 {searchResults.length}편
          </span>
        </div>

        {searchResults.length === 0 ? (
          <p className="py-16 text-center text-sm leading-[17px] text-fg-secondary">
            검색 결과가 없어요.
          </p>
        ) : (
          // Figma: 2열, 열 간격 40px (작은 화면은 1열)
          <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {searchResults.map((movie) => (
              <li key={movie.id}>
                <SearchResultCard movie={movie} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
