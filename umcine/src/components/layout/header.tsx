import {Link} from "@tanstack/react-router";

export function Header(){
    return(
        <header className="flex items-center justify-between self-stretch border-b border-(--color-border-default) bg-(--color-bg-surface) px-20 py-6">
            <div className="flex items-center gap-[42px]">
                <div className="flex items-center gap-2.5">
                    <span className="grid size-8 place-items-center rounded-lg border-2 border-(--color-text-primary)">
                        <img className="size-6" src="/icons/movie-icons/movie.svg" alt=""/>
                    </span>
                    <span className="text-xl font-black tracking-[-0.7px]">UMCine</span>
                </div>
                <nav className="flex items-center gap-[30px]">
                    <Link
                        activeProps={{className:"text-(--color-text-primary) underline"}}
                        inactiveProps={{className:"text-(--color-text-secondary) no-underline"}}
                        activeOptions={{ exact: true }}
                        className="text-sm font-bold"
                        to="/">영화</Link>
                    <Link
                        activeProps={{className:"text-(--color-text-primary) underline"}}
                        inactiveProps={{className:"text-(--color-text-secondary) no-underline"}}
                        className="text-sm font-bold"
                        to="/search">검색</Link>
                    <a className="text-sm font-bold text-(--color-text-secondary) no-underline" href="#">내 정보</a>
                </nav>
            </div>

            <div className="flex items-center gap-2.5">
                <button type="button" className="grid size-[42px] place-items-center rounded-lg border border-(--color-border-default) bg-(--color-bg-surface)" aria-label="영화 검색">
                    <img className="size-6" src="/icons/movie-icons/search.svg" alt=""/>
                </button>
                <button type="button" className="h-[42px] rounded-lg border border-(--color-bg-surface) bg-(--color-action-primary) px-4 text-sm font-extrabold text-(--color-bg-surface)">로그인</button>
            </div>
        </header>
    );
}
