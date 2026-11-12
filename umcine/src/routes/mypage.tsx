import { createFileRoute } from "@tanstack/react-router";
import { MyPage } from "../pages/my/my-page.tsx";

export const Route = createFileRoute("/mypage")({ component: MyPage });
