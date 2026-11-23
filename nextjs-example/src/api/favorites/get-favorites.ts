import { authApi } from "../auth-api";

interface FavoriteListItem {
  movieId: number;
}

interface GetFavoritesResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: FavoriteListItem[];
}

export async function getFavorites(): Promise<FavoriteListItem[]> {
  const response = await authApi.get("favorites").json<GetFavoritesResponse>();

  return response.result;
}
