"use client";
import { useEffect, useRef } from "react";
type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  brightness: number; // multiplicador de brilho individual
};
const PARTICLE_COUNT = 70;
const CONNECTION_DISTANCE = 145;
const PARTICLE_COLOR = "rgba(220, 200, 240, 0.85)";
const PARTICLE_GLOW = "rgba(196, 176, 224, 0.9)";
const LINE_COLOR = "rgba(168, 146, 200,";
export function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId = 0;
    let particles: Particle[] = [];
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particles.length === 0) {
        particles = Array.from({ length: PARTICLE_COUNT }, () => {
          // 30% das estrelas são "grandes/próximas", 70% são "distantes"
          const isLarge = Math.random() < 0.3;
          return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            radius: isLarge
              ? Math.random() * 1.4 + 1.2  // 1.2 a 2.6
              : Math.random() * 0.8 + 0.4,  // 0.4 a 1.2
            brightness: isLarge ? 1 : 0.55,
          };
        });
      }
    };
    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      // Atualiza posições
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      }
      // CONEXÕES — mais nítidas e elegantes
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
      // PARTÍCULAS COM BRILHO REAL (shadowBlur)
      for (const p of particles) {
        // Camada 1: glow externo (estrela "irradiando")
        ctx.beginPath();
        ctx.shadowBlur = 12 * p.brightness;
        ctx.shadowColor = PARTICLE_GLOW;
        ctx.fillStyle = PARTICLE_COLOR;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        // Camada 2: núcleo branco-luz (hotspot da estrela)
        ctx.beginPath();
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * p.brightness})`;
        ctx.arc(p.x, p.y, p.radius * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      // Reset shadow pra não vazar pro próximo frame
      ctx.shadowBlur = 0;
      animationId = requestAnimationFrame(draw);
    };
    resize();
    draw();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement!);
    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
