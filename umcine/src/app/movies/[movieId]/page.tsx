import type { Metadata } from "next";
import { getMovieDetail } from "../../../api/movies/get-movie-detail";
import { MovieDetailPage } from "../../../screens/movies/movie-detail-page";

interface MovieDetailRouteProps {
  params: Promise<{ movieId: string }>;
}

// 서버에서 영화 정보를 조회해 탭 제목과 설명을 영화마다 다르게 만든다
export async function generateMetadata({ params }: MovieDetailRouteProps): Promise<Metadata> {
  const { movieId } = await params;

  try {
    const movie = await getMovieDetail(Number(movieId));
    return { title: `${movie.title} | UMCine`, description: movie.overview };
  } catch {
    return { title: "영화 상세 | UMCine" };
  }
}

// 페이지는 Server Component로 두고 주소의 영화 번호만 읽어서, 화면을 그리는 Client Component에 넘긴다
export default async function MovieDetailRoute({ params }: MovieDetailRouteProps) {
  const { movieId } = await params;

  return <MovieDetailPage movieId={movieId} />;
}
