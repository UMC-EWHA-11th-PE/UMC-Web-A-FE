import { authApi } from "../auth-api";

interface GetFavoriteResponse {
  result: { isFavorite: boolean };
}

export async function getFavorite(movieId: number): Promise<boolean> {
  const response = await authApi
    .get(`favorites/${movieId}`)
    .json<GetFavoriteResponse>();

  return response.result.isFavorite;
}
