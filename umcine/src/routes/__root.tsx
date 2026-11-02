import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Header } from "../components/layout/header";
import { Footer } from '../components/layout/footer';

export const Route = createRootRoute({
  component: () => (
    <div className='flex min-h-screen flex-col'>
      <Header isLoggedIn={true} />
      <main className='flex-1'>
        <Outlet/>
      </main>
      <Footer />
    </div>
  ),
  notFoundComponent: () => <main>페이지를 찾을 수 없어요.</main>,
})
