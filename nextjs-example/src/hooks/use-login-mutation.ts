"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login } from "@/api/auth/login";
import { useAuthStore } from "@/stores/auth-store";

export function useLoginMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: async (response) => {
      await queryClient.cancelQueries();
      queryClient.clear();
      useAuthStore.getState().setAccessToken(response.result.accessToken);
      router.replace("/");
    },
    onError: () => {
      alert("로그인에 실패했어요. 다시 시도해 주세요.");
    },
  });
}
