"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type IconName = "Brain" | "Heart" | "Globe" | "UtensilsCrossed" | "Palette";

type Universo = {
  id: string;
  numero: string;
  nome: string;
  tagline: string;
  descricao: string;
  bgColor: string;
  accentColor: string;
  atmosphere?: string;
  textoFundo: string;
  planetGradient: string;
  icone: IconName;
  recursos: [string, string, string];
};

function darkenHex(hex: string, factor = 0.35) {
  const normalized = hex.replace("#", "");
  const r = Math.round(parseInt(normalized.slice(0, 2), 16) * (1 - factor));
  const g = Math.round(parseInt(normalized.slice(2, 4), 16) * (1 - factor));
  const b = Math.round(parseInt(normalized.slice(4, 6), 16) * (1 - factor));
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function buildPlanetGradient(bgColor: string, accentColor: string) {
  const bgColorEscuro = darkenHex(bgColor);
  return `radial-gradient(circle at 30% 30%, ${accentColor}, ${bgColor} 70%, ${bgColorEscuro})`;
}

function buildUniverso(
  data: Omit<Universo, "planetGradient">,
): Universo {
  return {
    ...data,
    planetGradient: buildPlanetGradient(data.bgColor, data.accentColor),
  };
}

const universos: Universo[] = [
  buildUniverso({
    id: "iconmind",
    numero: "01",
    nome: "ICONMIND",
    tagline: "CONHECIMENTO CRIA DIREÇÃO.",
    descricao:
      "Mentes curiosas constroem futuros extraordinários. Explore ideias, desenvolva estratégias e transforme conhecimento em impacto real.",
    bgColor: "#1A2E5C",
    accentColor: "#6B8FC7",
    textoFundo: "MIND",
    icone: "Brain",
    recursos: ["Mapa de ideias", "Guia estratégico", "Radar de insights"],
  }),
  buildUniverso({
    id: "iconetnia",
    numero: "02",
    nome: "ICONETNIA",
    tagline: "IDENTIDADE CRIA PERTENCIMENTO.",
    descricao:
      "Cultura e identidade são suas maiores forças. Explore suas raízes, celebre sua história e amplifique sua voz no mundo.",
    bgColor: "#0A2A14",
    accentColor: "#52B87A",
    atmosphere:
      "radial-gradient(circle at 25% 25%, rgba(60,150,90,0.20), transparent 40%), radial-gradient(circle at 70% 20%, rgba(30,90,50,0.15), transparent 45%)",
    textoFundo: "ETNIA",
    icone: "Globe",
    recursos: ["Mapa cultural", "Guia de identidade", "Radar de impacto"],
  }),
  buildUniverso({
    id: "iconfood",
    numero: "03",
    nome: "ICONFOOD",
    tagline: "SABOR CRIA MEMÓRIA.",
    descricao:
      "Gastronomia é linguagem universal. Transforme experiências culinárias em conteúdo, cultura e comunidade.",
    bgColor: "#2A0E00",
    accentColor: "#E8721A",
    atmosphere:
      "radial-gradient(circle at 25% 30%, rgba(232,114,26,0.35), transparent 45%), radial-gradient(circle at 70% 25%, rgba(200,90,10,0.25), transparent 45%), radial-gradient(circle at 50% 65%, rgba(150,60,0,0.20), transparent 50%)",
    textoFundo: "FOOD",
    icone: "UtensilsCrossed",
    recursos: [
      "Mapa gastronômico",
      "Guia de experiências",
      "Radar de tendências",
    ],
  }),
  buildUniverso({
    id: "iconlove",
    numero: "04",
    nome: "ICONLOVE",
    tagline: "EMOÇÃO CRIA CONEXÃO.",
    descricao:
      "Relações profundas começam com autoconhecimento. Desenvolva inteligência emocional e construa vínculos que transformam.",
    bgColor: "#3D0A20",
    accentColor: "#D4688A",
    atmosphere:
      "radial-gradient(circle at 20% 30%, rgba(180,80,120,0.22), transparent 40%), radial-gradient(circle at 75% 20%, rgba(120,40,70,0.18), transparent 45%)",
    textoFundo: "LOVE",
    icone: "Heart",
    recursos: ["Mapa emocional", "Guia de vínculos", "Radar de autoestima"],
  }),
  buildUniverso({
    id: "iconart",
    numero: "05",
    nome: "ICONART",
    tagline: "EXPRESSÃO CRIA IMPACTO.",
    descricao:
      "Arte é o idioma da alma criativa. Desenvolva seu olhar estético, sua linguagem visual e sua assinatura única.",
    bgColor: "#2A0F5C",
    accentColor: "#7A5CCF",
    textoFundo: "ART",
    icone: "Palette",
    recursos: ["Mapa estético", "Guia de linguagem visual", "Radar criativo"],
  }),
];

const CROSSFADE_MS = 0.4;

const DESKTOP_PLANET_TEXT_GAP_PX = 450;

function accentWithAlpha(hex: string, alpha = "60") {
  return `${hex}${alpha}`;
}

type Rgb = { r: number; g: number; b: number };

function hexToRgb(hex: string): Rgb {
  const normalized = hex.replace("#", "");
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function lerpRgb(a: Rgb, b: Rgb, t: number): Rgb {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  };
}

function rgbaFromRgb(rgb: Rgb, alpha: number): string {
  return `rgba(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}, ${alpha})`;
}

const NEURAL_CONNECTION_DISTANCE = 220;
const NEURAL_COLOR_TRANSITION_MS = 1200;

type NeuralNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

function getNeuralNodeCount() {
  if (typeof window === "undefined") return 55;
  return window.matchMedia("(min-width: 768px)").matches ? 55 : 20;
}

function NeuralBackground({ activeIndex }: { activeIndex: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<NeuralNode[]>([]);
  const currentColorRef = useRef<Rgb>(
    hexToRgb(universos[activeIndex].accentColor),
  );
  const startColorRef = useRef<Rgb>(
    hexToRgb(universos[activeIndex].accentColor),
  );
  const targetColorRef = useRef<Rgb>(
    hexToRgb(universos[activeIndex].accentColor),
  );
  const colorTransitionStartRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    startColorRef.current = { ...currentColorRef.current };
    targetColorRef.current = hexToRgb(universos[activeIndex].accentColor);
    colorTransitionStartRef.current = performance.now();
  }, [activeIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initNodes = (width: number, height: number, count: number) => {
      nodesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = window.devicePixelRatio || 1;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      const count = getNeuralNodeCount();

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (nodesRef.current.length !== count) {
        initNodes(width, height, count);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (now: number) => {
      const parent = canvas.parentElement;
      if (!parent) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const width = parent.clientWidth;
      const height = parent.clientHeight;

      const elapsed = now - colorTransitionStartRef.current;
      const progress = Math.min(1, elapsed / NEURAL_COLOR_TRANSITION_MS);
      const eased = 1 - (1 - progress) ** 3;
      currentColorRef.current = lerpRgb(
        startColorRef.current,
        targetColorRef.current,
        eased,
      );
      const color = currentColorRef.current;

      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0) node.x = width;
        else if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        else if (node.y > height) node.y = 0;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist >= NEURAL_CONNECTION_DISTANCE) continue;

          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = rgbaFromRgb(color, 0.35);
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = rgbaFromRgb(color, 0.7);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

function getActiveIndex(progress: number) {
  return Math.min(4, Math.max(0, Math.floor(progress * 5)));
}

function PlanetaCSS({ universo }: { universo: Universo }) {
  return (
    <motion.div
      className="relative h-[250px] w-[250px] shrink-0 rounded-full md:h-[450px] md:w-[450px]"
      initial={{ opacity: 0, y: 100, rotate: -45, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      transition={{ type: "spring", bounce: 0.3 }}
      style={{
        background: universo.planetGradient,
        boxShadow: `0 0 80px ${accentWithAlpha(universo.accentColor)}, inset -30px -30px 60px rgba(0,0,0,0.8)`,
      }}
      aria-hidden
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 70% 70%, transparent 20%, #000 120%)",
          opacity: 0.2,
        }}
      />
      <div className="absolute top-[20%] left-[20%] h-16 w-16 rounded-full bg-white/10 blur-md" />
    </motion.div>
  );
}

const ICONMIND_PALETTE = {
  highlight: "#7E98C8",
  midtone: "#5B75A9",
  shadow: "#25385F",
  deepShadow: "#09132C",
  halo: "#4D6DAA",
} as const;

const ICONMIND_LUNAR_TEXTURE = [
  "radial-gradient(ellipse 38% 28% at 24% 28%, rgba(126,152,200,0.32) 0%, transparent 100%)",
  "radial-gradient(ellipse 42% 34% at 58% 22%, rgba(91,117,169,0.28) 0%, transparent 100%)",
  "radial-gradient(ellipse 36% 30% at 72% 52%, rgba(37,56,95,0.35) 0%, transparent 100%)",
  "radial-gradient(ellipse 30% 26% at 32% 62%, rgba(9,19,44,0.38) 0%, transparent 100%)",
  "radial-gradient(ellipse 28% 22% at 48% 44%, rgba(77,109,170,0.26) 0%, transparent 100%)",
  "radial-gradient(ellipse 24% 20% at 18% 48%, rgba(126,152,200,0.22) 0%, transparent 100%)",
  "radial-gradient(ellipse 32% 24% at 64% 68%, rgba(91,117,169,0.24) 0%, transparent 100%)",
  "radial-gradient(ellipse 20% 18% at 42% 78%, rgba(37,56,95,0.30) 0%, transparent 100%)",
].join(", ");

const ICONMIND_NEURAL_TEXTURE = [
  "repeating-conic-gradient(from 12deg at 46% 42%, transparent 0deg, rgba(126,152,200,0.07) 3deg, transparent 7deg)",
  "repeating-conic-gradient(from 88deg at 54% 56%, transparent 0deg, rgba(77,109,170,0.06) 2deg, transparent 6deg)",
  "radial-gradient(circle at 50% 50%, transparent 38%, rgba(126,152,200,0.05) 52%, transparent 68%)",
  "radial-gradient(circle at 50% 50%, transparent 55%, rgba(91,117,169,0.08) 62%, transparent 72%)",
  "linear-gradient(135deg, transparent 42%, rgba(126,152,200,0.06) 50%, transparent 58%)",
  "linear-gradient(215deg, transparent 44%, rgba(77,109,170,0.05) 52%, transparent 60%)",
].join(", ");

const ICONMIND_COGNITIVE_NODES = [
  { id: 0, x: 26, y: 28, size: 8, duration: 5.2, delay: 0 },
  { id: 1, x: 42, y: 22, size: 6, duration: 6.4, delay: 0.4 },
  { id: 2, x: 58, y: 26, size: 7, duration: 7.1, delay: 0.8 },
  { id: 3, x: 34, y: 38, size: 5, duration: 4.8, delay: 1.2 },
  { id: 4, x: 50, y: 36, size: 9, duration: 6.8, delay: 0.2 },
  { id: 5, x: 66, y: 34, size: 6, duration: 5.6, delay: 1.6 },
  { id: 6, x: 22, y: 46, size: 7, duration: 7.4, delay: 0.6 },
  { id: 7, x: 38, y: 50, size: 4, duration: 4.4, delay: 2.0 },
  { id: 8, x: 54, y: 48, size: 8, duration: 6.0, delay: 1.0 },
  { id: 9, x: 70, y: 46, size: 5, duration: 7.8, delay: 1.4 },
  { id: 10, x: 30, y: 58, size: 6, duration: 5.4, delay: 2.4 },
  { id: 11, x: 46, y: 56, size: 10, duration: 6.6, delay: 0.3 },
  { id: 12, x: 62, y: 58, size: 7, duration: 4.6, delay: 1.8 },
  { id: 13, x: 24, y: 66, size: 5, duration: 7.2, delay: 2.8 },
  { id: 14, x: 40, y: 68, size: 6, duration: 5.8, delay: 0.9 },
  { id: 15, x: 56, y: 66, size: 8, duration: 6.2, delay: 2.2 },
  { id: 16, x: 48, y: 42, size: 4, duration: 4.2, delay: 1.1 },
  { id: 17, x: 60, y: 52, size: 5, duration: 7.0, delay: 0.5 },
  { id: 18, x: 36, y: 30, size: 7, duration: 5.0, delay: 2.6 },
  { id: 19, x: 52, y: 62, size: 6, duration: 6.4, delay: 1.3 },
  { id: 20, x: 44, y: 28, size: 5, duration: 4.6, delay: 0.7 },
  { id: 21, x: 28, y: 52, size: 8, duration: 7.6, delay: 1.7 },
  { id: 22, x: 64, y: 42, size: 4, duration: 5.4, delay: 2.1 },
  { id: 23, x: 32, y: 44, size: 6, duration: 6.8, delay: 0.1 },
  { id: 24, x: 58, y: 38, size: 7, duration: 4.8, delay: 2.3 },
] as const;

function buildIconMindConnections(
  nodes: readonly { id: number; x: number; y: number }[],
  maxDistance: number,
) {
  const pairs: [number, number][] = [];

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (Math.hypot(dx, dy) <= maxDistance) {
        pairs.push([nodes[i].id, nodes[j].id]);
      }
    }
  }

  return pairs;
}

const ICONMIND_NODE_CONNECTIONS = buildIconMindConnections(
  ICONMIND_COGNITIVE_NODES,
  24,
);

const ICONMIND_ORBIT_PARTICLES = Array.from({ length: 32 }, (_, index) => ({
  id: index,
  armWidth: 108 + (index % 6) * 4,
  size: 2 + (index % 3),
  duration: 90 + (index % 8) * 12,
  delay: (index % 10) * 0.8,
  startAngle: (index / 32) * 360,
}));

function PlanetaIconMind({ universo }: { universo: Universo }) {
  const nodeMap = new Map(
    ICONMIND_COGNITIVE_NODES.map((node) => [node.id, node]),
  );

  return (
    <motion.div
      className="relative h-[250px] w-[250px] shrink-0 md:h-[450px] md:w-[450px]"
      style={{ perspective: 900 }}
      initial={{ opacity: 0, y: 100, rotate: -45, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      transition={{ type: "spring", bounce: 0.3 }}
      aria-hidden
    >
      {ICONMIND_ORBIT_PARTICLES.map((particle) => (
        <motion.div
          key={`orbit-${particle.id}`}
          className="pointer-events-none absolute top-1/2 left-1/2 h-0"
          style={{
            width: `${particle.armWidth}%`,
            marginLeft: `-${particle.armWidth / 2}%`,
            transformOrigin: "center center",
          }}
          initial={{ rotate: particle.startAngle }}
          animate={{ rotate: particle.startAngle + 360 }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
          }}
        >
          <div
            className="absolute top-0 right-0 rounded-full bg-[#7E98C8]"
            style={{
              width: particle.size,
              height: particle.size,
              transform: "translate(50%, -50%)",
              opacity: 0.55,
              boxShadow: "0 0 8px rgba(126,152,200,0.7)",
            }}
          />
        </motion.div>
      ))}

      <motion.div
        className="pointer-events-none absolute inset-[-2%] rounded-full"
        style={{
          border: "1px solid rgba(126,152,200,0.28)",
          boxShadow:
            "0 0 18px rgba(126,152,200,0.18), inset 0 0 12px rgba(126,152,200,0.08)",
          transform: "rotateX(68deg)",
        }}
        animate={{ rotateZ: 360 }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="pointer-events-none absolute inset-[-6%] rounded-full"
        style={{
          border: "1px dashed rgba(126,152,200,0.18)",
          transform: "rotateX(72deg) rotateZ(28deg)",
        }}
        animate={{ rotateZ: 388 }}
        transition={{ duration: 58, repeat: Infinity, ease: "linear" }}
      />

      <div
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${ICONMIND_PALETTE.highlight}, ${ICONMIND_PALETTE.midtone} 52%, ${ICONMIND_PALETTE.shadow} 78%, ${ICONMIND_PALETTE.deepShadow})`,
          boxShadow: `0 0 80px ${accentWithAlpha(ICONMIND_PALETTE.halo)}, inset -30px -30px 60px rgba(0,0,0,0.8)`,
        }}
      >
        <motion.div
          className="pointer-events-none absolute inset-[-18%] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{
            background: `${ICONMIND_LUNAR_TEXTURE}, ${ICONMIND_NEURAL_TEXTURE}`,
            opacity: 0.72,
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background: ICONMIND_LUNAR_TEXTURE,
            opacity: 0.38,
            mixBlendMode: "soft-light",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background: ICONMIND_NEURAL_TEXTURE,
            opacity: 0.42,
            mixBlendMode: "screen",
          }}
        />

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          aria-hidden
        >
          <path
            d="M18 34 C 32 22, 48 18, 62 26 S 78 44, 70 58 S 48 72, 32 64 S 14 48, 18 34"
            fill="none"
            stroke={ICONMIND_PALETTE.highlight}
            strokeOpacity={0.12}
            strokeWidth={0.6}
          />
          <path
            d="M28 48 C 40 38, 56 36, 68 44 S 74 58, 62 68 S 42 74, 30 62"
            fill="none"
            stroke={ICONMIND_PALETTE.midtone}
            strokeOpacity={0.1}
            strokeWidth={0.5}
          />

          {ICONMIND_NODE_CONNECTIONS.map(([fromId, toId]) => {
            const from = nodeMap.get(fromId);
            const to = nodeMap.get(toId);
            if (!from || !to) return null;

            return (
              <line
                key={`${fromId}-${toId}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={ICONMIND_PALETTE.highlight}
                strokeOpacity={0.25}
                strokeWidth={1}
              />
            );
          })}
        </svg>

        {ICONMIND_COGNITIVE_NODES.map((node) => (
          <motion.div
            key={node.id}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: node.size,
              height: node.size,
              backgroundColor: ICONMIND_PALETTE.highlight,
              boxShadow: `0 0 ${node.size * 1.5}px rgba(126,152,200,0.9), 0 0 ${node.size * 3}px rgba(126,152,200,0.45)`,
            }}
            animate={{
              scale: [1, 1.18, 1],
              opacity: [0.55, 1, 0.55],
            }}
            transition={{
              duration: node.duration,
              repeat: Infinity,
              delay: node.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 70% 70%, transparent 20%, #000 120%)",
            opacity: 0.2,
          }}
        />
        <div className="pointer-events-none absolute top-[20%] left-[20%] h-16 w-16 rounded-full bg-white/10 blur-md" />
      </div>
    </motion.div>
  );
}

function PlanetaAtmosphericGlow({ universo }: { universo: Universo }) {
  return (
    <motion.div
      key={universo.id}
      aria-hidden
      className="pointer-events-none absolute top-1/2 left-1/2 z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] md:h-[600px] md:w-[600px]"
      style={{ backgroundColor: universo.accentColor }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 0.4, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
    />
  );
}

function PlanetaCrossfade({ activeIndex }: { activeIndex: number }) {
  const [shownIndex, setShownIndex] = useState(activeIndex);
  const [visible, setVisible] = useState(true);
  const pendingIndexRef = useRef<number | null>(null);
  const isFadingOutRef = useRef(false);

  useEffect(() => {
    if (activeIndex === shownIndex) return;

    pendingIndexRef.current = activeIndex;
    isFadingOutRef.current = true;
    setVisible(false);
  }, [activeIndex, shownIndex]);

  const handleAnimationComplete = () => {
    if (!isFadingOutRef.current || pendingIndexRef.current === null) return;

    isFadingOutRef.current = false;
    setShownIndex(pendingIndexRef.current);
    pendingIndexRef.current = null;
    setVisible(true);
  };

  const universo = universos[shownIndex];

  return (
    <motion.div
      className="relative z-[2] mx-auto flex h-[250px] w-[250px] shrink-0 items-center justify-center md:pointer-events-none md:absolute md:inset-0 md:z-[2] md:h-auto md:w-auto md:items-center md:justify-center"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: CROSSFADE_MS, ease: "easeInOut" }}
      onAnimationComplete={handleAnimationComplete}
    >
      <AnimatePresence mode="wait">
        <PlanetaAtmosphericGlow key={`glow-${universo.id}`} universo={universo} />
      </AnimatePresence>
      <div className="relative z-20 flex items-center justify-center">
        {universo.id === "iconmind" ? (
          <PlanetaIconMind key={universo.id} universo={universo} />
        ) : (
          <PlanetaCSS key={universo.id} universo={universo} />
        )}
      </div>
    </motion.div>
  );
}

function GiantBackgroundText({ activeIndex }: { activeIndex: number }) {
  const universo = universos[activeIndex];

  return (
    <>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[-10px] z-[1] overflow-hidden md:hidden"
        aria-hidden
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={`${universo.id}-mobile`}
            className="w-full select-none font-black leading-none text-white mix-blend-overlay text-[clamp(48px,18vw,72px)]"
            initial={{ opacity: 0, y: 150, scale: 0.8 }}
            animate={{ opacity: 0.15, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -150, scale: 1.2 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
          >
            {universo.textoFundo}
          </motion.p>
        </AnimatePresence>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden items-center justify-center md:flex"
        aria-hidden
      >
        <div className="flex select-none items-center justify-center font-black leading-none text-white mix-blend-overlay opacity-[0.12] md:text-[22vw]">
          <span>IC</span>
          <span
            className="shrink-0"
            style={{ width: DESKTOP_PLANET_TEXT_GAP_PX }}
            aria-hidden
          />
          <span>N</span>
        </div>
      </div>
    </>
  );
}

function DesktopVerticalDots({
  activeIndex,
  onDotClick,
}: {
  activeIndex: number;
  onDotClick: (index: number) => void;
}) {
  const activeAccent = universos[activeIndex].accentColor;

  return (
    <div className="absolute top-1/2 right-8 z-40 hidden -translate-y-1/2 flex-col gap-4 md:flex">
      {universos.map((item, index) => (
        <button
          key={item.id}
          type="button"
          aria-label={`Ir para ${item.nome}`}
          aria-current={index === activeIndex ? "true" : undefined}
          onClick={() => onDotClick(index)}
          className="transition-all duration-300"
          style={
            index === activeIndex
              ? {
                  height: 40,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: activeAccent,
                }
              : {
                  height: 12,
                  width: 12,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.1)",
                }
          }
        />
      ))}
    </div>
  );
}

function UniversosContent({
  universo,
  activeIndex,
  onDotClick,
}: {
  universo: Universo;
  activeIndex: number;
  onDotClick: (index: number) => void;
}) {
  return (
    <div className="relative z-[3] flex h-full w-full flex-col justify-start md:relative md:h-full">
      <div className="flex w-full flex-col justify-start px-6 pb-10 md:absolute md:top-1/2 md:left-12 md:max-w-[320px] md:-translate-y-1/2">
        <p className="text-xs tracking-[0.2em] text-white/60 md:text-base md:tracking-[0.3em]">
          {universo.numero}
        </p>
        <h3 className="mt-2 text-3xl font-black tracking-tight text-white md:text-8xl">
          {universo.nome}
        </h3>
        <p className="mt-2 text-[11px] tracking-[0.25em] text-white/70 md:mt-3 md:text-base">
          {universo.tagline}
        </p>
        <p className="mt-3 max-w-sm text-sm leading-[1.6] text-white/60 md:mt-4 md:max-w-md md:text-lg md:leading-[1.7]">
          {universo.descricao}
        </p>

        <div className="mt-6 flex items-center gap-2 md:mt-8 md:hidden">
          {universos.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Ir para ${item.nome}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => onDotClick(index)}
              className="transition-all duration-300"
              style={
                index === activeIndex
                  ? {
                      width: 28,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: "rgba(255,255,255,0.85)",
                    }
                  : {
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.25)",
                    }
              }
            />
          ))}
        </div>

        <Link
          href="/cadastro"
          className="mt-6 inline-flex w-fit shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,0.35)] bg-transparent px-8 py-[14px] text-[14px] tracking-[0.08em] text-[rgba(255,255,255,0.90)] transition-[background-color,transform] hover:bg-white/5 active:translate-y-px md:hidden"
        >
          Explorar {universo.nome}
        </Link>
      </div>
    </div>
  );
}

function ContentCrossfade({
  activeIndex,
  onDotClick,
}: {
  activeIndex: number;
  onDotClick: (index: number) => void;
}) {
  const [layers, setLayers] = useState<{ current: number; previous: number | null }>({
    current: activeIndex,
    previous: null,
  });

  useEffect(() => {
    setLayers((state) => {
      if (activeIndex === state.current) return state;
      return { current: activeIndex, previous: state.current };
    });
  }, [activeIndex]);

  const clearPrevious = (index: number) => {
    setLayers((state) =>
      state.previous === index ? { ...state, previous: null } : state,
    );
  };

  const { current, previous } = layers;

  return (
    <div className="relative w-full flex-1 md:absolute md:inset-0 md:h-full">
      {previous !== null ? (
        <motion.div
          className="absolute inset-0 h-full w-full"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: CROSSFADE_MS, ease: "easeInOut" }}
          onAnimationComplete={() => clearPrevious(previous)}
        >
          <UniversosContent
            universo={universos[previous]}
            activeIndex={previous}
            onDotClick={onDotClick}
          />
        </motion.div>
      ) : null}

      <motion.div
        className="absolute inset-0 h-full w-full"
        initial={previous !== null ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: CROSSFADE_MS, ease: "easeInOut" }}
      >
        <UniversosContent
          universo={universos[current]}
          activeIndex={current}
          onDotClick={onDotClick}
        />
      </motion.div>
    </div>
  );
}

function AtmosphericOverlay({ activeIndex }: { activeIndex: number }) {
  const atmosphere = universos[activeIndex].atmosphere;

  if (!atmosphere) return null;

  return (
    <motion.div
      key={activeIndex}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ background: atmosphere }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    />
  );
}

function StickyPanel({
  activeIndex,
  onDotClick,
}: {
  activeIndex: number;
  onDotClick: (index: number) => void;
}) {
  return (
    <div className="sticky top-0 h-[100dvh] w-full">
      <div className="relative flex h-full w-full flex-col justify-start pt-20 md:block md:pt-0">
        <motion.div
          aria-hidden
          className="absolute inset-0 h-full w-full"
          animate={{ backgroundColor: universos[activeIndex].bgColor }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-20"
          style={{
            height: "280px",
            background:
              "linear-gradient(to bottom, #08091A 0%, #08091A 30%, transparent 100%)",
          }}
        />

        <AtmosphericOverlay activeIndex={activeIndex} />
        <NeuralBackground activeIndex={activeIndex} />
        <GiantBackgroundText activeIndex={activeIndex} />
        <PlanetaCrossfade activeIndex={activeIndex} />
        <DesktopVerticalDots activeIndex={activeIndex} onDotClick={onDotClick} />
        <ContentCrossfade activeIndex={activeIndex} onDotClick={onDotClick} />
      </div>
    </div>
  );
}

export function UniversosStickyScroll() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveIndex(getActiveIndex(latest));
  });

  const scrollToUniverse = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const segmentHeight = container.offsetHeight / universos.length;
    const target =
      container.offsetTop + segmentHeight * index + segmentHeight * 0.5;

    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      id="universos"
      ref={containerRef}
      className="relative z-30 m-0 mt-0 w-full overflow-x-clip overflow-y-visible bg-[#08091A] p-0 pt-0"
      style={{ height: "600vh", marginTop: 0, paddingTop: 0 }}
      aria-label="Universos ICONZA"
    >
      <StickyPanel
        activeIndex={activeIndex}
        onDotClick={scrollToUniverse}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
        style={{
          height: "180px",
          background:
            "linear-gradient(to bottom, transparent 0%, #08091A 100%)",
        }}
      />
    </section>
  );
}
