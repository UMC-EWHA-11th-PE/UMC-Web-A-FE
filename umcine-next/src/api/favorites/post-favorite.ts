import { authApi } from "../auth-api";
import type { FavoriteInfo } from "./get-favorites";

export interface FavoriteMovieInfo {
    movieId: number;
}

interface PostFavoriteResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: FavoriteInfo;
}

export async function postFavorites(data: FavoriteMovieInfo): Promise<FavoriteInfo> {
    const response = await authApi.post("favorites", { json: data }).json<PostFavoriteResponse>();
    return response.result;
}