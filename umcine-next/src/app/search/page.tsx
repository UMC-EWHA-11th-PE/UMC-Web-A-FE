import { Suspense } from "react";
import { SearchPage } from "../../views/movies/search-page";

export default function Page() {
  // useSearchParams를 쓰는 컴포넌트는 Suspense로 감싸야 빌드가 통과해요.
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
}
