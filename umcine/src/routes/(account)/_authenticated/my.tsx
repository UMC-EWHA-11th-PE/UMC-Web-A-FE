import { createFileRoute } from "@tanstack/react-router";
import { ViewProfilePage } from "@/pages/mypage/view-profile-page";

export const Route = createFileRoute("/(account)/_authenticated/my")({
  component: ViewProfilePage,
});
