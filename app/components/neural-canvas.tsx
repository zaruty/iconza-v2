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

type NeuralConfig = {
  particleCount: number;
  connectionDistance: number;
  lineWidth: number;
  lineAlphaMax: number;
  shadowBlurBase: number;
  largeRatio: number;
  largeRadiusMin: number;
  largeRadiusRange: number;
  smallRadiusMin: number;
  smallRadiusRange: number;
  speed: number;
};

const MOBILE_CONFIG: NeuralConfig = {
  particleCount: 90,
  connectionDistance: 145,
  lineWidth: 0.7,
  lineAlphaMax: 0.25,
  shadowBlurBase: 12,
  largeRatio: 0.3,
  largeRadiusMin: 1.2,
  largeRadiusRange: 1.4,
  smallRadiusMin: 0.4,
  smallRadiusRange: 0.8,
  speed: 0.25,
};

const DESKTOP_CONFIG: NeuralConfig = {
  particleCount: 120,
  connectionDistance: 215,
  lineWidth: 1.15,
  lineAlphaMax: 0.4,
  shadowBlurBase: 20,
  largeRatio: 0.42,
  largeRadiusMin: 1.6,
  largeRadiusRange: 2.2,
  smallRadiusMin: 0.55,
  smallRadiusRange: 1.05,
  speed: 0.2,
};

const PARTICLE_COLOR = "rgba(220, 200, 240, 0.88)";
const PARTICLE_GLOW = "rgba(196, 176, 224, 0.92)";
const LINE_COLOR = "rgba(168, 146, 200,";

function getConfig(): NeuralConfig {
  return window.innerWidth >= 768 ? DESKTOP_CONFIG : MOBILE_CONFIG;
}

function createParticles(width: number, height: number, config: NeuralConfig) {
  return Array.from({ length: config.particleCount }, () => {
    const isLarge = Math.random() < config.largeRatio;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * config.speed,
      vy: (Math.random() - 0.5) * config.speed,
      radius: isLarge
        ? Math.random() * config.largeRadiusRange + config.largeRadiusMin
        : Math.random() * config.smallRadiusRange + config.smallRadiusMin,
      brightness: isLarge ? 1 : 0.58,
    };
  });
}

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
    let config = getConfig();
    let isDesktop = window.innerWidth >= 768;

    const getSize = () => ({
      width: window.innerWidth,
      height: Math.max(
        container.offsetHeight,
        document.documentElement.scrollHeight,
      ),
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nextDesktop = window.innerWidth >= 768;
      const size = getSize();
      width = size.width;
      height = size.height;

      if (nextDesktop !== isDesktop || particles.length === 0) {
        isDesktop = nextDesktop;
        config = getConfig();
        particles = createParticles(width, height, config);
      } else {
        particles.forEach((p) => {
          if (p.x > width) p.x = Math.random() * width;
          if (p.y > height) p.y = Math.random() * height;
        });
      }

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
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
          if (dist < config.connectionDistance) {
            const alpha = 1 - dist / config.connectionDistance;
            const proximity = (a.brightness + b.brightness) * 0.5;
            ctx.beginPath();
            ctx.strokeStyle = `${LINE_COLOR} ${alpha * config.lineAlphaMax * proximity})`;
            ctx.lineWidth = config.lineWidth;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.shadowBlur = config.shadowBlurBase * p.brightness;
        ctx.shadowColor = PARTICLE_GLOW;
        ctx.fillStyle = PARTICLE_COLOR;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.92 * p.brightness})`;
        ctx.arc(p.x, p.y, p.radius * 0.48, 0, Math.PI * 2);
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
