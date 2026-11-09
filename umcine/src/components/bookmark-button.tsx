import { type ReactNode } from "react";

import { useBookmarkStore } from "../stores/bookmark-store";
import { cn } from "../utils/cn";

interface bookmarkButtonProps {
    movieId: number;
    buttonStyle?: string;
    children?: ReactNode | ((isBookmarked: boolean)=>ReactNode);
}

export function BookmarkButton({ movieId, buttonStyle, children }: bookmarkButtonProps) {
    const isBookmarked = useBookmarkStore((state)=>
        state.bookmarkedMovieIds.includes(movieId),
    );

    const toggleBookmark = useBookmarkStore((state) =>
        state.toggleBookmark,
    );

    return (
        <button 
            type="button" 
            onClick={() => toggleBookmark(movieId)} 
            className={cn(buttonStyle, isBookmarked ? "bg-[#2563EB] border-blue-100" : "bg-black/60 border border-white",)}
        >
            {typeof children === "function" ? children(isBookmarked) : children}
        </button>
    );

}


/*
            aria-pressed={isBookmarked} 
            onClick={() =>toggleBookmark(movieId)}
            className={cn(
            "absolute right-[10px] top-[10px] flex items-center justify-center box-border w-[34px] h-[34px] rounded-[8px]",
            isBookmarked ? "bg-[#2563EB] border-blue-100" : "bg-black/60 border border-white",
            )}
        >
            <img 
            src= {isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
            className="w-[34px] h-[34px] brightness-0 invert"
            />
*/
