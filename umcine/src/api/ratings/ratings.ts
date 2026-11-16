import {apiClient} from "../api-client.ts";
import type {ApiResponse} from "../api-response.ts";

export interface Rating {
    ratingId: number;
    movieId: number;
    score: number;
    comment: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateRatingRequest {
    movieId: number;
    score: number;
    comment?: string;
}

export interface UpdateRatingRequest {
    score: number;
    comment?: string;
}

// 이 API만 공통 응답 형식 없이 배열을 그대로 돌려준다
export function getMemberRatings(memberId: number) {
    return apiClient.get(`members/${memberId}/ratings`).json<Rating[]>();
}

export async function createRating(body: CreateRatingRequest) {
    const response = await apiClient.post("ratings", {json: body}).json<ApiResponse<Rating>>();

    return response.result;
}

export async function updateRating(ratingId: number, body: UpdateRatingRequest) {
    const response = await apiClient
        .patch(`ratings/${ratingId}`, {json: body})
        .json<ApiResponse<Rating>>();

    return response.result;
}

export async function deleteRating(ratingId: number) {
    await apiClient.delete(`ratings/${ratingId}`);
}
