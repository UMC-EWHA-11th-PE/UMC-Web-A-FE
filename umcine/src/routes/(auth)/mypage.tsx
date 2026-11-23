import { createFileRoute } from "@tanstack/react-router";
import { MyPage } from "../../screens/my/my-page.tsx";

export const Route = createFileRoute("/(auth)/mypage")({ component: MyPage });
