import { useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Rating } from "../../api/ratings/get-member-ratings";
import { useCreateRatingMutation } from "../../hooks/use-create-rating-mutation";
import { useDeleteRatingMutation } from "../../hooks/use-delete-rating-mutation";
import { useMeQuery } from "../../hooks/use-me-query";
import { useMemberRatingsQuery } from "../../hooks/use-member-ratings-query";
import { useUpdateRatingMutation } from "../../hooks/use-update-rating-mutation";
import { useAuthStore } from "../../stores/auth-store";
import { cn } from "../../utils/cn";

const SCORES = [1, 2, 3, 4, 5];

export function RatingPanel({ movieId }: { movieId: number }) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useMeQuery();
  // 내 평점 목록은 회원 번호로 조회하므로, 내 정보를 먼저 받아야 함
  const ratingsQuery = useMemberRatingsQuery(meQuery.data?.memberId);

  // 이 영화에 남긴 내 평점. 회원당 영화 하나에 평점은 하나만 있음
  const myRating = ratingsQuery.data?.find((rating) => rating.movieId === movieId);

  return (
    <aside className="flex w-[360px] shrink-0 flex-col gap-2 border-l border-line pb-[41px] pl-[30px]">
      <h2 className="text-[21px] leading-[25px] font-bold tracking-[-0.63px] text-fg">내 평점</h2>

      {!accessToken ? (
        <p className="text-sm text-fg-secondary">
          로그인하면 평점을 남길 수 있어요.{" "}
          <Link to="/login" className="font-bold text-action">
            로그인
          </Link>
        </p>
      ) : meQuery.isError || ratingsQuery.isError ? (
        <p className="text-sm text-fg-secondary">평점을 불러오지 못했어요.</p>
      ) : meQuery.isPending || ratingsQuery.isPending ? (
        <p className="text-sm text-fg-secondary">평점을 불러오는 중이에요.</p>
      ) : (
        // 평점이 생기거나 사라지면 key가 바뀌어, 폼이 서버 값으로 다시 시작함
        <RatingForm key={myRating?.ratingId ?? "new"} movieId={movieId} rating={myRating} />
      )}
    </aside>
  );
}

function RatingForm({ movieId, rating }: { movieId: number; rating: Rating | undefined }) {
  // 저장된 평점이 있으면 그 값으로 시작함
  const [score, setScore] = useState(rating?.score ?? 0);
  const [comment, setComment] = useState(rating?.comment ?? "");
  const createMutation = useCreateRatingMutation();
  const updateMutation = useUpdateRatingMutation();
  const deleteMutation = useDeleteRatingMutation();

  const trimmedComment = comment.trim();
  const isPending = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;
  // 별점은 필수이고, 이미 저장된 평점이면 바뀐 내용이 있어야 저장할 수 있음
  const isChanged = !rating || score !== rating.score || trimmedComment !== (rating.comment ?? "");
  const canSave = score >= 1 && isChanged && !isPending;

  const handleSave = () => {
    if (!canSave) return;

    // 후기는 선택이라, 비어 있으면 null로 보냄
    const body = { score, comment: trimmedComment || null };
    if (rating) {
      updateMutation.mutate({ ratingId: rating.ratingId, ...body });
    } else {
      createMutation.mutate({ movieId, ...body });
    }
  };

  const handleDelete = () => {
    if (!rating || isPending) return;
    if (!confirm("평점을 삭제할까요?")) return;

    deleteMutation.mutate(rating.ratingId);
  };

  return (
    <>
      <p className="text-xs leading-[14px] text-fg-tertiary">별점은 필수, 후기는 선택이에요.</p>

      <div className="flex gap-1">
        {SCORES.map((value) => (
          <button
            key={value}
            type="button"
            aria-label={`${value}점`}
            aria-pressed={value <= score}
            onClick={() => setScore(value)}
            className={cn(
              "grid size-[38px] cursor-pointer place-items-center rounded-lg border bg-white text-2xl leading-none",
              value <= score ? "border-action text-action" : "border-line text-fg-secondary",
            )}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        maxLength={500}
        onChange={(event) => setComment(event.target.value)}
        placeholder="영화를 보고 느낀 점을 남겨보세요."
        className="h-[102px] w-full resize-none rounded-lg border border-line bg-white px-3 pt-4 pb-[18px] text-[13px] leading-5 text-fg placeholder:text-fg-tertiary"
      />

      <button
        type="button"
        disabled={!canSave}
        onClick={handleSave}
        className="h-[42px] w-full cursor-pointer rounded-lg border border-white bg-fg text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "처리 중" : rating ? "평점 수정" : "평점 저장"}
      </button>

      {rating && (
        <button
          type="button"
          disabled={isPending}
          onClick={handleDelete}
          className="h-[42px] w-full cursor-pointer rounded-lg border border-line bg-white text-sm font-bold text-danger disabled:cursor-not-allowed disabled:opacity-50"
        >
          평점 삭제
        </button>
      )}
    </>
  );
}
