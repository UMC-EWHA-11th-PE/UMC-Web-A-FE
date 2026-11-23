import { type ReactNode } from "react";
import { useFavoritesQuery } from "../hooks/use-favorite-query";
import { useDeleteFavoirteMutation } from "../hooks/use-delete-favorite";
import { useAddFavoirteMutation } from "../hooks/use-add-favorite-mutation";
import { cn } from "../utils/cn";

interface bookmarkButtonProps {
    movieId: number;
    buttonStyle?: string;
    children?: ReactNode | ((isBookmarked: boolean)=>ReactNode);
}

export function BookmarkButton({ movieId, buttonStyle, children }: bookmarkButtonProps) {
    const { data: favorites =[]} = useFavoritesQuery();

    const isBookmarked = favorites.some((favorite)=>
        favorite.movieId === movieId,
    );

    const deleteFavoriteMutation = useDeleteFavoirteMutation()
    const addFavoriteMutation = useAddFavoirteMutation()

    const toggleBookmark = () => {
        if(isBookmarked) deleteFavoriteMutation.mutate(movieId)
        else addFavoriteMutation.mutate({movieId});
    };


    return (
        <button 
            type="button" 
            onClick={toggleBookmark} 
            className={cn(buttonStyle, isBookmarked ? "bg-[#2563EB] border-blue-100" : "bg-black/60 border border-white",)}
        >
            {typeof children === "function" ? children(isBookmarked) : children}
        </button>
    );

}

