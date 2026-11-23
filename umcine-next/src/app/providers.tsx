"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAuthStore } from "../stores/auth-store";
import { useBookmarkStore } from "../stores/bookmark-store";

const ONE_MINUTE = 60 * 1000;

export function Providers({ children }: { children: React.ReactNode }) {
  // useState로 감싸야 리렌더링되어도 QueryClient가 새로 만들어지지 않아요.
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: ONE_MINUTE } } }),
  );

  // localStorage는 브라우저에서만 읽을 수 있어서, 마운트된 뒤에 저장된 값을 불러와요.
  useEffect(() => {
    useAuthStore.persist.rehydrate();
    useBookmarkStore.persist.rehydrate();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
