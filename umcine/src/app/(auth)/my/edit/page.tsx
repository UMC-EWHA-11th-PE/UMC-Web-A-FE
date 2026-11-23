import type { Metadata } from "next";
import { MyEditPage } from "../../../../screens/my/my-edit-page";

export const metadata: Metadata = {
  title: "내 정보 수정 | UMCine",
};

export default function MyEditRoute() {
  return <MyEditPage />;
}
