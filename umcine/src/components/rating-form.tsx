
import { useState } from "react";
import { useAddRatingMutation } from "../hooks/use-add-rating-mutation";
import { useUpdateRatingMutation } from "../hooks/use-update-rating-mutation";
import { useDeleteRatingMutation } from "../hooks/use-delete-rating-mutation";
import type { RatingInfo } from "../api/ratings/get-ratings";

interface RatingFormProps {
    memberId: number | null;
    movieId: number;
    initialRating?: RatingInfo;
}

export function RatingForm({ memberId, movieId, initialRating }: RatingFormProps) {
    const [score, setScore] = useState(initialRating?.score ?? 0);
    const [comment, setComment] = useState(initialRating?.comment ?? "");

    const addRatingMutation = useAddRatingMutation();
    const updateRatingMutation = useUpdateRatingMutation();
    const deleteRatingMutation = useDeleteRatingMutation();

    const isPending =
        addRatingMutation.isPending ||
        updateRatingMutation.isPending ||
        deleteRatingMutation.isPending;

    const handleSubmit = () => {
        if (!memberId) {
            alert("로그인이 필요합니다.");
            return;
        }

        if (score === 0) return;

        const data = {
            score,
            comment: comment.trim() || undefined,
        };

        if (initialRating) {
            updateRatingMutation.mutate({
                memberId,
                ratingId: initialRating.ratingId,
                data,
            });
        } else {
            addRatingMutation.mutate({
                memberId,
                movieId,
                ...data,
            });
        }
    };

    const handleDelete = () => {
        if (!memberId || !initialRating) return;

        if (!window.confirm("작성한 평점을 삭제할까요?")) return;

        deleteRatingMutation.mutate({
            memberId,
            ratingId: initialRating.ratingId,
        });
    };

    return (
        <div className="w-[390px] h-[294px] ml-1 pb-[41px] pl-[30px] gap-2 font-['Font_5'] border-l border-[#E3E6EB]">
            <h2 className="font-bold text-[21px] text-[#17191E]">내 평점</h2>
            <p className="text-[12px] text-[#969DA8]">
                별점은 필수, 후기는 선택이에요.
            </p>

            <div className="flex flex-row items-start w-auto h-8 gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setScore(star)}
                    >
                        <img
                            src={
                                score >= star
                                    ? "/icons/star.svg"
                                    : "/icons/star-outline.svg"
                            }
                            className="w-[38px] h-[38px] px-[6px] py-[1px] rounded-[8px] border border-[#E3E6EB]"
                        />
                    </button>
                ))}
            </div>

            <textarea
                className="w-full h-[102px] rounded-[8px] border pt-4 px-3 pb-[18px] bg-white border-[#E3E6EB] text-[13px] placeholder:text-[13px] mt-6"
                placeholder="영화를 보고 느낀 점을 남겨보세요."
                value={comment}
                onChange={(event) => setComment(event.target.value)}
            />

            <div className="flex gap-2 mt-3">
                <button
                    type="button"
                    className="flex-1 h-[42px] bg-[#17191E] text-[14px] text-white font-extrabold rounded-[8px]"
                    disabled={score === 0 || isPending}
                    onClick={handleSubmit}
                >
                    평점 저장
                </button>

                {initialRating && (
                    <button
                        type="button"
                        className="w-[90px] h-[42px] border border-[#E3E6EB] text-[14px] rounded-[8px]"
                        disabled={isPending}
                        onClick={handleDelete}
                    >
                        평점 삭제
                    </button>
                )}
            </div>
        </div>
    );
}
