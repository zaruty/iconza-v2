import "@/app/onboarding.css";
import { OnboardingVideoShell } from "@/app/components/onboarding/onboarding-video-shell";

export default function OnboardingVideoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="onboarding-root">
      <OnboardingVideoShell>{children}</OnboardingVideoShell>
    </div>
  );
}
