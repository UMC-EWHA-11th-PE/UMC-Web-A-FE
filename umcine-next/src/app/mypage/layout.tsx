import { ProtectedLayout } from "../../views/mypage/protected-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
