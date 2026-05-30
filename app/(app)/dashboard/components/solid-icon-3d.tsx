"use client";

import type { CSSProperties } from "react";
import type { IconKey } from "../dashboard-types";
import { Icon3D } from "../dashboard-icons";
import {
  SOLID_ICON_DIMENSIONS,
  type SolidIconSize,
} from "../dashboard-tokens";

export type SolidIconProps = {
  iconKey: IconKey;
  /** Cor sólida do círculo de fundo. */
  accentColor: string;
  size?: SolidIconSize;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
};

export function SolidIcon3D({
  iconKey,
  accentColor,
  size = "md",
  className,
  style,
  ariaLabel,
}: SolidIconProps) {
  const { circle, icon } = SOLID_ICON_DIMENSIONS[size];

  const shellStyle: CSSProperties = {
    width: circle,
    height: circle,
    borderRadius: "50%",
    background: accentColor,
    border: "none",
    outline: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    position: "relative",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.28), 0 4px 10px rgba(0,0,0,0.16)",
    ...style,
  };

  return (
    <div
      className={className}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      style={shellStyle}
      data-size={size}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "7%",
          left: "18%",
          right: "18%",
          height: "28%",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.22)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFFFFF",
          filter: "brightness(0) invert(1)",
        }}
      >
        <Icon3D iconKey={iconKey} size={icon} color="#FFFFFF" />
      </div>
    </div>
  );
}
