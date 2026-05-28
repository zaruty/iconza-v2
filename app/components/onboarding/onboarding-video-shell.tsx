"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";

type OnboardingVideoShellContextValue = {
  setVideoPlaying: (playing: boolean) => void;
};

const OnboardingVideoShellContext =
  createContext<OnboardingVideoShellContextValue | null>(null);

export function useOnboardingVideoShell() {
  const context = useContext(OnboardingVideoShellContext);

  if (!context) {
    throw new Error(
      "useOnboardingVideoShell must be used within OnboardingVideoShell",
    );
  }

  return context;
}

export function OnboardingVideoShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [videoPlaying, setVideoPlayingState] = useState(false);

  useEffect(() => {
    setVideoPlayingState(false);
  }, [pathname]);

  const setVideoPlaying = useCallback((playing: boolean) => {
    setVideoPlayingState(playing);
  }, []);

  const value = useMemo(
    () => ({
      setVideoPlaying,
    }),
    [setVideoPlaying],
  );

  return (
    <OnboardingVideoShellContext.Provider value={value}>
      <div className="onboarding-shell">
        {children}

        {!videoPlaying ? (
          <p className="onboarding-video__loading" aria-live="polite">
            Aguarde...
          </p>
        ) : null}
      </div>
    </OnboardingVideoShellContext.Provider>
  );
}
