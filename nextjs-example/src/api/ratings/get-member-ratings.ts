import { authApi } from "../auth-api";

export interface MemberRating {
  ratingId: number;
  movieId: number;
  score: number;
  comment?: string | null;
}

export function getMemberRatings(memberId: number): Promise<MemberRating[]> {
  return authApi.get(`members/${memberId}/ratings`).json<MemberRating[]>();
}
