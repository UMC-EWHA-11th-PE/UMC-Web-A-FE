import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface FormFieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}

// 라벨 + 입력칸 + (안내 또는 오류 문구) 한 묶음
export function FormField({ id, label, hint, error, children }: FormFieldProps) {
  const message = error ?? hint;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] leading-4 font-bold text-fg">
        {label}
      </label>
      {children}
      {message && (
        <p className={cn("text-[11px] leading-4", error ? "text-danger" : "text-fg-tertiary")}>
          {message}
        </p>
      )}
    </div>
  );
}

// Figma: 흰 배경, 1px 테두리, radius 8px. 입력 중에는 파란 테두리, 오류일 때는 빨간 테두리
export function InputBox({ hasError, children }: { hasError: boolean; children: ReactNode }) {
  return (
    <div
      className={cn(
        "flex h-12 items-center gap-3 rounded-lg border bg-surface px-4",
        hasError ? "border-danger" : "border-line focus-within:border-action",
      )}
    >
      {children}
    </div>
  );
}
