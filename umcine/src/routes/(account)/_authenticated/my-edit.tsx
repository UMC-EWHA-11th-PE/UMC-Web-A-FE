import { createFileRoute } from "@tanstack/react-router";
import { EditProfilePage } from "@/pages/mypage/edit-profile-page";

export const Route = createFileRoute("/(account)/_authenticated/my-edit")({
  component: MyEditRoute,
});

function MyEditRoute() {
  return <EditProfilePage nickname="gs0428" email="gwangsoo@cinemalab.kr" />;
}
