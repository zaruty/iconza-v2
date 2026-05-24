type ProgressBarProps = {
  value: number;
  max?: number;
  accent?: string;
  label?: string;
  showValues?: boolean;
};

export function ProgressBar({
  value,
  max = 100,
  accent = "var(--app-accent)",
  label,
  showValues = false,
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="app-progress">
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
          className="app-progress__fill"
          style={{ width: `${percent}%`, background: accent }}
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
