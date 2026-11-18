import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getMe } from "@/api/members/me";
import { updateMe } from "@/api/members/update-me";
import { EditProfilePage } from "@/pages/mypage/edit-profile-page";

const meQueryKey = ["members", "me"] as const;

export const Route = createFileRoute("/(account)/_authenticated/my-edit")({
  component: MyEditRoute,
});

function MyEditRoute() {
  const queryClient = useQueryClient();
  const meQuery = useQuery({
    queryKey: meQueryKey,
    queryFn: getMe,
  });

  if (meQuery.isPending) return <p>회원 정보를 불러오는 중이에요.</p>;
  if (meQuery.isError) return <p>회원 정보를 불러오지 못했어요.</p>;

  return (
    <EditProfilePage
      nickname={meQuery.data.nickname}
      email={meQuery.data.email}
      onSave={async ({ nickname }) => {
        const response = await updateMe({ nickname });
        queryClient.setQueryData(meQueryKey, response.result);
      }}
    />
  );
}
