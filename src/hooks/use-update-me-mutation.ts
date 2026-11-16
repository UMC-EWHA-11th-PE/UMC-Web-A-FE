import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { updateMe } from "../api/members/update-me";
import type { MemberInfo } from "../api/members/me";

export function useUpdateMeMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: updateMe,
    onSuccess: (response) => {
      queryClient.setQueryData<MemberInfo>(
        ["members", "me"],
        response.result,
      );
      alert("내 정보 수정에 성공했어요.");
      navigate({ to: "/mypage" });
    },
    onError: () => {
      alert("내 정보 수정에 실패했어요. 다시 시도해 주세요.");
    },
  });
}