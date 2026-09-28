export default function Footer() {
  return (
    <footer className="flex h-[57px] items-center justify-end gap-2 border-t border-line bg-surface px-20 py-4 text-xs text-fg-secondary">
      <img src="/images/logos/tmdb-logo.svg" alt="TMDB" className="h-2.5 w-auto shrink-0" />
      <p>
        This product uses the TMDB API but is not endorsed or certified by{" "}
        <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" className="underline">
          TMDB
        </a>
        .
      </p>
    </footer>
  );
}
