"use client";
import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  brightness: number;
};

const PARTICLE_COUNT = 90;
const CONNECTION_DISTANCE = 145;
const PARTICLE_COLOR = "rgba(220, 200, 240, 0.85)";
const PARTICLE_GLOW = "rgba(196, 176, 224, 0.9)";
const LINE_COLOR = "rgba(168, 146, 200,";

export function NeuralCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    const getSize = () => ({
      width: window.innerWidth,
      height: Math.max(
        container.offsetHeight,
        document.documentElement.scrollHeight,
      ),
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const size = getSize();
      width = size.width;
      height = size.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particles.length === 0) {
        particles = Array.from({ length: PARTICLE_COUNT }, () => {
          const isLarge = Math.random() < 0.3;
          return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            radius: isLarge
              ? Math.random() * 1.4 + 1.2
              : Math.random() * 0.8 + 0.4,
            brightness: isLarge ? 1 : 0.55,
          };
        });
      } else {
        particles.forEach((p) => {
          if (p.x > width) p.x = Math.random() * width;
          if (p.y > height) p.y = Math.random() * height;
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECTION_DISTANCE) {
            const alpha = 1 - dist / CONNECTION_DISTANCE;
            ctx.beginPath();
            ctx.strokeStyle = `${LINE_COLOR} ${alpha * 0.25})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.shadowBlur = 12 * p.brightness;
        ctx.shadowColor = PARTICLE_GLOW;
        ctx.fillStyle = PARTICLE_COLOR;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * p.brightness})`;
        ctx.arc(p.x, p.y, p.radius * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
