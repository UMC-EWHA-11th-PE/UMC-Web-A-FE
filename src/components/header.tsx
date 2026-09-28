export function Header() {
  return (
    <>
      <div className="top-bar">
        <span>영화 목록</span>
      </div>
      <header className="header">
        <div className="header-left">
          <span className="logo-text">UMCine</span>
          <nav className="nav-links">
            <a href="#">영화</a>
            <a href="#">검색</a>
            <a href="#">내 정보</a>
          </nav>
        </div>
        <div className="header-right">
          <button className="search-btn" type="button">🔍</button>
          <button className="login-btn" type="button">로그인</button>
        </div>
      </header>
    </>
  );
}