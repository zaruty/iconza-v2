import { AppThemeToggle } from "./app-theme-toggle";

type AppScreenProps = {
  children: React.ReactNode;
  className?: string;
};

export function AppScreen({ children, className = "" }: AppScreenProps) {
  return (
    <div className={`app-hud-screen ${className}`.trim()}>
      <div className="app-hud-screen__toolbar">
        <AppThemeToggle />
      </div>
      <div className="app-hud-screen__inner">{children}</div>
    </div>
  );
}
