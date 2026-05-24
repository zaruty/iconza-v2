type IconProps = { className?: string };

export function AdminIconOverview({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 19v-8.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 20.5V14h5v6.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AdminIconUniverses({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <path
        d="M12 4v3M12 17v3M4 12h3M17 12h3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AdminIconLessons({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M5 7.5 12 4l7 3.5v9L12 20l-7-3.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M12 11.5v8.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function AdminIconQuiz({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect
        x="4"
        y="5"
        width="16"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M8 10h8M8 14h5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AdminIconUsers({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M3.5 19c.8-2.8 3-4.5 5.5-4.5s4.7 1.7 5.5 4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M16 8.5a2.5 2.5 0 0 1 0 5M18.5 19c-.4-1.6-1.6-2.8-3-3.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AdminIconAnalytics({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M5 18V10M10 18V6M15 18v-5M20 18V8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AdminIconUploads({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 15V5M8.5 8.5 12 5l3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 15.5v2A1.5 1.5 0 0 0 6.5 19h11a1.5 1.5 0 0 0 1.5-1.5v-2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AdminIconBackgrounds({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 16l4.5-5 4 3.5L16 8l4 5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function AdminIconThemes({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 3a7 7 0 1 0 7 7c0-.5 0-1-.1-1.5A5.5 5.5 0 0 1 12 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AdminIconMonetization({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect
        x="3"
        y="6"
        width="18"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function AdminIconMenu({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M5 7h14M5 12h14M5 17h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AdminIconClose({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M7 7l10 10M17 7 7 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const MODULE_ICON_MAP = {
  overview: AdminIconOverview,
  universes: AdminIconUniverses,
  lessons: AdminIconLessons,
  quiz: AdminIconQuiz,
  users: AdminIconUsers,
  analytics: AdminIconAnalytics,
  uploads: AdminIconUploads,
  backgrounds: AdminIconBackgrounds,
  themes: AdminIconThemes,
  monetization: AdminIconMonetization,
} as const;

export type AdminNavIcon = keyof typeof MODULE_ICON_MAP;

export function AdminNavIcon({
  name,
  className,
}: {
  name: AdminNavIcon;
  className?: string;
}) {
  const Icon = MODULE_ICON_MAP[name];
  return <Icon className={className} />;
}

export function AdminModuleIcon({
  name,
  className,
}: {
  name: Exclude<AdminNavIcon, "overview">;
  className?: string;
}) {
  const Icon = MODULE_ICON_MAP[name];
  return <Icon className={className} />;
}
