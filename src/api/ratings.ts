import { apiClient } from "./api-client";
import { useAuthStore } from "../stores/auth-store";

export interface Rating {
  ratingId: number;
  movieId: number;
  score: number;
  content: string;
}

export interface CreateRatingRequest {
  movieId: number;
  score: number;
  content: string;
}

export interface UpdateRatingRequest {
  ratingId: number;
  score: number;
  content: string;
}

function getAuthHeaders() {
  const accessToken = useAuthStore.getState().accessToken;

  if (!accessToken) {
    throw new Error("로그인이 필요합니다.");
  }

  return {
    Authorization: `Bearer ${accessToken}`,
  };
}

export async function getMemberRatings(
  memberId: number,
): Promise<Rating[]> {
  const response = await apiClient
    .get(`members/${memberId}/ratings`, {
      headers: getAuthHeaders(),
    })
    .json<unknown>();

  let result: unknown = response;

  if (
    typeof result === "object" &&
    result !== null &&
    "result" in result
  ) {
    result = result.result;
  }

  if (
    typeof result === "object" &&
    result !== null &&
    "content" in result
  ) {
    result = result.content;
  }

  if (!Array.isArray(result)) {
    throw new Error("평점 조회 응답 형식을 확인해 주세요.");
  }

  return result.map((item: unknown) => {
    if (typeof item !== "object" || item === null) {
      throw new Error("평점 데이터 형식이 올바르지 않아요.");
    }

    const data = item as Record<string, unknown>;

    const ratingId = Number(data.ratingId ?? data.id);
    const movieId = Number(data.movieId);
    const score = Number(data.score ?? data.rating);

    if (
      !Number.isInteger(ratingId) ||
      !Number.isInteger(movieId) ||
      !Number.isFinite(score)
    ) {
      throw new Error("평점 응답의 필수 항목을 확인해 주세요.");
    }

    return {
      ratingId,
      movieId,
      score,
      content:
        typeof data.content === "string"
          ? data.content
          : "",
    };
  });
}

export async function createRating(
  request: CreateRatingRequest,
): Promise<void> {
  await apiClient.post("ratings", {
    headers: getAuthHeaders(),
    json: request,
  });
}

export async function updateRating({
  ratingId,
  score,
  content,
}: UpdateRatingRequest): Promise<void> {
  await apiClient.patch(`ratings/${ratingId}`, {
    headers: getAuthHeaders(),
    json: { score, content },
  });
}

export async function deleteRating(
  ratingId: number,
): Promise<void> {
  await apiClient.delete(`ratings/${ratingId}`, {
    headers: getAuthHeaders(),
  });
}
