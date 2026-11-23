"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe } from "@/api/members/me";
import { updateMe } from "@/api/members/update-me";
import { EditProfilePage } from "@/screens/mypage/edit-profile-page";

export default function Page() {
  const queryClient = useQueryClient();
  const meQuery = useQuery({
    queryKey: ["members", "me"],
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
        queryClient.setQueryData(["members", "me"], response.result);
      }}
    />
  );
}
