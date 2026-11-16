import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "../../stores/auth-store";

// 로그인이 필요한 페이지의 공통 Layout Route. 주소에는 나타나지 않음
export const Route = createFileRoute("/(auth)/_auth")({
  // 토큰이 없으면 하위 페이지를 그리기 전에 로그인 화면으로 보냄
  beforeLoad: () => {
    if (!useAuthStore.getState().accessToken) {
      throw redirect({ to: "/login" });
    }
  },
  component: Outlet,
});
