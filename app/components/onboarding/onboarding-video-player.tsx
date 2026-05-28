"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import { useOnboardingVideoShell } from "@/app/components/onboarding/onboarding-video-shell";

const EXIT_FADE_MS = 500;

type OnboardingVideoPlayerProps = {
  src: string;
  onEnded: () => void;
  className?: string;
  exitFadeOnEnd?: boolean;
};

export function OnboardingVideoPlayer({
  src,
  onEnded,
  className = "",
  exitFadeOnEnd = false,
}: OnboardingVideoPlayerProps) {
  const { setVideoPlaying } = useOnboardingVideoShell();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showUnmute, setShowUnmute] = useState(false);

  const markNotPlaying = useCallback(() => {
    setIsVisible(false);
    setVideoPlaying(false);
  }, [setVideoPlaying]);

  const markPlaying = useCallback(() => {
    setIsVisible(true);
    setVideoPlaying(true);
  }, [setVideoPlaying]);

  const attemptAutoplay = useCallback(async (video: HTMLVideoElement) => {
    video.muted = false;

    try {
      await video.play();
      setIsMuted(false);
      setShowUnmute(false);
      return;
    } catch {
      video.muted = true;

      try {
        await video.play();
        setIsMuted(true);
        setShowUnmute(true);
      } catch {
        setShowUnmute(true);
      }
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    markNotPlaying();
    void attemptAutoplay(video);

    return () => {
      markNotPlaying();
    };
  }, [attemptAutoplay, markNotPlaying, src]);

  const handleUnmute = async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;

    try {
      await video.play();
      setIsMuted(false);
      setShowUnmute(false);
    } catch {
      video.muted = true;
      setIsMuted(true);
      setShowUnmute(true);
    }
  };

  const handleEnded = () => {
    markNotPlaying();

    if (!exitFadeOnEnd) {
      onEnded();
      return;
    }

    window.setTimeout(() => onEnded(), EXIT_FADE_MS);
  };

  return (
    <div className={`onboarding-video ${className}`.trim()}>
      <video
        ref={videoRef}
        className={`onboarding-video__media${isVisible ? " is-visible" : ""}`}
        src={src}
        autoPlay
        playsInline
        preload="auto"
        onPlaying={markPlaying}
        onEnded={handleEnded}
      />

      {showUnmute && isMuted ? (
        <button
          type="button"
          className="onboarding-video__unmute"
          onClick={() => void handleUnmute()}
          aria-label="Ativar som"
        >
          <Volume2 aria-hidden size={20} strokeWidth={1.75} />
        </button>
      ) : null}
    </div>
  );
}
