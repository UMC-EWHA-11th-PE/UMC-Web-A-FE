import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/my")({
  component: MyPage,
});

function MyPage() {
  return <main>내정보</main>;
}