// 컴포넌트 파일에 상수를 같이 export하면 Fast Refresh가 깨져서 따로 둠

// Figma: 48px 높이 입력칸 안쪽 글자
export const INPUT_CLASS_NAME =
  "h-full min-w-0 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-fg-tertiary";

// Figma: 입력칸 오른쪽 안의 파란 글자 버튼
export const CHECK_BUTTON_CLASS_NAME =
  "shrink-0 cursor-pointer text-xs font-bold text-action disabled:cursor-not-allowed disabled:text-fg-tertiary";
