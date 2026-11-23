import { useQuery } from "@tanstack/react-query";
import { getFavoriteStatus } from "../api/favorites/get-favorite-status";
import { useAuthStore } from "../stores/auth-store";

// ["favorites"]로 시작하는 key라서, 목록을 무효화하면 영화별 여부도 함께 다시 조회됨
export function useFavoriteStatusQuery(movieId: number) {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["favorites", "status", movieId],
    queryFn: () => getFavoriteStatus(movieId),
    enabled: Boolean(accessToken),
    retry: false,
  });
}
