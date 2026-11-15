import {useMutation, useQueryClient} from "@tanstack/react-query";
import {memberQueries} from "../api/members/member-queries.ts";
import {updateMyInfo} from "../api/members/my-info.ts";

export function useUpdateMyInfoMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateMyInfo,
        // 응답에 수정된 내 정보가 담겨 오므로 다시 조회하지 않고 캐시를 바로 갱신
        onSuccess: (myInfo) => {
            queryClient.setQueryData(memberQueries.me(true).queryKey, myInfo);
        },
    });
}
