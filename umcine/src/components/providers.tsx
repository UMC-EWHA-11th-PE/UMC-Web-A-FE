"use client";

import { useEffect, useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAuthStore } from "../stores/auth-store";
import { useProfileStore } from "../stores/profile-store";
import { useViewSettingsStore } from "../stores/view-settings-store";

// 조회한 데이터는 1분 동안 최신(fresh)으로 취급해 같은 요청을 다시 보내지 않는다
const ONE_MINUTE = 60 * 1000;

export function Providers({ children }: { children: ReactNode }) {
  // 컴포넌트 안에서 만들어서 요청(사용자)마다 캐시가 섞이지 않게 하고, 다시 렌더링돼도 같은 인스턴스를 쓴다
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: ONE_MINUTE } } }),
  );

  // 서버에는 localStorage가 없어서 store를 기본값으로 그린다.
  // 브라우저에서 화면이 붙은 뒤에 localStorage 값을 불러와야 서버 HTML과 첫 화면이 같아진다
  useEffect(() => {
    useAuthStore.persist.rehydrate();
    useProfileStore.persist.rehydrate();
    useViewSettingsStore.persist.rehydrate();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
