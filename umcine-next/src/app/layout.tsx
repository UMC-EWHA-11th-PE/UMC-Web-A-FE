import type { Metadata } from "next";
import "./globals.css";
import { Provider, Suspense } from "react";
import { Header } from "../components/layout/header";
import { Footer } from "../components/layout/footer";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "umcine",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Suspense fallback={<div className="h-[91px] border-b border-[#E3E6EB] bg-white" />}>
              <Header />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
