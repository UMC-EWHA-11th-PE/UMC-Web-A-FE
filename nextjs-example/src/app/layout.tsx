import type { Metadata } from "next";
import type { ReactNode } from "react";
import Providers from "./providers";
import "./globals.css";
import Header from "@/components/layout/header";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "UMCine",
  description: "영화 검색과 평점 기록",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <Suspense
            fallback={
              <div className="h-[73px] border-b border-gray-200 bg-white" />
            }
          >
            <Header />
          </Suspense>

          {children}
        </Providers>
      </body>
    </html>
  );
}
