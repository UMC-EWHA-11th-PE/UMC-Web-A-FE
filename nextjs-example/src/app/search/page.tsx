import { Suspense } from "react";
import { SearchPage } from "@/screens/movies/search-page";

export default function Page() {
  return (
    <Suspense fallback={<p className="p-6">검색 화면을 불러오는 중이에요.</p>}>
      <SearchPage />
    </Suspense>
  );
}
