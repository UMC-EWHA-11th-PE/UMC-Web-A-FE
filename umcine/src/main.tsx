import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// 1. App.tsx 대신 라우터 관련 모듈과 생성된 라우트 트리를 불러옵니다.
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

// 2. 라우터 인스턴스를 생성합니다.
const router = createRouter({ routeTree })

// 3. TypeScript 자동완성을 위해 라우터 타입을 등록합니다. (필수 권장 사항)
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 4. 기존 <App /> 자리에 RouterProvider를 넣어줍니다. */}
    <RouterProvider router={router} />
  </StrictMode>,
)