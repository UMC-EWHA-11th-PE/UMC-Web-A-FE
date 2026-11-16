import { createFileRoute } from "@tanstack/react-router";
import { EditProfilePage } from "../../../pages/auth/edit-profile-page";

export const Route = createFileRoute(
  "/(protected)/_authenticated/mypage/edit",
)({
  component: EditProfilePage,
});
