import type { SubmitEvent } from "react";
import { cn } from "../../utils/cn";

interface SearchFormProps {
  // hero: 검색어가 없을 때의 큰 검색창 / compact: 검색 결과 위의 검색창
  variant: "hero" | "compact";
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
  onClear?: () => void;
}

export default function SearchForm({
  variant,
  value,
  onChange,
  onSubmit,
  onClear,
}: SearchFormProps) {
  const isHero = variant === "hero";

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        // 공통: 가로 배치, 흰 배경. 입력 중에는 테두리를 action 색으로 바꿔요.
        "flex items-center bg-surface focus-within:border-action",
        isHero
          ? // Figma: 74px 높이, radius 12px, 2px 테두리, 그림자 0 12px 34px
            "h-[74px] w-full gap-3.5 rounded-xl border-2 border-fg pr-[17px] pl-[21px] shadow-[0_12px_34px_rgba(17,19,24,0.08)]"
          : // Figma: 54px 높이, radius 9px, 1px 테두리
            "h-[54px] gap-[18px] rounded-[9px] border border-line pr-2.5 pl-[15px]",
      )}
    >
      {/* search.svg는 검정색이라, 마스크로 쓰고 secondary 텍스트 색을 입혀요. */}
      <span
        aria-hidden="true"
        className="size-6 shrink-0 bg-fg-secondary mask-[url('/icons/search.svg')] mask-center mask-no-repeat"
      />
      <input
        aria-label="검색어"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={isHero ? "예: 스파이더맨" : undefined}
        className={cn(
          "min-w-0 flex-1 bg-transparent text-fg outline-none placeholder:text-fg-tertiary",
          isHero
            ? "text-[17px] leading-5 font-normal"
            : "text-sm leading-[17px] font-bold",
        )}
      />
      {/* 지우기 버튼은 결과 화면의 검색창에서, 글자가 있을 때만 보여요. */}
      {!isHero && value && (
        <button
          type="button"
          aria-label="검색어 지우기"
          onClick={onClear}
          className="flex size-6 shrink-0 cursor-pointer items-center justify-center"
        >
          <span
            aria-hidden="true"
            className="size-6 bg-fg-secondary mask-[url('/icons/close.svg')] mask-center mask-no-repeat"
          />
        </button>
      )}
      <button
        type="submit"
        className={cn(
          "h-[42px] shrink-0 cursor-pointer rounded-lg border bg-fg px-4 text-sm leading-[17px] font-extrabold text-white",
          isHero ? "border-fg" : "border-white",
        )}
      >
        {isHero ? "검색" : "다시 검색"}
      </button>
    </form>
  );
}
