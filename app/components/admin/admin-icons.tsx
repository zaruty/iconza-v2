import {
  BarChart3,
  BookOpen,
  ClipboardList,
  CreditCard,
  Globe2,
  Image,
  LayoutDashboard,
  Menu,
  Orbit,
  Palette,
  Upload,
  Users,
  type LucideIcon,
} from "lucide-react";

const STROKE = 1.5;

const MODULE_ICON_MAP = {
  overview: LayoutDashboard,
  universes: Orbit,
  lessons: BookOpen,
  quiz: ClipboardList,
  users: Users,
  analytics: BarChart3,
  uploads: Upload,
  backgrounds: Image,
  themes: Palette,
  monetization: CreditCard,
} as const satisfies Record<string, LucideIcon>;

export type AdminNavIcon = keyof typeof MODULE_ICON_MAP;

type IconProps = {
  className?: string;
};

function LucideAdminIcon({
  Icon,
  className,
}: {
  Icon: LucideIcon;
  className?: string;
}) {
  return <Icon className={className} strokeWidth={STROKE} aria-hidden />;
}

export function AdminNavIcon({
  name,
  className,
}: {
  name: AdminNavIcon;
  className?: string;
}) {
  const Icon = MODULE_ICON_MAP[name];
  return <LucideAdminIcon Icon={Icon} className={className} />;
}

export function AdminModuleIcon({
  name,
  className,
}: {
  name: Exclude<AdminNavIcon, "overview">;
  className?: string;
}) {
  const Icon = MODULE_ICON_MAP[name];
  return <LucideAdminIcon Icon={Icon} className={className} />;
}

export function AdminIconMenu({ className }: IconProps) {
  return <Menu className={className} strokeWidth={STROKE} aria-hidden />;
}

export function AdminIconGlobe({ className }: IconProps) {
  return <Globe2 className={className} strokeWidth={STROKE} aria-hidden />;
}
