import { authApi } from "../auth-api";

interface AddFavoriteResponse {
  result: {
    favoriteId: number;
    movieId: number;
    createdAt: string;
  };
}

export async function addFavorite(movieId: number) {
  const response = await authApi
    .post("favorites", { json: { movieId } })
    .json<AddFavoriteResponse>();

  return response.result;
}
