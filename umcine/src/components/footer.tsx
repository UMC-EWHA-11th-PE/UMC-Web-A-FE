import "./footer.css"

export default function Footer() {
    return (
        <footer className="footer">
            <img className="footer__logo" src="/images/logos/tmdb-logo.svg" alt="TMDB 로고" />
            <p className="footer__info">
                This product uses the TMDB API but is not endorsed or certified by{" "}
                <a
                    className="footer__link"
                    href="https://www.themoviedb.org/?language=ko"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    TMDB
                </a>
                .
            </p>
        </footer>
    );
}
