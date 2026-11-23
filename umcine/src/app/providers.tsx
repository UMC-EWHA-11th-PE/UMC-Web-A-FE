"use client";

import {type ReactNode, useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {StoreHydrator} from "../components/store-hydrator.tsx";

const ONE_MINUTE = 60 * 1000;

interface ProvidersProps {
    children: ReactNode;
}

// Context를 쓰는 Provider는 Server Component인 layout에 둘 수 없어서 클라이언트 컴포넌트로 분리한다
export function Providers({children}: ProvidersProps) {
    // 모듈 전역으로 만들면 서버에서 요청끼리 캐시가 공유되므로 컴포넌트마다 한 번만 만든다
    const [queryClient] = useState(
        () => new QueryClient({
            defaultOptions: {queries: {staleTime: ONE_MINUTE}},
        }),
    );

    return (
        <QueryClientProvider client={queryClient}>
            <StoreHydrator/>
            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
}
