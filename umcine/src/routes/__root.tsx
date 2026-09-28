import { createRootRoute, Outlet } from '@tanstack/react-router';
import Header from '../components/layout/header';

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      {/* Outlet은 현재 주소에 맞는 페이지(index, search 등)가 렌더링되는 구멍입니다 */}
      <Outlet /> 
    </>
  ),
});