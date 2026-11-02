import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import './examples/promise-status'
// import './examples/promise-syntax'
// import './examples/fetch-movies'

// 1. App.tsx 대신 라우터 관련 모듈과 생성된 라우트 트리를 불러옵니다.
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { routeTree } from './routeTree.gen'

// 2. 라우터 인스턴스를 생성합니다.
const router = createRouter({ routeTree })

// 3. TypeScript 자동완성을 위해 라우터 타입을 등록합니다. (필수 권장 사항)
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// 5. 서버 상태와 캐시를 관리하는 QueryClient를 생성합니다.
//    조회한 데이터는 1분 동안 최신(fresh)으로 취급해 같은 요청을 다시 보내지 않습니다.
const ONE_MINUTE = 60 * 1000
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: ONE_MINUTE } },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 6. QueryClientProvider로 앱 전체가 같은 캐시를 쓰게 하고, 개발 중 캐시를 볼 Devtools를 붙입니다. */}
    <QueryClientProvider client={queryClient}>
      {/* 4. 기존 <App /> 자리에 RouterProvider를 넣어줍니다. */}
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)