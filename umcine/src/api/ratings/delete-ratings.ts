import { authApi } from "../auth-api";
import type { DeleteResponse } from "../favorites/delete-favorite";


export async function deleteRating(ratingId:number): Promise<null> {
    const response = await authApi.delete(`ratings/${ratingId}`).json<DeleteResponse>();
    return response.result;
}

