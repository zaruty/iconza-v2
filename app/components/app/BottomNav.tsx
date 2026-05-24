"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Home,
  Orbit,
  Trophy,
  User,
  type LucideIcon,
} from "lucide-react";
import { hrefToNavColorKey } from "@/app/lib/app/nav-colors";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Início", icon: Home },
  { href: "/explorar", label: "Explorar", icon: Compass },
  { href: "/universos", label: "Universos", icon: Orbit },
  { href: "/conquistas", label: "Conquistas", icon: Trophy },
  { href: "/perfil", label: "Perfil", icon: User },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({ item, variant }: { item: NavItem; variant: "bottom" | "sidebar" }) {
  const pathname = usePathname();
  const active = isActive(pathname, item.href);
  const Icon = item.icon;
  const navKey = hrefToNavColorKey(item.href);

  return (
    <Link
      href={item.href}
      className={`app-nav__link app-nav__link--${variant} ${active ? "is-active" : ""}`}
      data-nav={navKey}
      aria-current={active ? "page" : undefined}
    >
      <span className="app-nav__icon-wrap">
        <Icon
          className="app-nav__icon"
          fill={active ? "currentColor" : "color-mix(in srgb, currentColor 62%, transparent)"}
          strokeWidth={variant === "bottom" ? (active ? 1.25 : 1.5) : active ? 1.25 : 1.5}
          aria-hidden
        />
      </span>
      {variant === "sidebar" || active ? (
        <span className={`app-nav__label${variant === "sidebar" ? " app-nav__label--sidebar" : " font-subtitle"}`}>
          {item.label}
        </span>
      ) : null}
    </Link>
  );
}

export function BottomNav() {
  return (
    <>
      <nav
        className="app-nav app-nav--bottom md:hidden"
        aria-label="Navegação principal"
      >
        <ul className="app-nav__list app-nav__list--bottom">
          {NAV_ITEMS.map((item) => (
            <li key={item.href} className="app-nav__item">
              <NavLink item={item} variant="bottom" />
            </li>
          ))}
        </ul>
      </nav>

      <nav
        className="app-nav app-nav--sidebar hidden md:flex"
        aria-label="Navegação principal"
      >
        <ul className="app-nav__list app-nav__list--sidebar">
          {NAV_ITEMS.map((item) => (
            <li key={item.href} className="app-nav__item">
              <NavLink item={item} variant="sidebar" />
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
