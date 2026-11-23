import type { Metadata } from "next";
import type { ReactNode } from "react";
import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import { Providers } from "../components/providers";
import "../index.css";

// 모든 페이지에 공통으로 쓰는 페이지 정보. 페이지마다 다른 제목은 각 page.tsx에서 덮어쓴다
export const metadata: Metadata = {
  title: "UMCine",
  description: "TMDB 영화를 둘러보고 즐겨찾기와 평점을 남기는 영화 서비스예요.",
  icons: { icon: "/favicon.svg" },
};

// 기존 index.html과 main.tsx, __root.tsx가 하던 일을 루트 레이아웃이 맡는다
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard는 Google Fonts에 없어서 기존처럼 CDN 스타일시트로 불러온다 */}
        <link rel="stylesheet" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
      </head>
      <body>
        <Providers>
          {/* 헤더 / 본문(남은 높이 전부) / 푸터 — 본문이 짧아도 푸터가 화면 아래에 붙어요. */}
          <div className="grid min-h-screen grid-rows-[auto_1fr_auto] bg-page font-sans text-fg">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
