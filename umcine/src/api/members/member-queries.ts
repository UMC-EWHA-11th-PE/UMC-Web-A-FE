import { queryOptions } from "@tanstack/react-query";
import { getMyInfo } from "./my-info.ts";

const memberQueries = {
    me: (isLoggedIn: boolean) =>
        queryOptions({
            queryKey: ["members", "me"],
            queryFn: getMyInfo,
            enabled: isLoggedIn,
            // ky가 이미 재시도하므로 중복 재시도하지 않음
            retry: false,
        }),
};

export { memberQueries };
