import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/auth-store";
import { useAddFavoriteMutation } from "./use-add-favorite-mutation";
import { useRemoveFavoriteMutation } from "./use-remove-favorite-mutation";

// 카드와 상세 화면이 같이 쓰는 즐겨찾기 토글. 현재 즐겨찾기 여부에 따라 추가 또는 해제를 요청함
export function useToggleFavorite(movieId: number, isFavorite: boolean) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const router = useRouter();
  const addMutation = useAddFavoriteMutation();
  const removeMutation = useRemoveFavoriteMutation();
  const isPending = addMutation.isPending || removeMutation.isPending;

  const toggle = () => {
    // 로그인하지 않았다면 로그인 화면으로 보냄
    if (!accessToken) {
      alert("로그인이 필요해요.");
      router.push("/login");
      return;
    }
    if (isPending) return;

    if (isFavorite) {
      removeMutation.mutate(movieId);
    } else {
      addMutation.mutate(movieId);
    }
  };

  return { toggle, isPending };
}
