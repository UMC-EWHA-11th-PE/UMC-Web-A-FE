import { authApi } from "../auth-api";
import type { Rating } from "./get-member-ratings";

export interface UpdateRatingRequest {
  ratingId: number;
  score: number;
  comment: string | null;
}

interface RatingResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Rating;
}

// 경로에는 ratingId만 쓰고, 본문에는 바꿀 값만 보냄
export function updateRating({ ratingId, ...body }: UpdateRatingRequest) {
  return authApi.patch(`ratings/${ratingId}`, { json: body }).json<RatingResponse>();
}
