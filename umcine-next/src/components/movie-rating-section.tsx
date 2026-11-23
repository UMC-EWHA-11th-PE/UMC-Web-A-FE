"use client";

import { useState, useEffect, type SubmitEvent } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/members/me";
import { useAuthStore } from "../stores/auth-store";
import {
  useMemberRatings,
  useCreateRating,
  useUpdateRating,
  useDeleteRating,
} from "../hooks/use-ratings";

interface MovieRatingSectionProps {
  movieId: number;
}

export function MovieRatingSection({
  movieId,
}: MovieRatingSectionProps) {
  const accessToken = useAuthStore(
    (state) => state.accessToken,
  );

  const [memberIdInput, setMemberIdInput] = useState("");
  const [score, setScore] = useState(5);
  const [content, setContent] = useState("");

  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    retry: false,
  });

  const profile = meQuery.data as
    | { memberId?: number; id?: number }
    | undefined;

  const profileMemberId = profile?.memberId ?? profile?.id;

  const enteredMemberId = Number(memberIdInput);

  const memberId =
    typeof profileMemberId === "number" &&
    Number.isInteger(profileMemberId) &&
    profileMemberId > 0
      ? profileMemberId
      : Number.isInteger(enteredMemberId) &&
          enteredMemberId > 0
        ? enteredMemberId
        : null;

  const ratingsQuery = useMemberRatings(memberId);
  const createMutation = useCreateRating();
  const updateMutation = useUpdateRating();
  const deleteMutation = useDeleteRating();

  const myRating = ratingsQuery.data?.find(
    (rating) => rating.movieId === movieId,
  );

  useEffect(() => {
    if (myRating) {
      setScore(myRating.score);
      setContent(myRating.content);
    }
  }, [
    myRating?.ratingId,
    myRating?.score,
    myRating?.content,
  ]);

  const isPending =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!accessToken || isPending) return;

    if (score < 1 || score > 5) return;

    if (myRating) {
      updateMutation.mutate({
        ratingId: myRating.ratingId,
        score,
        content: content.trim(),
      });
    } else {
      createMutation.mutate({
        movieId,
        score,
        content: content.trim(),
      });
    }
  }

  function handleDelete() {
    if (!myRating || isPending) return;

    if (!window.confirm("평점을 삭제할까요?")) return;

    deleteMutation.mutate(myRating.ratingId, {
      onSuccess: () => {
        setScore(5);
        setContent("");
      },
    });
  }

  return (
    <section className="mt-10 border-t border-gray-200 pt-8">
      <h2 className="mb-5 text-xl font-bold text-[#111111]">
        내 평점
      </h2>

      {!accessToken ? (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="mb-3 text-sm text-gray-600">
            평점을 작성하려면 로그인이 필요해요.
          </p>

          <Link
            href="/login"
            className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
          >
            로그인
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          {memberId === null && (
            <div className="mb-5">
              <label
                htmlFor="rating-member-id"
                className="mb-2 block text-xs font-bold text-gray-700"
              >
                회원 번호 (API 테스트용)
              </label>

              <input
                id="rating-member-id"
                type="number"
                min="1"
                value={memberIdInput}
                onChange={(event) =>
                  setMemberIdInput(event.target.value)
                }
                placeholder="회원 ID 입력"
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
              />

              <p className="mt-2 text-xs text-gray-400">
                현재 회원 정보 API에서 회원 ID를 확인할 수 없어
                평점 조회·수정·삭제 테스트에 필요해요.
              </p>
            </div>
          )}

          {memberId !== null && ratingsQuery.isPending && (
            <p className="mb-4 text-sm text-gray-500">
              기존 평점을 확인하는 중...
            </p>
          )}

          {memberId !== null && ratingsQuery.isError && (
            <p className="mb-4 text-sm text-red-500">
              기존 평점을 불러오지 못했어요.
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="movie-rating-score"
                className="mb-2 block text-xs font-bold text-[#111111]"
              >
                평점
              </label>

              <select
                id="movie-rating-score"
                value={score}
                onChange={(event) =>
                  setScore(Number(event.target.value))
                }
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-3 text-sm"
              >
                <option value={1}>1점</option>
                <option value={2}>2점</option>
                <option value={3}>3점</option>
                <option value={4}>4점</option>
                <option value={5}>5점</option>
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor="movie-rating-content"
                className="mb-2 block text-xs font-bold text-[#111111]"
              >
                감상평
              </label>

              <textarea
                id="movie-rating-content"
                value={content}
                onChange={(event) =>
                  setContent(event.target.value)
                }
                placeholder="영화에 대한 감상을 작성해 주세요."
                rows={4}
                className="w-full rounded-md border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#4b63e6]"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={
                  isPending ||
                  (memberId !== null &&
                    (ratingsQuery.isPending ||
                      ratingsQuery.isError))
                }
                className="flex-1 rounded-md bg-[#4b63e6] py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending
                  ? "처리 중..."
                  : myRating
                    ? "평점 수정"
                    : "평점 등록"}
              </button>

              {myRating && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isPending}
                  className="rounded-md border border-red-200 px-4 py-3 text-sm font-semibold text-red-500 disabled:opacity-50"
                >
                  삭제
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
