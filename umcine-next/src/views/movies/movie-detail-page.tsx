"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { BookmarkButton } from "../../components/bookmark-button";
import { RatingForm } from "../../components/rating-form";

import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { getTmdbPosterUrl, getTmdbBackdropUrl } from "../../utils/movies/tmdb-image";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";

import { useAuthStore } from "../../stores/auth-store";
import { useRatingQuery } from "../../hooks/use-ratings-query";

export function MovieDetailPage() {

	const { movieId: movieIdParam } = useParams<{ movieId: string }>();
	const movieId = Number(movieIdParam);
	const isValidMovieId = Number.isInteger(movieId) && movieId > 0;

	const movieDetailQuery = useQuery({
		queryKey: ["movies", "detail", movieId],
		queryFn: () => getMovieDetail(movieId),
		enabled: isValidMovieId,
		staleTime: 30 * 1000,
	})


	const memberId = useAuthStore((state) => state.memberId)

	const ratingQuery = useRatingQuery(memberId);
	const myRating = ratingQuery.data?.find(
		(rating) => rating.movieId === movieId
	);

	return (
		<>
			{!isValidMovieId ? (
				<p>올바르지 않은 영화 번호예요.</p>
			) : movieDetailQuery.isPending ? (
				<p>영화 목록을 불러오는 중이에요.</p>
			) : movieDetailQuery.isError ? (
				<p>{getMovieDetailErrorMessage(movieDetailQuery.error)}</p>
			) : (

				<main>
					<div className="relative w-full h-[360px]">

						<img src={getTmdbBackdropUrl(movieDetailQuery.data.backdrop_path) ?? ""} alt="" aria-hidden="true"
							className="w-full h-full object-cover"
						/>

						<div className="absolute inset-0 flex flex-col justify-between p-6 px-20 py-6">

							<Link href="/" className="flex items-center w-fit gap-1">
								<img src="/icons/chevron-left.svg" className="w-6 h-6 brightness-0 invert" />
								<span className="w-13 h-4 text-[13px] text-white font-['Font_5'] font-bold align-middle">영화 목록</span>
							</Link>

							<div className="flex flex-col gap-2 text-white font-[Font_5]">
								<h1 className="h-[50px] text-[46px]">{movieDetailQuery.data.title}</h1>
								<p className="h-[17px] text-[14px]">{movieDetailQuery.data.original_title}</p>
								<div className="flex flex-row items-center w-[800px] h-[16px] gap-2 text-[13px]">
									<p>{movieDetailQuery.data.release_date}</p>
									<p>{movieDetailQuery.data.genres.map((genre) => genre.name).join(", ")}</p>
									<p>{movieDetailQuery.data.runtime}</p>
								</div>
							</div>

						</div>

					</div>

					<div className="flex flex-row px-20 py-6 gap-8">
						<img 
						src={getTmdbPosterUrl(movieDetailQuery.data.poster_path) ?? ""} alt={`${movieDetailQuery.data.title} 포스트`} 
						className="w-50 h-[286px] rounded-[10px] bg-[#F6F7F9] shadow-lg"/>

						<div className="flex flex-col w-[656px] h-[163px] gap-[10px] font-['Font_5'] box-border">
							<h2 className="font-bold text-[21px] align-middle text-[#17191E]">{movieDetailQuery.data.tagline}</h2>
							<p className="font-normal text-[14px] leading-[24px] align-normal text-[#606774]">{movieDetailQuery.data.overview}</p>


							<BookmarkButton
							movieId={movieDetailQuery.data.id} 
							buttonStyle="flex flex-row items-center justify-center w-[107px] h-[42px] rounded-[8px] p-4 text-white bg-[#2563EB] align-middle box-border"
							>
								{(isBookmarked) => 
								<div className="flex flex-row items-center justify-center">
									<img
										src= {isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
										className="w-5 h-5 brightness-0 invert"
									/>
									<p className="font-extrabold text-[14px] align-middle">즐겨찾기</p>
								</div>
								}
							</BookmarkButton>


						</div>


						{!memberId ? (
								<RatingForm
										memberId={null}
										movieId={movieId}
								/>
						) : ratingQuery.isPending ? (
								<p>평점을 불러오는 중이에요.</p>
						) : ratingQuery.isError ? (
								<p>평점을 불러오지 못했어요.</p>
						) : (
								<RatingForm
										key={myRating?.ratingId ?? `new-${movieId}`}
										memberId={memberId}
										movieId={movieId}
										initialRating={myRating}
								/>
						)}

					</div>
				</main>


			)}

		</>
	)
}

