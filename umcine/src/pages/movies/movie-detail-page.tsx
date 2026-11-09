import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";
import { BookmarkButton } from "../../components/bookmark-button";


export function MovieDetailPage() {
    const { movieId } = useParams({ from: "/movies/$movieId" });
    const movie = movies.find((item) => item.id === Number(movieId))

    if (!movie) {
        return <main>영화를 찾을 수 없어요.</main>;
    }

    return (
        <main>
            <form className="relative w-full h-[360px]">

                <img src={movie.backdropPath} alt="" aria-hidden="true"
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex flex-col justify-between p-6 px-20 py-6">

                    <Link to="/" className="flex items-center w-fit gap-1">
                        <img src="/icons/chevron-left.svg" className="w-6 h-6 brightness-0 invert" />
                        <span className="w-13 h-4 text-[13px] text-white font-['Font_5'] font-bold align-middle">영화 목록</span>
                    </Link>

                    <div className="flex flex-col gap-2 text-white font-[Font_5]">
                        <h1 className="h-[50px] text-[46px]">{movie.title}</h1>
                        <p className="h-[17px] text-[14px]">{movie.originalTitle}</p>
                        <div className="flex flex-row items-center w-[800px] h-[16px] gap-2 text-[13px]">
                            <p>{movie.releaseDate}</p>
                            <p>{movie.genres.join(".")}</p>
                            <p>{movie.runtime}</p>
                        </div>
                    </div>

                </div>

            </form>

            <div className="flex flex-row px-20 py-6 gap-8">
                <img 
                    src={movie.posterPath} alt={`${movie.title} 포스트`} 
                    className="w-50 h-[286px] rounded-[10px] bg-[#F6F7F9] shadow-lg"/>
        
                <div className="flex flex-col w-[656px] h-[163px] gap-[10px] font-['Font_5']" box-border>
                    <h2 className="font-bold text-[21px] align-middle text-[#17191E]">{movie.tagline}</h2>
                    <p className="font-normal text-[14px] leading-[24px] align-normal text-[#606774]">{movie.overview}</p>


                    <BookmarkButton
                        movieId={movie.id} 
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


                <div className="w-[390px] h-[294px] bml-1 pb-[41px] pl-[30px] gap-2 font-['Font_5'] border-l border-[#E3E6EB]">
                    <h2 className="font-bold text-[21px] align-middle text-#17191E">내 평점</h2>
                    <p className="font-regular text-[12px] align-middle text-[#969DA8]">별점은 필수, 후기는 선택이에요.</p>

                    <div className="flex flex-rows items-start w-auto h-8 gap-1">
                        <img src="/icons/star-outline.svg" className="w-[38px] h-[38px] px-[6px] py-[1px] rounded-[8px] border border-[#E3E6EB]" />
                        <img src="/icons/star-outline.svg" className="w-[38px] h-[38px] px-[6px] py-[1px] rounded-[8px] border border-[#E3E6EB]"/>
                        <img src="/icons/star-outline.svg" className="w-[38px] h-[38px] px-[6px] py-[1px] rounded-[8px] border border-[#E3E6EB]"/>
                        <img src="/icons/star-outline.svg" className="w-[38px] h-[38px] px-[6px] py-[1px] rounded-[8px] border border-[#E3E6EB]"/>
                        <img src="/icons/star-outline.svg" className="w-[38px] h-[38px] px-[6px] py-[1px] rounded-[8px] border border-[#E3E6EB]"/>
                    </div>

                    <textarea
                        className="w-full h-[102px] rounded-[8px] border pt-4 px-3 pb-[18px] bg-white border-[#E3E6EB] text-[13px] font-regular placeholder=[13px] mt-6" 
                        placeholder="영화를 보고 느낀 점을 남겨보세요."
                    />

                    <button className="items-center w-full h-[42px] px-4 bg-[#17191E] border border-whtie text-[14px] text-white font-extrabold align-middle rounded-[8px]">
                        평점 저장
                    </button>

                </div>


            </div>



        </main>
    );
}
