import { authApi } from "../auth-api";

interface UpdateRatingInput {
  score: number;
  comment?: string;
}

export async function updateRating(
  ratingId: number,
  input: UpdateRatingInput,
): Promise<void> {
  await authApi.patch(`ratings/${ratingId}`, { json: input });
}
