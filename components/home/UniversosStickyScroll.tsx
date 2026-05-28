"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Brain,
  Globe,
  Heart,
  Palette,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ICON_MAP = {
  Brain,
  Heart,
  Globe,
  UtensilsCrossed,
  Palette,
} as const satisfies Record<string, LucideIcon>;

type IconName = keyof typeof ICON_MAP;

type PanelPin = "relative" | "fixed" | "bottom";

type Universo = {
  id: string;
  numero: string;
  nome: string;
  tagline: string;
  descricao: string;
  bgCenter: string;
  bgMid: string;
  bgEdge: string;
  accentColor: string;
  imagem: string | null;
  icone: IconName;
  recursos: [string, string, string];
};

const universos: Universo[] = [
  {
    id: "iconmind",
    numero: "01",
    nome: "ICONMIND",
    tagline: "CONHECIMENTO CRIA DIREÇÃO.",
    descricao:
      "Mentes curiosas constroem futuros extraordinários. Explore ideias, desenvolva estratégias e transforme conhecimento em impacto real.",
    bgCenter: "#1B3A6B",
    bgMid: "#0D1F3F",
    bgEdge: "#060D1F",
    accentColor: "#6B8FC7",
    imagem: "/images/universos/iconmind-hero.png",
    icone: "Brain",
    recursos: ["Mapa de ideias", "Guia estratégico", "Radar de insights"],
  },
  {
    id: "iconlove",
    numero: "02",
    nome: "ICONLOVE",
    tagline: "EMOÇÃO CRIA CONEXÃO.",
    descricao:
      "Relações profundas começam com autoconhecimento. Desenvolva inteligência emocional e construa vínculos que transformam.",
    bgCenter: "#8B1A4A",
    bgMid: "#5C0F30",
    bgEdge: "#2D0518",
    accentColor: "#C26D8C",
    imagem: null,
    icone: "Heart",
    recursos: ["Mapa emocional", "Guia de vínculos", "Radar de autoestima"],
  },
  {
    id: "iconetnia",
    numero: "03",
    nome: "ICONETNIA",
    tagline: "IDENTIDADE CRIA PERTENCIMENTO.",
    descricao:
      "Cultura e identidade são suas maiores forças. Explore suas raízes, celebre sua história e amplifique sua voz no mundo.",
    bgCenter: "#1A6B3A",
    bgMid: "#0F4525",
    bgEdge: "#051A0F",
    accentColor: "#4CAF82",
    imagem: null,
    icone: "Globe",
    recursos: ["Mapa cultural", "Guia de identidade", "Radar de impacto"],
  },
  {
    id: "iconfood",
    numero: "04",
    nome: "ICONFOOD",
    tagline: "SABOR CRIA MEMÓRIA.",
    descricao:
      "Gastronomia é linguagem universal. Transforme experiências culinárias em conteúdo, cultura e comunidade.",
    bgCenter: "#8B4A1A",
    bgMid: "#5C2D0F",
    bgEdge: "#2D1205",
    accentColor: "#D97832",
    imagem: null,
    icone: "UtensilsCrossed",
    recursos: [
      "Mapa gastronômico",
      "Guia de experiências",
      "Radar de tendências",
    ],
  },
  {
    id: "iconart",
    numero: "05",
    nome: "ICONART",
    tagline: "EXPRESSÃO CRIA IMPACTO.",
    descricao:
      "Arte é o idioma da alma criativa. Desenvolva seu olhar estético, sua linguagem visual e sua assinatura única.",
    bgCenter: "#3A1565",
    bgMid: "#1F0A3D",
    bgEdge: "#0D041A",
    accentColor: "#7A5CCF",
    imagem: null,
    icone: "Palette",
    recursos: ["Mapa estético", "Guia de linguagem visual", "Radar criativo"],
  },
];

const PANEL_SCROLL_PROGRESS = [
  0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0,
] as const;

const PANEL_SCROLL_COLORS: string[] = [
  "#0D1F3F",
  "#1A1830",
  "#3D0A1E",
  "#2A1520",
  "#072B18",
  "#1A2010",
  "#3D1504",
  "#2A1A10",
  "#1F0A3D",
  "#150828",
  "#0D041A",
];

function getActiveIndex(progress: number) {
  return Math.min(4, Math.max(0, Math.floor(progress * 5)));
}

function getPanelPin(containerTop: number, containerBottom: number) {
  const viewportHeight = window.innerHeight;

  if (containerTop > 0) return "relative" as const;
  if (containerBottom <= viewportHeight) return "bottom" as const;
  return "fixed" as const;
}

function UniversoVisual({
  universo,
  imageFailed,
  onImageError,
}: {
  universo: Universo;
  imageFailed: boolean;
  onImageError: () => void;
}) {
  const Icon = ICON_MAP[universo.icone];

  if (universo.imagem && !imageFailed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={universo.imagem}
        alt=""
        className="pointer-events-none absolute top-[-40px] right-[-60px] z-10 hidden h-[110%] w-auto max-w-none object-contain md:block"
        onError={onImageError}
      />
    );
  }

  return (
    <div
      className="pointer-events-none absolute top-1/2 left-[27.5%] z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block"
      aria-hidden
    >
      <div className="relative flex h-[400px] w-[400px] items-center justify-center">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle, ${universo.accentColor} 0%, transparent 65%)`,
            opacity: 0.35,
          }}
        />
        <Icon
          size={260}
          strokeWidth={1.1}
          className="relative z-10"
          style={{ color: universo.accentColor }}
        />
      </div>
    </div>
  );
}

function UniversoPanel({
  universo,
  activeIndex,
  onDotClick,
}: {
  universo: Universo;
  activeIndex: number;
  onDotClick: (index: number) => void;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.div
      className="relative flex h-full min-h-0 w-full flex-col md:flex-row"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
      transition={{ duration: 0.4 }}
    >
      <UniversoVisual
        universo={universo}
        imageFailed={imageFailed}
        onImageError={() => setImageFailed(true)}
      />

      {/* Coluna esquerda — 55%, sem card (fundo = painel) */}
      <div className="relative flex h-full min-h-0 flex-none flex-col justify-between overflow-hidden p-5 pb-6 md:w-[55%] md:max-w-[55%] md:overflow-visible md:p-10 md:pb-12">
        <div className="relative z-20 max-w-md shrink-0">
          <p
            className="text-xs tracking-[0.2em]"
            style={{ color: universo.accentColor }}
          >
            {universo.numero}
          </p>
          <h3 className="mt-2 text-3xl font-black tracking-tight text-white md:text-[48px]">
            {universo.nome}
          </h3>
          <p
            className="mt-2 text-[11px] tracking-[0.25em] md:mt-3"
            style={{ color: universo.accentColor }}
          >
            {universo.tagline}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-[1.6] text-white/60 md:mt-4 md:leading-[1.7]">
            {universo.descricao}
          </p>
        </div>

        <div className="relative z-20 mt-4 flex shrink-0 items-center gap-2 md:mt-0">
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
                      backgroundColor: universo.accentColor,
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

        <p
          className="pointer-events-none absolute bottom-[-20px] left-[-10px] z-0 hidden w-[200%] select-none font-black leading-none text-white/[0.07] mix-blend-overlay md:block md:text-[clamp(80px,12vw,140px)]"
          aria-hidden
        >
          {universo.nome}
        </p>
      </div>

      {/* Coluna direita — 45%, quase invisível */}
      <div
        className="flex min-h-0 flex-1 flex-col justify-between overflow-hidden p-5 md:h-full md:w-[45%] md:max-w-[45%] md:flex-none md:px-10 md:py-12"
        style={{
          background: "rgba(0, 0, 0, 0.12)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="min-h-0 overflow-y-auto">
          <p className="text-[13px] text-white/40">Meu universo</p>
          <p className="mt-2 text-2xl font-light text-white/90 md:text-[32px]">
            {universo.nome}
          </p>

          <p className="mt-6 text-[10px] tracking-[0.2em] text-white/40 md:mt-10">
            RECURSOS
          </p>
          <ul className="mt-3 flex flex-col gap-3 md:mt-4 md:gap-4">
            {universo.recursos.map((recurso) => (
              <li key={recurso}>
                <span className="text-sm text-white/90">{recurso}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/cadastro"
          className="mt-4 inline-flex w-fit shrink-0 items-center justify-center rounded-full border border-white/30 bg-transparent px-8 py-3.5 text-sm tracking-wide text-white/90 transition-[background-color,transform] hover:bg-white/5 active:translate-y-px md:mt-10"
        >
          Explorar {universo.nome}
        </Link>
      </div>
    </motion.div>
  );
}

function UniversosPanel({
  activeUniverso,
  activeIndex,
  panelBackground,
  onDotClick,
  pin,
}: {
  activeUniverso: Universo;
  activeIndex: number;
  panelBackground: MotionValue<string>;
  onDotClick: (index: number) => void;
  pin: PanelPin;
}) {
  const pinClassName =
    pin === "fixed"
      ? "fixed inset-x-0 top-0 z-40"
      : pin === "bottom"
        ? "absolute inset-x-0 bottom-0 z-10"
        : "relative z-10";

  return (
    <div className={`h-svh w-full ${pinClassName}`}>
      <div className="flex h-full min-h-0 w-full flex-col px-10 pb-6 pt-[calc(4.5rem+env(safe-area-inset-top,0px))] sm:pb-8">
        <motion.div
          className="h-full min-h-0 w-full overflow-hidden rounded-[24px] shadow-2xl shadow-black/40"
          style={{ backgroundColor: panelBackground }}
        >
          <AnimatePresence mode="wait">
            <UniversoPanel
              key={activeUniverso.id}
              universo={activeUniverso}
              activeIndex={activeIndex}
              onDotClick={onDotClick}
            />
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export function UniversosStickyScroll() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [panelPin, setPanelPin] = useState<PanelPin>("relative");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const panelBackground = useTransform(
    scrollYProgress,
    [...PANEL_SCROLL_PROGRESS],
    PANEL_SCROLL_COLORS,
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveIndex(getActiveIndex(latest));
  });

  useEffect(() => {
    const updatePanelPin = () => {
      const container = containerRef.current;
      if (!container) return;

      const { top, bottom } = container.getBoundingClientRect();
      setPanelPin(getPanelPin(top, bottom));
    };

    updatePanelPin();
    window.addEventListener("scroll", updatePanelPin, { passive: true });
    window.addEventListener("resize", updatePanelPin);

    return () => {
      window.removeEventListener("scroll", updatePanelPin);
      window.removeEventListener("resize", updatePanelPin);
    };
  }, []);

  const scrollToUniverse = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const segmentHeight = container.offsetHeight / universos.length;
    const target =
      container.offsetTop + segmentHeight * index + segmentHeight * 0.5;

    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const activeUniverso = universos[activeIndex];

  return (
    <section
      id="universos"
      ref={containerRef}
      className="relative z-30 scroll-mt-20 sm:scroll-mt-24"
      style={{ height: "600vh" }}
      aria-label="Universos ICONZA"
    >
      <UniversosPanel
        activeUniverso={activeUniverso}
        activeIndex={activeIndex}
        panelBackground={panelBackground}
        onDotClick={scrollToUniverse}
        pin={panelPin}
      />
    </section>
  );
}
