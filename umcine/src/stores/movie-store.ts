import { useSyncExternalStore } from "react";
import { movies } from "../data/movies";
import type { Movie } from "../types/movie";

// 페이지가 언마운트돼도 북마크 상태가 사라지지 않도록, 영화 목록을 컴포넌트 밖에서 관리
const movieList: Movie[] = movies;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return movieList;
}

export function useMovieList() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
