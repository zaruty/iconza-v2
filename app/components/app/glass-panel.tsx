type GlassPanelProps = {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  pulse?: boolean;
};

export function GlassPanel({
  children,
  className = "",
  glow = false,
  pulse = false,
}: GlassPanelProps) {
  return (
    <div
      className={`app-glass ${glow ? "app-glass--glow" : ""} ${pulse ? "app-glass--pulse" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
