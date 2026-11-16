import { authApi } from "../auth-api";

interface AddFavoriteResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    favoriteId: number;
    movieId: number;
    createdAt: string;
  };
}

export function addFavorite(movieId: number) {
  return authApi.post("favorites", { json: { movieId } }).json<AddFavoriteResponse>();
}
