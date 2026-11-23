import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BookmarkStore {
    bookmarkedMovieIds: number[];
    toggleBookmark: (movieId: number) => void;
}

export const useBookmarkStore = create<BookmarkStore>()(
    persist(
        (set) => ({
            bookmarkedMovieIds: [],
            toggleBookmark: (movieId) => 
                set((state) => ({
                    bookmarkedMovieIds: state.bookmarkedMovieIds.includes(movieId)
                        ?state.bookmarkedMovieIds.filter((id) => id !== movieId)
                        : [...state.bookmarkedMovieIds, movieId],
            })),
        }),

        {
            name: "umcine-bookmark-store",
            storage: createJSONStorage(() => localStorage),
            skipHydration: true, // 복원은 Providers에서 해요.
            partialize: (state) => ({
                bookmarkedMovieIds: state.bookmarkedMovieIds,
            }),
        },
    ),

);
