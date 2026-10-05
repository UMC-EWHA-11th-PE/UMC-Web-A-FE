import {
  useViewSettingsStore,
  type MovieSortOrder,
} from "../../stores/view-settings-store";
import { cn } from "../../utils/cn";

const SORT_OPTIONS: { value: MovieSortOrder; label: string }[] = [
  { value: "default", label: "기본" },
  { value: "latest", label: "최신순" },
  { value: "title", label: "제목순" },
];

export function MovieSortToggle() {
  const sortOrder = useViewSettingsStore((state) => state.sortOrder);
  const setSortOrder = useViewSettingsStore((state) => state.setSortOrder);

  return (
    <div className="flex gap-2" role="group" aria-label="정렬">
      {SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={sortOrder === option.value}
          onClick={() => setSortOrder(option.value)}
          className={cn(
            "h-9 cursor-pointer rounded-lg border px-4 text-[13px] font-bold",
            sortOrder === option.value
              ? "border-fg bg-fg text-white"
              : "border-line bg-white text-fg-secondary",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}