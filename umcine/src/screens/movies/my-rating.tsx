import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import Link from "next/link";
import {ratingQueries} from "../../api/ratings/rating-queries.ts";
import type {Rating} from "../../api/ratings/ratings.ts";
import {useDeleteRatingMutation} from "../../hooks/use-delete-rating-mutation.ts";
import {useSaveRatingMutation} from "../../hooks/use-save-rating-mutation.ts";
import {useAuthStore} from "../../stores/auth-store.ts";
import {cn} from "../../utils/cn.ts";
import {getApiErrorMessage} from "../../utils/get-api-error-message.ts";
import {getMemberIdFromToken} from "../../utils/get-member-id-from-token.ts";

const RATING_SCORES = [1, 2, 3, 4, 5];
const COMMENT_MAX_LENGTH = 500;
const MESSAGE_CLASS = "text-[13px] leading-[normal] text-(--color-text-secondary)";
const ERROR_CLASS = "text-[11px] leading-[normal] text-(--color-danger-default)";

interface MyRatingProps {
    movieId: number;
}

export function MyRating({movieId}: MyRatingProps) {
    const memberId = useAuthStore((state) => getMemberIdFromToken(state.accessToken));
    const ratingQuery = useQuery({
        ...ratingQueries.byMember(memberId),
        select: (ratings) => ratings.find((rating) => rating.movieId === movieId) ?? null,
    });

    return (
        <aside
            className="w-full shrink-0 space-y-2 border-t border-(--color-border-default) pt-6 lg:w-90 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-[30px] lg:pb-[41px]">
            <h2 className="text-[21px] font-bold leading-[normal] tracking-[-0.63px]">내 평점</h2>

            {memberId === null ? (
                <p className={MESSAGE_CLASS}>
                    <Link href="/login" className="font-bold underline">로그인</Link>하면 평점을 남길 수 있어요.
                </p>
            ) : ratingQuery.isPending ? (
                <p className={MESSAGE_CLASS}>내 평점을 불러오는 중이에요.</p>
            ) : ratingQuery.isError ? (
                <p className={MESSAGE_CLASS}>
                    {getApiErrorMessage(ratingQuery.error, "내 평점을 불러오지 못했어요.")}
                </p>
            ) : (
                // 등록하거나 삭제해서 평점이 바뀌면 폼을 서버 값으로 다시 채운다
                <RatingForm
                    key={ratingQuery.data?.ratingId ?? "new"}
                    memberId={memberId}
                    movieId={movieId}
                    rating={ratingQuery.data}
                />
            )}
        </aside>
    );
}

interface RatingFormProps {
    memberId: number;
    movieId: number;
    rating: Rating | null;
}

function RatingForm({memberId, movieId, rating}: RatingFormProps) {
    const [score, setScore] = useState(rating?.score ?? 0);
    const [comment, setComment] = useState(rating?.comment ?? "");
    const saveMutation = useSaveRatingMutation(memberId);
    const deleteMutation = useDeleteRatingMutation(memberId);

    const trimmedComment = comment.trim();
    const isChanged = score !== rating?.score || trimmedComment !== (rating?.comment ?? "");
    const isBusy = saveMutation.isPending || deleteMutation.isPending;
    const canSave = score > 0 && isChanged && !isBusy;
    const error = saveMutation.error ?? deleteMutation.error;

    const handleSave = () => {
        if (!canSave) return;
        deleteMutation.reset();
        saveMutation.mutate({
            ratingId: rating?.ratingId ?? null,
            movieId,
            score,
            comment: trimmedComment || undefined,
        });
    };

    const handleDelete = () => {
        if (!rating || isBusy) return;
        if (!confirm("평점을 삭제할까요?")) return;
        saveMutation.reset();
        deleteMutation.mutate(rating.ratingId);
    };

    return (
        <>
            <p className="text-xs leading-[normal] text-(--color-text-tertiary)">
                별점은 필수, 후기는 선택이에요.
            </p>
            <div className="flex gap-1" role="group" aria-label="영화 별점">
                {RATING_SCORES.map((value) => (
                    <button
                        key={value}
                        type="button"
                        className={cn(
                            "grid size-[38px] place-items-center rounded-lg border bg-(--color-bg-surface)",
                            value <= score ? "border-(--color-action-primary)" : "border-(--color-border-default)",
                        )}
                        aria-label={`${value}점`}
                        aria-pressed={value === score}
                        disabled={isBusy}
                        onClick={() => setScore(value)}>
                        <img
                            className={cn("size-6", value > score && "opacity-70")}
                            src={value <= score ? "/icons/movie-icons/star.svg" : "/icons/movie-icons/star-outline.svg"}
                            alt=""/>
                    </button>
                ))}
            </div>
            <textarea
                id="review-text"
                className="block w-full h-[102px] resize-none rounded-lg border border-(--color-border-default) bg-(--color-bg-surface) px-3 pt-4 pb-[18px] text-[13px] leading-[19.5px] placeholder:text-(--color-text-tertiary)"
                placeholder="영화를 보고 느낀 점을 남겨보세요."
                maxLength={COMMENT_MAX_LENGTH}
                value={comment}
                disabled={isBusy}
                onChange={(e) => setComment(e.target.value)}/>
            <p className="text-right text-[11px] leading-[normal] text-(--color-text-tertiary)">
                {comment.length}/{COMMENT_MAX_LENGTH}
            </p>
            {error && (
                <p className={ERROR_CLASS}>
                    {getApiErrorMessage(error, "평점을 저장하지 못했어요. 다시 시도해 주세요.")}
                </p>
            )}
            <button
                id="save-rating"
                type="button"
                disabled={!canSave}
                onClick={handleSave}
                className="w-full h-10.5 rounded-lg border border-(--color-bg-surface) bg-(--color-text-primary) text-sm font-extrabold text-(--color-bg-surface) disabled:cursor-not-allowed disabled:opacity-60">
                {saveMutation.isPending ? "저장 중" : rating ? "평점 수정" : "평점 저장"}
            </button>
            {rating && (
                <button
                    type="button"
                    disabled={isBusy}
                    onClick={handleDelete}
                    className="w-full h-10.5 rounded-lg border border-(--color-border-default) bg-(--color-bg-surface) text-sm font-extrabold text-(--color-text-secondary) disabled:cursor-not-allowed disabled:opacity-60">
                    {deleteMutation.isPending ? "삭제 중" : "평점 삭제"}
                </button>
            )}
        </>
    );
}
