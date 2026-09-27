import "./header.css";

interface headerProps {
    isLoggedIn: boolean;
}

export function Header({isLoggedIn} :headerProps) {
    return (
        <header className="header">

            <div className="brand-row">
                <div className="brand">
                    <span>
                        <img src="/icons/movie.svg" />
                    </span>
                    <span>UMCine</span>
                </div>

                <div className="menu">
                    <span>영화</span>
                    <span>검색</span>
                    <span>내 정보</span>
                </div>

            </div>

            <div className="top-actions">
                <span>
                    <img src="/icons/search.svg" />
                </span>
                <span className="login">{isLoggedIn?"마이페이지":"로그인"}</span>
            </div>
        </header>

    )
}