import { Suspense } from "react";
import { MovieDetailPage } from "@/screens/movies/movies-detail-page";

export default function Page() {
  return (
    <Suspense
      fallback={<main className="p-6">영화 정보를 불러오는 중이에요.</main>}
    >
      <MovieDetailPage />
    </Suspense>
  );
}
