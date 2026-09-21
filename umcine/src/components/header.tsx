
interface headerProps {
    isLoggedIn: boolean;
}

export function Header({isLoggedIn} :headerProps) {
    return (
        <header className="flex items-center gap-2">
            {/* public/icons/movie.svg 파일 불러오기 */}
            <img src="/icons/movie.svg" />
            <span>UMCine</span>
            <span>영화</span>
            <span>검색</span>
            <span>내 정보</span>

            <span>
                <img src="/icons/search.svg" />
            </span>
            <span>{isLoggedIn?"마이페이지":"로그인"}</span>
        </header>

    )
}