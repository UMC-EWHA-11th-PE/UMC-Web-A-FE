import { Suspense } from "react";
import { SearchPage } from "@/screens/movies/search-page";

export default function Page() {
  return (
    <Suspense fallback={<main className="p-10">검색 화면을 불러오는 중...</main>}>
      <SearchPage />
    </Suspense>
  );
}
