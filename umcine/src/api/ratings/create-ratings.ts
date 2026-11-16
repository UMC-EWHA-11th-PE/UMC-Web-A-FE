import { authApi } from "../auth-api";

interface CreateRatingInput {
  movieId: number;
  score: number;
  comment?: string;
}

interface CreateRatingResponse {
  result: number;
}

export async function createRating(
  memberId: number,
  input: CreateRatingInput,
): Promise<number> {
  const response = await authApi
    .post(`members/${memberId}/ratings`, { json: input })
    .json<CreateRatingResponse>();

  return response.result;
}
