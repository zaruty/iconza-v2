import type { CSSProperties } from "react";

type ProgressBarProps = {
  value: number;
  max?: number;
  accent?: string;
  accentDeep?: string;
  label?: string;
  showValues?: boolean;
  variant?: "default" | "premium";
};

export function ProgressBar({
  value,
  max = 100,
  accent = "var(--app-progress-fill, var(--app-text-muted))",
  accentDeep,
  label,
  showValues = false,
  variant = "default",
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const deep = accentDeep ?? (accent.startsWith("#") ? accent : undefined);

  return (
    <div className={`app-progress${variant === "premium" ? " app-progress--premium" : ""}`}>
      {label ? (
        <div className="app-progress__head">
          <span className="app-progress__label font-subtitle">{label}</span>
          {showValues ? (
            <span className="app-progress__value font-subtitle">
              {value}/{max}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="app-progress__track" aria-hidden>
        <div
          className={`app-progress__fill${variant === "premium" ? " app-progress__fill--premium" : ""}`}
          style={
            {
              width: `${percent}%`,
              background: variant === "premium" ? undefined : accent,
              "--progress-accent": accent,
              "--progress-accent-deep": deep ?? accent,
            } as CSSProperties
          }
        />
      </div>
      {!label && showValues ? (
        <span className="app-progress__value app-progress__value--solo font-subtitle">
          {Math.round(percent)}%
        </span>
      ) : null}
    </div>
  );
}
