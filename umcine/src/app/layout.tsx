import type {Metadata} from "next";
import type {ReactNode} from "react";
import {Header} from "../components/layout/header.tsx";
import {Providers} from "./providers.tsx";
import "../index.css";

export const metadata: Metadata = {
    title: "UMCine",
    description: "TMDB 영화 정보를 찾아보고 즐겨찾기와 평점을 남길 수 있는 UMCine",
    icons: {icon: "/favicon.svg"},
};

interface RootLayoutProps {
    children: ReactNode;
}

// 기존 index.html + __root.tsx 역할
export default function RootLayout({children}: RootLayoutProps) {
    return (
        <html lang="ko">
        <head>
            {/* eslint-disable-next-line @next/next/no-css-tags */}
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
            />
        </head>
        <body>
        <Providers>
            <div className="flex min-h-screen flex-col">
                <Header/>
                {children}
            </div>
        </Providers>
        </body>
        </html>
    );
}
