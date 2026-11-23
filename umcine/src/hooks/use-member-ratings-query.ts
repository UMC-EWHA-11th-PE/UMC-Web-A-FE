import { useQuery } from "@tanstack/react-query";
import { getMemberRatings } from "../api/ratings/get-member-ratings";

// 회원 번호를 key에 넣어서 회원마다 따로 캐시함. 회원 번호를 알기 전에는 조회하지 않음
export function useMemberRatingsQuery(memberId: number | undefined) {
  return useQuery({
    queryKey: ["ratings", memberId],
    queryFn: () => getMemberRatings(memberId as number),
    enabled: memberId !== undefined,
    retry: false,
  });
}
