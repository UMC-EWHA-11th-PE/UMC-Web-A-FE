import { authApi } from "../auth-api";
import type { RatingInfo } from "./get-ratings";

export interface PostRatingInfo {
    movieId: number;
    score: number;
    comment?: string;
}

interface PostRatingResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: RatingInfo;
}

export async function postRating(data: PostRatingInfo): Promise<RatingInfo> {
    const response = await authApi.post("ratings", { json: data }).json<PostRatingResponse>();
    return response.result;
}