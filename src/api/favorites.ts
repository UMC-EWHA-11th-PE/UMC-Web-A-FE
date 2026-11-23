import { HTTPError } from "ky";
import { apiClient } from "./api-client";
import { useAuthStore } from "../stores/auth-store";

export interface FavoriteItem {
  movieId: number;
  title?: string;
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

function unwrapResult(response: unknown): unknown {
  if (
    typeof response === "object" &&
    response !== null
  ) {
    if (
      "isSuccess" in response &&
      response.isSuccess === false
    ) {
      throw new Error("즐겨찾기 요청에 실패했어요.");
    }

    if ("result" in response) {
      return response.result;
    }
  }

  return response;
}

export async function getFavorites(): Promise<FavoriteItem[]> {
  const response = await apiClient
    .get("favorites", {
      headers: getAuthHeaders(),
    })
    .json<unknown>();

  const result = unwrapResult(response);

  let items: unknown = result;

  if (
    typeof result === "object" &&
    result !== null
  ) {
    if ("content" in result) {
      items = result.content;
    } else if ("favorites" in result) {
      items = result.favorites;
    }
  }

  if (!Array.isArray(items)) {
    throw new Error("즐겨찾기 목록 응답 형식을 확인해 주세요.");
  }

  return items.map((item) => {
    if (typeof item === "number") {
      return { movieId: item };
    }

    if (
      typeof item === "object" &&
      item !== null &&
      "movieId" in item &&
      typeof item.movieId === "number"
    ) {
      return {
        movieId: item.movieId,
        title:
          "title" in item && typeof item.title === "string"
            ? item.title
            : undefined,
      };
    }

    throw new Error("즐겨찾기 항목 형식을 확인해 주세요.");
  });
}

export async function getFavorite(
  movieId: number,
): Promise<boolean> {
  try {
    const response = await apiClient
      .get(`favorites/${movieId}`, {
        headers: getAuthHeaders(),
      })
      .json<unknown>();

    const result = unwrapResult(response);

    if (typeof result === "boolean") {
      return result;
    }

    if (result === null) {
      return false;
    }

    if (
      typeof result === "object" &&
      result !== null
    ) {
      for (const key of [
        "isFavorite",
        "isFavorited",
        "isBookmarked",
        "favorite",
        "exists",
      ]) {
        if (
          key in result &&
          typeof result[key as keyof typeof result] === "boolean"
        ) {
          return result[key as keyof typeof result] as boolean;
        }
      }

      if ("movieId" in result) {
        return Number(result.movieId) === movieId;
      }
    }

    throw new Error("즐겨찾기 여부 응답 형식을 확인해 주세요.");
  } catch (error) {
    if (
      error instanceof HTTPError &&
      error.response.status === 404
    ) {
      return false;
    }

    throw error;
  }
}

export async function addFavorite(
  movieId: number,
): Promise<void> {
  await apiClient.post("favorites", {
    headers: getAuthHeaders(),
    json: { movieId },
  });
}

export async function deleteFavorite(
  movieId: number,
): Promise<void> {
  await apiClient.delete(`favorites/${movieId}`, {
    headers: getAuthHeaders(),
  });
}
