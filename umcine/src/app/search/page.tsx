import type {Metadata} from "next";
import {Suspense} from "react";
import {SearchPage} from "../../screens/movies/search-page.tsx";

export const metadata: Metadata = {
    title: "영화 검색 | UMCine",
};

interface SearchRouteProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

// searchParams는 요청마다 달라서 Suspense 안에서 기다린다(cacheComponents)
export default function Page({searchParams}: SearchRouteProps) {
    return (
        <Suspense fallback={<main className="flex-1"/>}>
            <SearchRoute searchParams={searchParams}/>
        </Suspense>
    );
}

async function SearchRoute({searchParams}: SearchRouteProps) {
    const {query} = await searchParams;

    // 기존 validateSearch와 같이 문자열일 때만 검색어로 사용한다
    return <SearchPage query={typeof query === "string" ? query : undefined}/>;
}
