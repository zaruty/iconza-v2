"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  GLASS_ICON_SIZE,
  GLASS_SIZE_PX,
  getGlassTokens,
  type GlassDepth,
  type GlassSize,
} from "../dashboard-tokens";

export type GlassIcon3DProps = {
  accentColor: string;
  isActive?: boolean;
  isDark?: boolean;
  size?: GlassSize;
  depth?: GlassDepth;
  className?: string;
  children: ReactNode;
};

function joinClasses(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function GlassIcon3D({
  accentColor,
  isActive = false,
  isDark = false,
  size = "md",
  depth = "raised",
  className,
  children,
}: GlassIcon3DProps) {
  const tokens = getGlassTokens(isDark, accentColor, isActive, depth);
  const dimension = GLASS_SIZE_PX[size];
  const radius = Math.round(dimension * 0.28);
  const raised = depth === "raised";

  const style = {
    "--glass-accent": accentColor,
    width: dimension,
    height: dimension,
    borderRadius: radius,
    background: tokens.lensGradient,
    borderColor: tokens.border,
    boxShadow: raised ? tokens.shadowRaised : tokens.shadowFlat,
  } as CSSProperties;

  return (
    <div
      className={joinClasses(
        "relative isolate flex shrink-0 items-center justify-center overflow-hidden border",
        "backdrop-blur-md transition-[transform,box-shadow,background,border-color] duration-200 ease-out",
        "supports-[backdrop-filter]:bg-transparent",
        "max-md:backdrop-blur-none",
        raised && "md:-translate-y-px",
        isActive && "ring-1 ring-[color:var(--glass-accent)]/35",
        className,
      )}
      style={style}
      data-active={isActive || undefined}
      data-depth={depth}
      data-size={size}
    >
      {raised ? (
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 max-md:hidden"
          style={{
            inset: 0,
            borderRadius: radius,
            transform: "translateY(2px)",
            background: tokens.plate,
            filter: "blur(5px)",
            opacity: 0.75,
          }}
        />
      ) : null}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[14%] top-[7%] h-px"
        style={{ background: tokens.highlight }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] max-md:opacity-0"
        style={{
          background: `radial-gradient(circle at 28% 18%, ${tokens.highlight} 0%, transparent 55%)`,
        }}
      />

      <div className="relative z-10 flex items-center justify-center">{children}</div>
    </div>
  );
}

/** Tamanho recomendado do SVG interno para cada variante. */
export function glassIconInnerSize(size: GlassSize = "md"): number {
  return GLASS_ICON_SIZE[size];
}
