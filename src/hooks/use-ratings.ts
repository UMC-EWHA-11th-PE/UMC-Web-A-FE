import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getMemberRatings,
  createRating,
  updateRating,
  deleteRating,
} from "../api/ratings";
import { useAuthStore } from "../stores/auth-store";

export function useMemberRatings(memberId: number | null) {
  const accessToken = useAuthStore(
    (state) => state.accessToken,
  );

  return useQuery({
    queryKey: ["ratings", "member", memberId],
    queryFn: () => getMemberRatings(memberId!),
    enabled: Boolean(accessToken) && memberId !== null,
    retry: false,
  });
}

export function useCreateRating() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRating,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ratings"],
      });
      alert("평점이 등록되었어요.");
    },
    onError: () => {
      alert("평점 등록에 실패했어요.");
    },
  });
}

export function useUpdateRating() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRating,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ratings"],
      });
      alert("평점이 수정되었어요.");
    },
    onError: () => {
      alert("평점 수정에 실패했어요.");
    },
  });
}

export function useDeleteRating() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRating,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ratings"],
      });
      alert("평점이 삭제되었어요.");
    },
    onError: () => {
      alert("평점 삭제에 실패했어요.");
    },
  });
}
