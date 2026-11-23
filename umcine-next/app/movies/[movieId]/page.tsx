import { Suspense } from "react";
import { MovieDetailPage } from "@/screens/movies/movie-detail-page";

export default function Page() {
  return (
    <Suspense fallback={<div>영화 정보를 불러오는 중...</div>}>
      <MovieDetailPage />
    </Suspense>
  );
}