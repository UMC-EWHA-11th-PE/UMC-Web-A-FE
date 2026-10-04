import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Header } from "../components/layout/header";
import { Footer } from '../components/layout/footer';

export const Route = createRootRoute({
  component: () => (
    <>
      <Header isLoggedIn={true} />
      <Outlet/>
      <Footer />
    </>
  ),
  notFoundComponent: () => <main>페이지를 찾을 수 없어요.</main>,
})
