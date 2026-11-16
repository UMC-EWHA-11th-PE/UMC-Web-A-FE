import { authApi } from "../auth-api";

export interface FavoriteInfo {
    favoriteId: number;
    movieId: number;
    createdAt: string;
}

interface FavoriteResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: FavoriteInfo[];
}

export async function getFavorites(): Promise<FavoriteInfo[]> {
    const response = await authApi.get("favorites").json<FavoriteResponse>();
    return response.result;
}