import Link from "next/link";
import { AuthAtmosphere } from "./auth-atmosphere";
import { CustomCursor } from "../custom-cursor";
import { IconzaLogo } from "../iconza-logo";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <div className="auth-page auth-viewport-min relative">
      <CustomCursor />
      <AuthAtmosphere />

      <div className="site-content auth-viewport-min relative z-10 flex flex-col items-center justify-center px-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[max(2.5rem,calc(3.25rem+env(safe-area-inset-top,0px)))] sm:px-6 sm:py-10">
        <Link
          href="/"
          className="auth-brand group mb-8 flex min-h-[44px] items-center gap-2.5 transition-opacity hover:opacity-85"
        >
          <IconzaLogo className="h-6 w-8 text-white/75 transition-colors group-hover:text-white/95" />
          <span className="font-display text-lg font-semibold tracking-[0.2em] text-iconza-pink sm:text-xl">
            ICONZA
          </span>
        </Link>

        <div className="auth-card w-full max-w-md">
          <div className="auth-card__header">
            <h1 className="auth-card__title font-hero">{title}</h1>
            <p className="auth-card__subtitle font-subtitle">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
