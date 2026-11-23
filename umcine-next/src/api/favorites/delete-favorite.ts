import { authApi } from "../auth-api";

export interface DeleteResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: null;
}

export async function deleteFavorites(movieId:number): Promise<null> {
    const response = await authApi.delete(`favorites/${movieId}`).json<DeleteResponse>();
    return response.result;
}
