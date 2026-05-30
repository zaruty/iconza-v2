"use client";

import type { IconKey } from "./dashboard-types";

type Icon3DProps = {
  iconKey: IconKey;
  size?: number;
  color?: string;
};

type NavIconProps = {
  iconKey: IconKey;
  color: string;
  isActive: boolean;
  size?: number;
};

function Icon3D({ iconKey, size = 20, color = "currentColor" }: Icon3DProps) {
  const s = size;
  const id = `i${iconKey}${s}x`.replace(/[^a-zA-Z0-9]/g,"");

  if (iconKey === "home") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <path d="M3 10.5L12 3L21 10.5V20C21 20.6 20.6 21 20 21H15.5V15H8.5V21H4C3.4 21 3 20.6 3 20V10.5Z" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
      <path d="M10 21V17C10 16.4 10.4 16 11 16H13C13.6 16 14 16.4 14 17V21" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.7"/>
    </svg>
  );
  if (iconKey === "planet") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <circle cx="12" cy="12" r="6" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.6"/>
      <ellipse cx="12" cy="12" rx="11" ry="4" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.55"/>
      <circle cx="9" cy="9" r="1.4" fill="currentColor" fillOpacity="0.6"/>
    </svg>
  );
  if (iconKey === "brain") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <path d="M12 5C10.5 5 9 5.8 8.2 7C7 7.2 6 8 5.5 9C4.5 9.4 4 10.4 4 11.5C4 13.5 5.5 15 7 15.5V17C7 18.1 7.9 19 9 19H15C16.1 19 17 18.1 17 17V15.5C18.5 15 20 13.5 20 11.5C20 10.4 19.5 9.4 18.5 9C18 8 17 7.2 15.8 7C15 5.8 13.5 5 12 5Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M9 11C9 11 10 12 12 12C14 12 15 11 15 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7"/>
    </svg>
  );
  if (iconKey === "trophy") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <path d="M8 3H16V13C16 15.2 14.2 17 12 17C9.8 17 8 15.2 8 13V3Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M5 4H8V9C6.2 8.5 5 7 5 5.5V4Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeOpacity="0.6"/>
      <path d="M19 4H16V9C17.8 8.5 19 7 19 5.5V4Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeOpacity="0.6"/>
      <path d="M12 17V20M9 20H15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
  if (iconKey === "heart" || iconKey === "heart2") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <path d="M12 21C12 21 3 15 3 8.5C3 5.4 5.4 3 8.5 3C10.2 3 11.7 3.8 12 5C12.3 3.8 13.8 3 15.5 3C18.6 3 21 5.4 21 8.5C21 15 12 21 12 21Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  );
  if (iconKey === "user") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <circle cx="12" cy="8" r="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M4 20C4 16.7 7.6 14 12 14C16.4 14 20 16.7 20 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
  if (iconKey === "settings") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 2V4.5M12 19.5V22M4.22 4.22L5.98 5.98M18.02 18.02L19.78 19.78M2 12H4.5M19.5 12H22M4.22 19.78L5.98 18.02M18.02 5.98L19.78 4.22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>
    </svg>
  );
  if (iconKey === "bot") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <rect x="3" y="8" width="18" height="13" rx="3" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="9" cy="14" r="1.5" fill="currentColor" fillOpacity="0.7"/>
      <circle cx="15" cy="14" r="1.5" fill="currentColor" fillOpacity="0.7"/>
      <path d="M12 8V5M9 5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  if (iconKey === "graduate") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <path d="M12 3L22 8L12 13L2 8Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M6 10.5V16C6 16 8.5 19 12 19C15.5 19 18 16 18 16V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  if (iconKey === "bookmark") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <path d="M5 3H19C19.6 3 20 3.4 20 4V21L12 17L4 21V4C4 3.4 4.4 3 5 3Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
  if (iconKey === "bag") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <rect x="3" y="8" width="18" height="13" rx="2" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 8V6C8 4.3 9.3 3 11 3H13C14.7 3 16 4.3 16 6V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  if (iconKey === "bell") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="18" cy="5" r="3" fill="#F43F5E"/>
    </svg>
  );
  if (iconKey === "history") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}>
      <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21C9.06 21 6.48 19.56 4.9 17.33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M3 7V12H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  // 3D conquistas
  if (iconKey === "fire") return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <defs><linearGradient id={`${id}b`} x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stopColor="#FF7A2A"/><stop offset="100%" stopColor="#B82800"/></linearGradient><linearGradient id={`${id}c`} x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stopColor="#FFD83A"/><stop offset="100%" stopColor="#FF8030"/></linearGradient></defs>
      <path d="M24 5C13 14 7 23 10 33C12 41 18 45 24 45C30 45 36 41 38 33C41 23 35 14 24 5Z" fill={`url(#${id}b)`}/>
      <path d="M24 14C18 20 15 27 17 34C19 39 22 42 24 42C26 42 29 39 31 34C33 27 30 20 24 14Z" fill={`url(#${id}c)`}/>
      <path d="M24 24C21 27 20 31 22 35C23 37 23.5 38 24 38C24.5 38 25 37 26 35C28 31 27 27 24 24Z" fill="rgba(255,255,230,0.9)"/>
    </svg>
  );
  if (iconKey === "sprout") return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <defs><linearGradient id={`${id}b`} x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#1E7A44"/><stop offset="100%" stopColor="#4FCE80"/></linearGradient><radialGradient id={`${id}c`} cx="32%" cy="28%" r="68%"><stop offset="0%" stopColor="#80E8A8"/><stop offset="100%" stopColor="#167038"/></radialGradient></defs>
      <path d="M24 39C24 31 22 25 19 17" stroke={`url(#${id}b)`} strokeWidth="2.8" strokeLinecap="round"/>
      <path d="M19 17C12 9 5 11 7 20C8 26 15 25 19 17Z" fill={`url(#${id}c)`}/>
      <path d="M19 17C21 9 30 6 33 14C34 20 27 22 19 17Z" fill={`url(#${id}c)`}/>
    </svg>
  );
  if (iconKey === "pencil") return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <defs><linearGradient id={`${id}a`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#4A90D9"/><stop offset="100%" stopColor="#2266B0"/></linearGradient></defs>
      <g transform="rotate(-42,24,24)"><rect x="9" y="14" width="30" height="21" rx="3" fill={`url(#${id}a)`}/><rect x="10" y="15" width="3.5" height="19" rx="1.5" fill="rgba(255,255,255,0.28)"/><polygon points="9,21 9,27 3,24" fill="#D9A06A"/></g>
    </svg>
  );
  if (iconKey === "leaf") return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <defs><radialGradient id={`${id}a`} cx="28%" cy="22%" r="72%"><stop offset="0%" stopColor="#96F0C0"/><stop offset="55%" stopColor="#24B862"/><stop offset="100%" stopColor="#084E22"/></radialGradient></defs>
      <path d="M25 43C11 36 4 20 8 8C15 4 32 2 42 13C49 22 42 39 25 43Z" fill={`url(#${id}a)`}/>
      <path d="M25 43C21 32 13 18 9 10" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
  if (iconKey === "palette") return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <defs><radialGradient id={`${id}a`} cx="38%" cy="32%" r="68%"><stop offset="0%" stopColor="#EDE8FF"/><stop offset="100%" stopColor="#9080CC"/></radialGradient></defs>
      <path d="M7 26C5 13 14 5 24 5C34 5 45 14 42 25C40 31 36 33 32 31C27 28 28 33 24 35C17 37 9 35 7 26Z" fill={`url(#${id}a)`}/>
      {[{cx:13,cy:13,f:"#FF6060"},{cx:22,cy:8,f:"#FFD050"},{cx:32,cy:10,f:"#50D870"},{cx:40,cy:19,f:"#5090FF"},{cx:11,cy:22,f:"#C050D8"}].map((b,i) => <ellipse key={i} cx={b.cx} cy={b.cy} rx={4} ry={3.2} fill={b.f}/>)}
    </svg>
  );
  if (iconKey === "pot") return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <defs><linearGradient id={`${id}a`} x1="20%" y1="0%" x2="80%" y2="100%"><stop offset="0%" stopColor="#C87848"/><stop offset="100%" stopColor="#7A3818"/></linearGradient></defs>
      <path d="M8 29Q8 43 24 43Q40 43 40 29L38 15Q24 11 10 15Z" fill={`url(#${id}a)`}/>
      <ellipse cx="24" cy="15" rx="14" ry="5.5" fill="#180C04"/>
      <path d="M8 26Q1 26 1 32Q1 38 8 38" stroke="#E09050" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M40 26Q47 26 47 32Q47 38 40 38" stroke="#E09050" strokeWidth="4" fill="none" strokeLinecap="round"/>
    </svg>
  );
  if (iconKey === "frame") return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <defs><linearGradient id={`${id}a`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#C0A0F8"/><stop offset="100%" stopColor="#301870"/></linearGradient></defs>
      <rect x="5" y="5" width="38" height="38" rx="3.5" fill={`url(#${id}a)`}/>
      <rect x="5" y="5" width="38" height="3.5" rx="1.5" fill="rgba(255,255,255,0.38)"/>
      <rect x="10" y="10" width="28" height="28" rx="1.5" fill="#FFF8EC"/>
      <path d="M12 33Q17 20 24 26Q31 32 36 17" stroke="#7878FF" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      <circle cx="17" cy="17" r="4.5" fill="#FF7878" opacity="0.72"/>
    </svg>
  );
  // stat icons
  if (iconKey === "streak") return (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <defs><linearGradient id={`${id}g`} x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stopColor="#FFD855"/><stop offset="100%" stopColor="#FF5500"/></linearGradient></defs>
      <path d="M16 3C9 10 6 17 9 23C11 28 14 30 16 30C18 30 21 28 23 23C26 17 23 10 16 3Z" fill={`url(#${id}g)`}/>
      <path d="M16 12C13 16 12 21 13.5 25C14.5 27 15.5 28 16 28C16.5 28 17.5 27 18.5 25C20 21 19 16 16 12Z" fill="rgba(255,255,230,0.75)"/>
    </svg>
  );
  if (iconKey === "clock") return (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <defs><radialGradient id={`${id}g`} cx="36%" cy="30%" r="68%"><stop offset="0%" stopColor="#B0D4F8"/><stop offset="100%" stopColor="#1858A0"/></radialGradient></defs>
      <circle cx="16" cy="16" r="13" fill={`url(#${id}g)`}/>
      <path d="M16 16V8.5" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M16 16L22 19.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="16" cy="16" r="1.8" fill="white"/>
    </svg>
  );
  if (iconKey === "check") return (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <defs><radialGradient id={`${id}g`} cx="36%" cy="30%" r="68%"><stop offset="0%" stopColor="#90EAB8"/><stop offset="100%" stopColor="#127840"/></radialGradient></defs>
      <circle cx="16" cy="16" r="13" fill={`url(#${id}g)`}/>
      <path d="M8.5 16L13.5 21.5L23.5 10.5" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  if (iconKey === "star") return (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <defs><radialGradient id={`${id}g`} cx="36%" cy="26%" r="68%"><stop offset="0%" stopColor="#D8B4FF"/><stop offset="100%" stopColor="#4A18A0"/></radialGradient></defs>
      <path d="M16 3L18.9 11.6H28L20.5 16.8L23.4 25.4L16 20.2L8.6 25.4L11.5 16.8L4 11.6H13.1Z" fill={`url(#${id}g)`}/>
    </svg>
  );
  if (iconKey === "users") return (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <defs><radialGradient id={`${id}g`} cx="36%" cy="30%" r="68%"><stop offset="0%" stopColor="#90F0B8"/><stop offset="100%" stopColor="#127840"/></radialGradient></defs>
      <circle cx="12" cy="11" r="5" fill={`url(#${id}g)`}/>
      <circle cx="22" cy="11" r="4" fill={`url(#${id}g)`} opacity="0.6"/>
      <path d="M3 26C3 21 7 18 12 18C17 18 21 21 21 26" stroke={`url(#${id}g)`} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
  if (iconKey === "bolt") return (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <defs><linearGradient id={`${id}g`} x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stopColor="#FFE055"/><stop offset="100%" stopColor="#E09010"/></linearGradient></defs>
      <path d="M18 4L6 18H15L14 28L26 14H17Z" fill={`url(#${id}g)`}/>
    </svg>
  );
  if (iconKey === "brain2") return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <defs><radialGradient id={`${id}a`} cx="36%" cy="30%" r="68%"><stop offset="0%" stopColor="#B0D4F8"/><stop offset="100%" stopColor="#1858A0"/></radialGradient></defs>
      <path d="M24 6C20 6 17 8 15.5 11C13 11.5 11 13 10 15C8 15.8 7 17.5 7 20C7 24 9.5 27 13 28V32C13 33.1 13.9 34 15 34H33C34.1 34 35 33.1 35 32V28C38.5 27 41 24 41 20C41 17.5 40 15.8 38 15C37 13 35 11.5 32.5 11C31 8 28 6 24 6Z" fill={`url(#${id}a)`}/>
      <ellipse cx="18" cy="16" rx="4" ry="6" fill="rgba(255,255,255,0.18)" transform="rotate(-20,18,16)"/>
    </svg>
  );
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{color}}><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4"/></svg>;
}

export function NavIcon({ iconKey, color, isActive, size = 18 }: NavIconProps) {
  return (
    <div style={{ width:32, height:32, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
      background: isActive ? `linear-gradient(135deg,${color}28,${color}14)` : "transparent",
      boxShadow: isActive ? `inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 8px ${color}22` : "none",
      color: isActive ? color : "inherit", transition:"all 0.2s" }}>
      <Icon3D iconKey={iconKey} size={size} color={isActive ? color : "currentColor"} />
    </div>
  );
}
export { Icon3D };
