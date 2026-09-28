import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

export const Route = createRootRoute({
  component: () => (
    // 헤더 / 본문(남은 높이 전부) / 푸터 — 본문이 짧아도 푸터가 화면 아래에 붙어요.
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] bg-page font-sans text-fg">
      <Header />
      <Outlet />
      <Footer />
    </div>
  ),
  notFoundComponent: () => <main>페이지를 찾을 수 없어요.</main>,
});
