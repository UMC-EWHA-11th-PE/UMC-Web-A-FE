import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getFavorites,
  getFavorite,
  addFavorite,
  deleteFavorite,
} from "../api/favorites";
import { useAuthStore } from "../stores/auth-store";

export function useFavorites() {
  const accessToken = useAuthStore(
    (state) => state.accessToken,
  );

  return useQuery({
    queryKey: ["favorites", "list"],
    queryFn: getFavorites,
    enabled: Boolean(accessToken),
    retry: false,
  });
}

export function useFavorite(movieId: number) {
  const accessToken = useAuthStore(
    (state) => state.accessToken,
  );

  return useQuery({
    queryKey: ["favorites", "detail", movieId],
    queryFn: () => getFavorite(movieId),
    enabled: Boolean(accessToken) && movieId > 0,
    retry: false,
  });
}

export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
    onError: () => {
      alert("즐겨찾기 추가에 실패했어요.");
    },
  });
}

export function useDeleteFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
    onError: () => {
      alert("즐겨찾기 삭제에 실패했어요.");
    },
  });
}
