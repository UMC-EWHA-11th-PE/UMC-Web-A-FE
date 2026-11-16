import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/members/me";
import { useAuthStore } from "../stores/auth-store";

// 헤더, 내 정보, 내 정보 수정 화면이 같은 query key와 옵션으로 내 정보를 조회함
export function useMeQuery() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    // 토큰이 있을 때만 조회
    enabled: Boolean(accessToken),
    // 내 정보는 자주 바뀌지 않아서 5분 동안 최신으로 봄
    staleTime: 5 * 60 * 1000,
    // 401로 토큰을 지운 뒤 같은 조회를 다시 시도하지 않도록 재시도를 끔
    retry: false,
  });
}
