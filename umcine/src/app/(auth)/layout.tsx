import type { ReactNode } from "react";
import { AuthGuard } from "../../components/auth/auth-guard";

// 로그인 전용 Route Group의 공통 레이아웃. 주소에는 (auth)가 나타나지 않는다
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
