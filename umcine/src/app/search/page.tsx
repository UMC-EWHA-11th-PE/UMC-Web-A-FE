import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPage } from "../../screens/movies/search-page";

export const metadata: Metadata = {
  title: "영화 검색 | UMCine",
};

// SearchPage가 useSearchParams로 주소의 검색어를 읽어서, 빌드할 때 미리 만들 수 있게 Suspense로 감싼다
export default function SearchRoute() {
  return (
    <Suspense fallback={<main className="px-20 py-6">검색 화면을 불러오는 중이에요.</main>}>
      <SearchPage />
    </Suspense>
  );
}
