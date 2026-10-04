export default function Footer() {
    return (
        <footer className="flex items-center justify-end gap-2 px-4 py-4 md:px-20 border-t border-solid border-(--color-border-default) bg-(--color-bg-surface)">
            <img className="size-6 object-contain"
                 src="/images/logos/tmdb-logo.svg"
                 alt="TMDB 로고" />
            <p className="text-(--color-text-secondary) text-xs font-normal">
                This product uses the TMDB API but is not endorsed or certified by{" "}
                <a
                    className="text-inherit underline"
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
