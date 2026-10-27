import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "../components/layout/header";
import TmdbLogo from "../assets/tmdb-logo.svg";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
      <footer className="border-t flex flex-row justify-end border-gray-200 bg-white px-5 py-6 text-center text-xs text-gray-500">
        <img src={TmdbLogo} alt="TMDB Logo" className=" h-6" />
        <p className="flex px-1 items-center">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </footer>
    </>
  ),
  notFoundComponent: () => <main>페이지를 찾을 수 없어요.</main>,
});
