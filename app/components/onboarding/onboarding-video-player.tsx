"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";

type OnboardingVideoPlayerProps = {
  src: string;
  onEnded: () => void;
  className?: string;
};

export function OnboardingVideoPlayer({
  src,
  onEnded,
  className = "",
}: OnboardingVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showUnmute, setShowUnmute] = useState(false);

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

    void attemptAutoplay(video);
  }, [attemptAutoplay, src]);

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

  return (
    <div className={`onboarding-video ${className}`.trim()}>
      <video
        ref={videoRef}
        className="onboarding-video__media"
        src={src}
        autoPlay
        playsInline
        preload="auto"
        onEnded={onEnded}
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
