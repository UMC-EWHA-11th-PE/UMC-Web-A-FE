import {apiClient} from "../api-client.ts";
import type {ApiResponse} from "../api-response.ts";

export interface Favorite {
    favoriteId: number;
    movieId: number;
    createdAt: string;
}

export interface FavoriteStatus {
    isFavorite: boolean;
}

export async function getFavorites() {
    const response = await apiClient.get("favorites").json<ApiResponse<Favorite[]>>();

    return response.result;
}

export async function getFavoriteStatus(movieId: number) {
    const response = await apiClient.get(`favorites/${movieId}`).json<ApiResponse<FavoriteStatus>>();

    return response.result;
}

export async function addFavorite(movieId: number) {
    const response = await apiClient
        .post("favorites", {json: {movieId}})
        .json<ApiResponse<Favorite>>();

    return response.result;
}

export async function removeFavorite(movieId: number) {
    await apiClient.delete(`favorites/${movieId}`);
}
