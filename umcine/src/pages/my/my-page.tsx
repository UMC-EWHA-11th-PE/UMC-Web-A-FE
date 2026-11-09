import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieListItem } from "../../api/movies/models";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { useBookmarkStore } from "../../stores/bookmark-store";
import { useProfileStore } from "../../stores/profile-store";

// 영화 목록과 같은 5열 그리드를 2줄씩 보여줌
const BOOKMARKS_PER_PAGE = 10;

export function MyPage() {
  const profile = useProfileStore((state) => state.profile);
  const bookmarkedMovieIds = useBookmarkStore((state) => state.bookmarkedMovieIds);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(bookmarkedMovieIds.length / BOOKMARKS_PER_PAGE));
  // 즐겨찾기를 해제해서 페이지 수가 줄어도 빈 페이지에 머물지 않게 함
  const currentPage = Math.min(page, totalPages);
  const pageMovieIds = bookmarkedMovieIds.slice(
    (currentPage - 1) * BOOKMARKS_PER_PAGE,
    currentPage * BOOKMARKS_PER_PAGE,
  );

  // 상세 화면과 같은 query key를 써서 이미 본 영화는 캐시를 재사용함
  const movieQueries = useQueries({
    queries: pageMovieIds.map((movieId) => ({
      queryKey: ["movies", "detail", movieId],
      queryFn: () => getMovieDetail(movieId),
    })),
  });

  const isLoading = movieQueries.some((query) => query.isPending);
  // 일부 영화만 실패하면 나머지는 보여주고, 실패한 개수만 따로 안내함
  const failedCount = movieQueries.filter((query) => query.isError).length;
  const isAllFailed = failedCount > 0 && failedCount === movieQueries.length;
  // 카드 컴포넌트가 목록 항목 형태를 받으므로 상세 응답의 장르를 genre_ids로 바꿔 넘김
  const movies: TmdbMovieListItem[] = movieQueries.flatMap((query) =>
    query.data ? [{ ...query.data, genre_ids: query.data.genres.map((genre) => genre.id) }] : [],
  );

  return (
    // Figma: 영화 목록과 같은 좌우 80px / 상하 24px 여백
    <main className="flex flex-col px-20 py-6">
      <div className="flex items-center justify-between pb-6">
        <h1 className="text-[38px] leading-[44px] font-bold tracking-[-1.71px] text-fg">
          내 정보
        </h1>
        {/* 다음 커밋에서 /my/edit 화면과 연결 */}
        <button
          type="button"
          className="h-[42px] cursor-pointer rounded-lg border border-white bg-action px-4 text-sm font-extrabold text-white hover:bg-action-hover active:bg-action-pressed"
        >
          정보 수정
        </button>
      </div>

      <section className="flex flex-col gap-4 border-t border-line py-5">
        <h2 className="text-sm leading-[17px] font-bold text-fg">기본 정보</h2>
        <div className="flex items-center gap-6">
          <ProfileAvatar />
          <dl className="grid flex-1 grid-cols-2 gap-6">
            <ProfileItem label="닉네임" value={profile.nickname} />
            <ProfileItem label="이메일" value={profile.email} />
          </dl>
        </div>
      </section>

      <section className="flex flex-col gap-4 border-t border-line py-5">
        <h2 className="text-sm leading-[17px] font-bold text-fg">내 즐겨찾기</h2>
        {bookmarkedMovieIds.length === 0 ? (
          <p className="py-16 text-center text-sm text-fg-secondary">즐겨찾기한 영화가 없어요.</p>
        ) : isLoading ? (
          <p className="py-16 text-center text-sm text-fg-secondary">즐겨찾기한 영화를 불러오는 중이에요.</p>
        ) : isAllFailed ? (
          <p className="py-16 text-center text-sm text-fg-secondary">즐겨찾기한 영화를 불러오지 못했어요.</p>
        ) : (
          <>
            <MovieGrid movies={movies} />
            {failedCount > 0 && (
              <p className="text-xs text-fg-tertiary">
                영화 {failedCount}편은 정보를 불러오지 못해 표시하지 않았어요.
              </p>
            )}
          </>
        )}
      </section>

      {bookmarkedMovieIds.length > 0 && (
        <Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
      )}
    </main>
  );
}

// Figma: 64px 원형 회색 배경 + 가운데 사람 아이콘
function ProfileAvatar() {
  return (
    <div className="grid size-16 shrink-0 place-items-center rounded-full bg-line">
      <span
        aria-hidden="true"
        className="size-7 bg-fg mask-[url('/icons/person.svg')] mask-contain mask-center mask-no-repeat"
      />
    </div>
  );
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-[11px] leading-[13px] text-fg-tertiary">{label}</dt>
      <dd className="text-sm leading-[17px] font-bold text-fg">{value}</dd>
    </div>
  );
}
