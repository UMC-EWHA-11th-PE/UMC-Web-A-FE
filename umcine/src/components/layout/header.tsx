import "./header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header__left">
        <a href="/" className="header__logo">
          <img src="/icons/movie.svg" alt="" />
          <span>UMCine</span>
        </a>
        <nav className="header__nav">
          <a href="#" className="header__link header__link--active">영화</a>
          <a href="#" className="header__link">검색</a>
          <a href="#" className="header__link">내 정보</a>
        </nav>
      </div>
      <div className="header__right">
        <button type="button" className="header__search">
          <img src="/icons/search.svg" alt="검색" />
        </button>
        <button type="button" className="header__login">로그인</button>
      </div>
    </header>
  );
}