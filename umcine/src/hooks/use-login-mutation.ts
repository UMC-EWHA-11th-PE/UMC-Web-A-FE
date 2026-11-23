import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { login } from "../api/auth/login";
import { useAuthStore } from "../stores/auth-store";
import { getMemberIdFromToken } from "../utils/get-member-id";

export function useLoginMutation() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const setAccessToken = useAuthStore((state)=>state.setAccessToken);
    const setMemberId = useAuthStore((state) => state.setMemberId);


    return useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            const token = response.result.accessToken;
            const memberId = getMemberIdFromToken(token);

            console.log("추출한 memberId:", memberId);

            setAccessToken(token);
            setMemberId(memberId);

            console.log("저장 후 Zustand:", useAuthStore.getState());

            alert("로그인에 성공했어요.");
            queryClient.invalidateQueries({ queryKey: ["members", "me"] });
            navigate({ to: "/" });
        },
        onError: () => {
            alert("로그인에 실패했어요. 다시 시도해주세요.");
        },
    });
}