"use client";
import { useEffect, useRef } from "react";
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    const fineMq = window.matchMedia("(pointer: fine)");
    if (!fineMq.matches) return;
    document.body.classList.add("custom-cursor-active");
    const handleMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };
    const handleLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    };
    const handleEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
    };
    const animate = () => {
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * 0.25;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * 0.25;
      if (cursorRef.current) {
        cursorRef.current.style.transform = 
          `translate3d(${positionRef.current.x - 12}px, ${positionRef.current.y - 12}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    document.documentElement.addEventListener("mouseenter", handleEnter);
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.removeEventListener("mouseenter", handleEnter);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);
  return (
    <>
      <div ref={cursorRef} className="gemini-cursor" aria-hidden="true" />
      <style jsx>{`
        .gemini-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          opacity: 1;
          transition: opacity 0.3s ease;
          background: linear-gradient(
            135deg,
            #4285f4 0%,
            #a05af5 33%,
            #e37482 66%,
            #fbbc04 100%
          );
          background-size: 300% 300%;
          box-shadow:
            0 0 12px rgba(160, 90, 245, 0.6),
            0 0 24px rgba(66, 133, 244, 0.4),
            0 0 36px rgba(251, 188, 4, 0.2);
          mix-blend-mode: screen;
          animation: brilho-gemini 4s ease infinite;
        }
        @keyframes brilho-gemini {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gemini-cursor {
            animation: none;
            background: #a05af5;
          }
        }
        @media (pointer: coarse) {
          .gemini-cursor {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
