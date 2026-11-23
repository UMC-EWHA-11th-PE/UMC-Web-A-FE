import { authApi } from "../auth-api";

interface CreateRatingInput {
  movieId: number;
  score: number;
  comment?: string;
}

interface CreateRatingResponse {
  result: { ratingId: number };
}

export async function createRating(input: CreateRatingInput): Promise<number> {
  const response = await authApi
    .post("ratings", { json: input })
    .json<CreateRatingResponse>();

  return response.result.ratingId;
}
