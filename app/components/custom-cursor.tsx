"use client";
import { useEffect, useRef } from "react";
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    const fineMq = window.matchMedia("(pointer: fine)");
    if (!fineMq.matches) return;
    document.body.classList.add("custom-cursor-active");
    const handleMove = (e: MouseEvent) => {
      dotPos.current.x = e.clientX;
      dotPos.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      }
    };
    const handleLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const handleEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };
    const animate = () => {
      ringPos.current.x += (dotPos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (dotPos.current.y - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px, 0)`;
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
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <style jsx>{`
        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C4B0E0;
          pointer-events: none;
          z-index: 9999;
          transition: opacity 0.3s ease;
        }
        .cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1.5px solid rgba(168, 146, 200, 0.6);
          pointer-events: none;
          z-index: 9998;
          transition: opacity 0.3s ease;
        }
        @media (pointer: coarse) {
          .cursor-dot,
          .cursor-ring {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
