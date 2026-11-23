import { useSyncExternalStore } from "react";
import { useAuthStore } from "../stores/auth-store";

// 토큰을 localStorage에서 불러왔는지 알려준다.
// 서버와 하이드레이션 중에는 false라서, 불러오기 전의 빈 토큰을 "로그인 안 함"으로 오해하지 않는다
export function useAuthHydrated() {
  return useSyncExternalStore(
    (onChange) => useAuthStore.persist.onFinishHydration(onChange),
    () => useAuthStore.persist.hasHydrated(),
    () => false,
  );
}
