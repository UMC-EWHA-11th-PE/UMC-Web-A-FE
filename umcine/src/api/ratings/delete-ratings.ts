import { authApi } from "../auth-api";

export async function deleteRating(
  memberId: number,
  ratingId: number,
): Promise<void> {
  await authApi.delete(`members/${memberId}/ratings/${ratingId}`);
}
