import { Link } from "@tanstack/react-router";
import "./header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__logo">
          <img src="/icons/movie.svg" alt="" />
          <span>UMCine</span>
        </Link>
        <nav className="header__nav">
          <Link to="/" className="header__link header__link--active">영화</Link>
          <Link to="/search" className="header__link">검색</Link>
          <Link to="/" className="header__link">내 정보</Link>
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