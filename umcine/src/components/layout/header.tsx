import './header.css';

interface HeaderProps {
  isLoggedIn?: boolean;
}

function Header({ isLoggedIn = false }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__left">
        <a href="/" className="header__logo">
          <span className="header__logo-icon">🎬</span>
          UMCine
        </a>
        <nav className="header__nav">
          <a href="/" className="header__nav-link header__nav-link--active">
            영화
          </a>
          <a href="/search" className="header__nav-link">
            검색
          </a>
          <a href="/my" className="header__nav-link">
            내정보
          </a>
        </nav>
      </div>

      <div className="header__right">
        <button className="header__icon-btn" aria-label="검색">
          🔍
        </button>
        {isLoggedIn ? (
          <button className="header__cta header__cta--outline">마이페이지</button>
        ) : (
          <button className="header__cta">로그인</button>
        )}
      </div>
    </header>
  );
}

export default Header;
