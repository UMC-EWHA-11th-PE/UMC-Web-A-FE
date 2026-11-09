import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate } from "@tanstack/react-router";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate.ts";
import { memberQueries } from "../../api/members/member-queries.ts";
import { updateMyInfo } from "../../api/members/my-info.ts";
import Footer from "../../components/layout/footer.tsx";
import { useAuthStore } from "../../stores/auth-store.ts";
import { cn } from "../../utils/cn.ts";
import { getApiErrorMessage } from "../../utils/get-api-error-message.ts";
import { FavoriteMovies } from "./favorite-movies.tsx";

const PAGE_TITLE_CLASS = "text-[31px] font-bold leading-[normal] tracking-[-1.24px]";
const INFO_LABEL_CLASS = "text-[11px] leading-[normal] text-(--color-text-tertiary)";
const INFO_VALUE_CLASS = "break-all text-sm font-bold leading-[normal]";
const FORM_LABEL_CLASS = "text-[13px] font-extrabold leading-[normal]";
const INPUT_CLASS = "min-w-0 flex-1 bg-transparent px-[2px] py-px text-sm leading-[normal] outline-none placeholder:text-(--color-text-tertiary)";
const ERROR_CLASS = "text-[11px] leading-[normal] text-(--color-danger-default)";
const HELPER_CLASS = "text-[11px] leading-[normal] text-(--color-text-secondary)";
const PRIMARY_BUTTON_CLASS =
    "flex h-[42px] shrink-0 items-center justify-center rounded-lg border border-(--color-bg-surface) bg-(--color-action-primary) px-4 text-sm font-extrabold leading-[normal] text-(--color-bg-surface) hover:bg-(--color-action-hover) active:bg-(--color-action-pressed) disabled:cursor-not-allowed disabled:bg-(--color-action-disabled)";
const SECONDARY_BUTTON_CLASS =
    "flex h-[42px] shrink-0 items-center justify-center rounded-lg border border-(--color-border-default) bg-(--color-bg-surface) px-4 text-sm font-extrabold leading-[normal] text-(--color-text-secondary)";
const STATUS_CLASS = "flex flex-1 items-center justify-center px-4 py-10";

function Avatar() {
    return (
        <span className="grid size-[82px] shrink-0 place-items-center rounded-full bg-(--color-border-default)">
            <img className="size-12" src="/icons/movie-icons/person.svg" alt="" />
        </span>
    );
}

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
    const nicknameCheckMutation = useMutation({ mutationFn: checkNicknameDuplicate });

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (myInfoQuery.isPending) {
        return <main className={STATUS_CLASS}>내 정보를 불러오는 중이에요.</main>;
    }

    if (myInfoQuery.isError) {
        return (
            <main className={STATUS_CLASS}>
                {getApiErrorMessage(myInfoQuery.error, "내 정보를 불러오지 못했어요.")}
            </main>
        );
    }

    const myInfo = myInfoQuery.data;
    const trimmedNickname = nickname.trim();
    const isNicknameValid = trimmedNickname.length >= 2 && trimmedNickname.length <= 12;
    const isNicknameChanged = trimmedNickname !== myInfo.nickname;
    const showNicknameError = nickname.length > 0 && !isNicknameValid;

    // 중복 확인 후 입력값이 바뀌면 이전 결과는 현재 닉네임에 적용하지 않는다.
    const isCheckCurrent = nicknameCheckMutation.variables === trimmedNickname;
    const isNicknameAvailable = isCheckCurrent && nicknameCheckMutation.data?.available === true;
    const isNicknameTaken = isCheckCurrent && nicknameCheckMutation.data?.available === false;
    const isCheckFailed = isCheckCurrent && nicknameCheckMutation.isError;

    const canCheckNickname = isNicknameValid && isNicknameChanged && !nicknameCheckMutation.isPending;
    const canSave = isNicknameValid && isNicknameChanged && isNicknameAvailable && !updateMutation.isPending;

    const handleStartEdit = () => {
        updateMutation.reset();
        nicknameCheckMutation.reset();
        setNickname(myInfo.nickname);
        setIsEditing(true);
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!canSave) return;

        updateMutation.mutate({ nickname: trimmedNickname });
    };

    if (isEditing) {
        return (
            <main className="flex flex-1 flex-col px-4 py-6 md:px-20">
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-col gap-[9px]">
                            <h1 className={PAGE_TITLE_CLASS}>내 정보 수정</h1>
                            <p className="text-sm leading-[22.4px] text-(--color-text-secondary)">닉네임만 변경할 수 있어요.</p>
                        </div>
                        <div className="flex gap-2">
                            <button type="button" className={SECONDARY_BUTTON_CLASS} onClick={() => setIsEditing(false)}>취소</button>
                            <button type="submit" disabled={!canSave} className={PRIMARY_BUTTON_CLASS}>변경사항 저장</button>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-8 md:flex-row">
                        <div className="flex flex-1 flex-col items-center gap-1">
                            <Avatar />
                            <p className="text-[15px] font-bold leading-[normal]">프로필 이미지</p>
                        </div>

                        <div className="flex w-full flex-1 flex-col gap-[17px]">
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="profile-nickname" className={FORM_LABEL_CLASS}>닉네임</label>
                                    <div
                                        className={cn(
                                            "flex min-h-12 items-center gap-2 rounded-lg border bg-(--color-bg-surface) px-[13px] py-[14px]",
                                            showNicknameError || isNicknameTaken
                                                ? "border-(--color-danger-default)"
                                                : "border-(--color-border-default) focus-within:border-(--color-action-primary)",
                                        )}
                                    >
                                        <input
                                            id="profile-nickname"
                                            type="text"
                                            placeholder="2–12자"
                                            className={INPUT_CLASS}
                                            value={nickname}
                                            onChange={(e) => setNickname(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="shrink-0 text-xs font-extrabold leading-[normal] text-(--color-action-primary) disabled:cursor-not-allowed disabled:text-(--color-text-tertiary)"
                                            disabled={!canCheckNickname}
                                            onClick={() => nicknameCheckMutation.mutate(trimmedNickname)}
                                        >
                                            {nicknameCheckMutation.isPending ? "확인 중" : "중복 확인"}
                                        </button>
                                    </div>
                                </div>
                                {showNicknameError && <p className={ERROR_CLASS}>2자 이상 12자 이하로 입력해주세요.</p>}
                                {isNicknameAvailable && <p className={HELPER_CLASS}>사용할 수 있는 닉네임이에요.</p>}
                                {isNicknameTaken && <p className={ERROR_CLASS}>이미 사용 중인 닉네임이에요.</p>}
                                {isCheckFailed && <p className={ERROR_CLASS}>중복 확인에 실패했어요. 다시 시도해 주세요.</p>}
                                {updateMutation.isError && (
                                    <p className={ERROR_CLASS}>
                                        {getApiErrorMessage(updateMutation.error, "내 정보를 수정하지 못했어요. 다시 시도해 주세요.")}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="profile-email" className={FORM_LABEL_CLASS}>이메일</label>
                                <div className="flex min-h-12 items-center rounded-lg border border-(--color-border-default) bg-(--color-bg-surface) px-[13px] py-[14px]">
                                    <input id="profile-email" type="email" readOnly className={INPUT_CLASS} value={myInfo.email} />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        );
    }

    return (
        <>
            <main className="flex flex-1 flex-col gap-7 px-4 py-6 md:px-20">
                <div className="flex items-center justify-between gap-4">
                    <h1 className={PAGE_TITLE_CLASS}>내 정보</h1>
                    <button type="button" className={PRIMARY_BUTTON_CLASS} onClick={handleStartEdit}>정보 수정</button>
                </div>

                <section className="flex flex-col gap-4 border-y border-(--color-border-default) py-3">
                    <h2 className="text-[17px] font-bold leading-[normal]">기본 정보</h2>
                    <div className="flex items-center gap-7">
                        <Avatar />
                        <dl className="flex w-full max-w-[760px] flex-col gap-4 sm:flex-row sm:gap-7">
                            <div className="flex flex-1 flex-col gap-1.5">
                                <dt className={INFO_LABEL_CLASS}>닉네임</dt>
                                <dd className={INFO_VALUE_CLASS}>{myInfo.nickname}</dd>
                            </div>
                            <div className="flex flex-1 flex-col gap-1.5">
                                <dt className={INFO_LABEL_CLASS}>이메일</dt>
                                <dd className={INFO_VALUE_CLASS}>{myInfo.email}</dd>
                            </div>
                        </dl>
                    </div>
                </section>

                <FavoriteMovies />
            </main>
            <Footer />
        </>
    );
}
