import "./header.css"

export default function Header(){
    return(
        <header className="topbar">
            <div className="topbar__brand-row">
                <div className="topbar__brand">
                    <span className="topbar__mark">
                        <img src="/icons/movie-icons/movie.svg" alt=""/>
                    </span>
                    <span className="topbar__brand-name">UMCine</span>
                </div>
                <div className="topbar__menu">
                    <a className="topbar__menu-item topbar__menu-item--active" href="#">영화</a>
                    <a className="topbar__menu-item" href="#">검색</a>
                    <a className="topbar__menu-item" href="#">내 정보</a>
                </div>

            </div>

            <div className="topbar__top-actions">
                <button type="button" className="topbar__search-button" aria-label="영화 검색">
                    <img src="/icons/movie-icons/search.svg" alt=""/>
                </button>
                <button type="button" className="topbar__login-button">로그인</button>
            </div>
        </header>
    );
}