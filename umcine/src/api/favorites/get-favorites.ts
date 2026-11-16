import { authApi } from "../auth-api";

export interface Favorite {
  favoriteId: number;
  movieId: number;
  createdAt: string;
}

interface FavoritesResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Favorite[];
}

// 내 즐겨찾기 목록. 최근에 추가한 순서로 내려옴
export async function getFavorites(): Promise<Favorite[]> {
  const response = await authApi.get("favorites").json<FavoritesResponse>();
  return response.result;
}
