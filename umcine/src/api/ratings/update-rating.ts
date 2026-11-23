import { authApi } from "../auth-api";
import type { RatingInfo } from "./get-ratings";

export interface UpdateRatingInfo {
    score: number;
    comment?: string;
}

interface UpdateRatingResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: RatingInfo;
}


export function updateRating(ratingId:number, body: UpdateRatingInfo) {
    return authApi.patch(`ratings/${ratingId}`, {json: body}).json<UpdateRatingResponse>();
}