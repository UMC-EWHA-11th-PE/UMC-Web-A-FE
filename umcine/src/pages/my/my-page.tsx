import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate } from "@tanstack/react-router";
import { memberQueries } from "../../api/members/member-queries.ts";
import { updateMyInfo } from "../../api/members/my-info.ts";
import { useAuthStore } from "../../stores/auth-store.ts";
import { cn } from "../../utils/cn.ts";
import { getApiErrorMessage } from "../../utils/get-api-error-message.ts";

const LABEL_CLASS = "text-[13px] font-extrabold leading-[normal]";
const VALUE_CLASS = "min-h-12 border-b border-(--color-border-default) py-[14px] text-sm leading-[normal]";
const ERROR_CLASS = "text-[11px] leading-[normal] text-(--color-danger-default)";
const PRIMARY_BUTTON_CLASS =
    "flex h-12 flex-1 items-center justify-center rounded-lg border border-(--color-bg-surface) bg-(--color-action-primary) px-4 text-sm font-extrabold leading-[normal] text-(--color-bg-surface) hover:bg-(--color-action-hover) active:bg-(--color-action-pressed) disabled:cursor-not-allowed disabled:bg-(--color-action-disabled)";
const SECONDARY_BUTTON_CLASS =
    "flex h-12 flex-1 items-center justify-center rounded-lg border border-(--color-border-default) bg-(--color-bg-surface) px-4 text-sm font-extrabold leading-[normal] text-(--color-text-secondary)";
const MAIN_CLASS = "flex flex-1 items-center justify-center px-4 py-10";

export function MyPage() {
    const isLoggedIn = useAuthStore((state) => state.accessToken !== null);
    const queryClient = useQueryClient();
    const myInfoQuery = useQuery(memberQueries.me(isLoggedIn));

    const [isEditing, setIsEditing] = useState(false);
    const [nickname, setNickname] = useState("");

    const updateMutation = useMutation({
        mutationFn: updateMyInfo,
        onSuccess: (myInfo) => {
            queryClient.setQueryData(memberQueries.me(isLoggedIn).queryKey, myInfo);
            setIsEditing(false);
        },
    });

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (myInfoQuery.isPending) {
        return <main className={MAIN_CLASS}>내 정보를 불러오는 중이에요.</main>;
    }

    if (myInfoQuery.isError) {
        return (
            <main className={MAIN_CLASS}>
                {getApiErrorMessage(myInfoQuery.error, "내 정보를 불러오지 못했어요.")}
            </main>
        );
    }

    const myInfo = myInfoQuery.data;
    const trimmedNickname = nickname.trim();
    const isNicknameValid = trimmedNickname.length >= 2 && trimmedNickname.length <= 12;
    const showNicknameError = nickname.length > 0 && !isNicknameValid;
    const canSave = isNicknameValid && !updateMutation.isPending;

    const handleStartEdit = () => {
        updateMutation.reset();
        setNickname(myInfo.nickname);
        setIsEditing(true);
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isEditing || !canSave) return;

        updateMutation.mutate({ nickname: trimmedNickname });
    };

    return (
        <main className={MAIN_CLASS}>
            <form
                onSubmit={handleSubmit}
                noValidate
                className="flex w-full max-w-[430px] flex-col gap-4"
            >
                <h1 className="text-[34px] font-bold leading-[normal] tracking-[-1.53px]">내 정보</h1>

                <div className="flex flex-col gap-2">
                    <p className={LABEL_CLASS}>이메일</p>
                    <p className={cn(VALUE_CLASS, "text-(--color-text-secondary)")}>{myInfo.email}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <p className={LABEL_CLASS}>가입일</p>
                    <p className={cn(VALUE_CLASS, "text-(--color-text-secondary)")}>
                        {new Date(myInfo.createdAt).toLocaleDateString("ko-KR")}
                    </p>
                </div>

                {isEditing ? (
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="my-nickname" className={LABEL_CLASS}>닉네임</label>
                            <div
                                className={cn(
                                    "flex min-h-12 items-center rounded-lg border bg-(--color-bg-surface) px-[13px] py-[14px]",
                                    showNicknameError
                                        ? "border-(--color-danger-default)"
                                        : "border-(--color-border-default) focus-within:border-(--color-action-primary)",
                                )}
                            >
                                <input
                                    id="my-nickname"
                                    type="text"
                                    placeholder="2–12자"
                                    className="min-w-0 flex-1 bg-transparent px-[2px] py-px text-sm leading-[normal] outline-none placeholder:text-(--color-text-tertiary)"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                />
                            </div>
                        </div>
                        {showNicknameError && <p className={ERROR_CLASS}>2자 이상 12자 이하로 입력해주세요.</p>}
                        {updateMutation.isError && (
                            <p className={ERROR_CLASS}>
                                {getApiErrorMessage(updateMutation.error, "내 정보를 수정하지 못했어요. 다시 시도해 주세요.")}
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <p className={LABEL_CLASS}>닉네임</p>
                        <p className={VALUE_CLASS}>{myInfo.nickname}</p>
                    </div>
                )}

                {isEditing ? (
                    <div className="flex gap-2">
                        <button type="button" className={SECONDARY_BUTTON_CLASS} onClick={() => setIsEditing(false)}>취소</button>
                        <button type="submit" disabled={!canSave} className={PRIMARY_BUTTON_CLASS}>저장</button>
                    </div>
                ) : (
                    <div className="flex">
                        <button type="button" className={PRIMARY_BUTTON_CLASS} onClick={handleStartEdit}>정보 수정</button>
                    </div>
                )}
            </form>
        </main>
    );
}
