import {Suspense} from "react";
import {MovieDetailPage} from "../../../screens/movies/movie-detail-page.tsx";

interface MovieDetailRouteProps {
    params: Promise<{ movieId: string }>;
}

export default function Page({params}: MovieDetailRouteProps) {
    return (
        <Suspense fallback={<main className="px-4 py-20 text-center md:px-20">영화 정보를 불러오는 중이에요.</main>}>
            <MovieDetailRoute params={params}/>
        </Suspense>
    );
}

async function MovieDetailRoute({params}: MovieDetailRouteProps) {
    const {movieId} = await params;

    return <MovieDetailPage movieId={movieId}/>;
}
