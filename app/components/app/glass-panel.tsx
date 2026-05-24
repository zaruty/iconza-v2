type GlassPanelProps = {
  children: React.ReactNode;
  className?: string;
  /** @deprecated Use variant instead — glow removed from editorial design */
  glow?: boolean;
  /** @deprecated Pulse removed from editorial design */
  pulse?: boolean;
  variant?: "subtle" | "flat" | "none";
};

export function GlassPanel({
  children,
  className = "",
  variant = "subtle",
}: GlassPanelProps) {
  return (
    <div className={`app-surface app-surface--${variant} ${className}`.trim()}>
      {children}
    </div>
  );
}
