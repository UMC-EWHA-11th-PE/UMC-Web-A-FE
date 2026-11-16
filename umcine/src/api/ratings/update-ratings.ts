import { authApi } from "../auth-api";

interface UpdateRatingInput {
  score: number;
  comment?: string;
}

export async function updateRating(
  memberId: number,
  ratingId: number,
  input: UpdateRatingInput,
): Promise<void> {
  await authApi.patch(`members/${memberId}/ratings/${ratingId}`, {
    json: input,
  });
}
