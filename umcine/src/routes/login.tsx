import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginPage } from "../pages/auth/login-page";
import { useAuthStore } from "../stores/auth-store";

export const Route = createFileRoute("/login")({
  // 이미 토큰이 있으면 로그인 화면을 보여주지 않고 홈으로 보냄
  beforeLoad: () => {
    if (useAuthStore.getState().accessToken) {
      throw redirect({ to: "/" });
    }
  },
  component: LoginPage,
});
