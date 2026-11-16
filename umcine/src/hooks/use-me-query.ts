import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/members/me";

export function useMeQuery() {
    return useQuery({
        queryKey: ["members", "me"],
        queryFn: getMe,
    })
}