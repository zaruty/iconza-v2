import "@/app/onboarding.css";

export default function OnboardingVideoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="onboarding-root">{children}</div>;
}
