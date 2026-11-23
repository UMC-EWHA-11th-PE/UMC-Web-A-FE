import { authApi } from "../auth-api";

export interface FavoriteStatus {
  movieId: number;
  favorited: boolean;
}

interface FavoriteStatusResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: FavoriteStatus;
}

// 영화 상세에서 이 영화를 즐겨찾기했는지 확인
export async function getFavoriteStatus(movieId: number): Promise<FavoriteStatus> {
  const response = await authApi.get(`favorites/${movieId}`).json<FavoriteStatusResponse>();
  return response.result;
}
