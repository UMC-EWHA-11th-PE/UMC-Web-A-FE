import { authApi } from "../auth-api";

export interface IsFavoriteInfo {
    movieId: number;
}

interface IsFavoriteResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: IsFavoriteInfo;
}

export async function getIsFavorite(movieId: number): Promise<IsFavoriteInfo> {
    const response = await authApi.get(`favorites/${movieId}`).json<IsFavoriteResponse>();
    return response.result;
}