import { AppThemeToggle } from "./app-theme-toggle";

type AppScreenProps = {
  children: React.ReactNode;
  className?: string;
  layout?: "default" | "wide" | "full";
};

export function AppScreen({
  children,
  className = "",
  layout = "wide",
}: AppScreenProps) {
  return (
    <div className={`app-hud-screen ${className}`.trim()}>
      <div className="app-hud-screen__toolbar">
        <AppThemeToggle />
      </div>
      <div className={`app-hud-screen__inner app-hud-screen__inner--${layout}`}>
        {children}
      </div>
    </div>
  );
}
