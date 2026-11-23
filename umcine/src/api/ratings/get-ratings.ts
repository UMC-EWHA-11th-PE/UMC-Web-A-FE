import { apiClient } from "../members/api-Client";

export interface RatingInfo {
    ratingId: number;
    movieId: number;
    score: number;
    comment?: string;
    createdAt: string;
    updatedAt: string;

}

/*
interface GetRatingsResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: RatingInfo[];
}
    */

export async function getRatings(memberId: number): Promise<RatingInfo[]> {
    const response = await apiClient
        .get(`members/${memberId}/ratings`)
        .json<RatingInfo[]>();

    return response;
}