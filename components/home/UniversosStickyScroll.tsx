"use client";

import Link from "next/link";
import {
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

type Universo = {
  id: string;
  numero: string;
  nome: string;
  tagline: string;
  descricao: string;
  bgColor: string;
  accentColor: string;
  atmosphere?: string;
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
    bgColor: "#1A2E5C",
    accentColor: "#6B8FC7",
    imagem: "/images/universos/iconmind-hero.png",
    icone: "Brain",
    recursos: ["Mapa de ideias", "Guia estratégico", "Radar de insights"],
  },
  {
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
    imagem: null,
    icone: "Globe",
    recursos: ["Mapa cultural", "Guia de identidade", "Radar de impacto"],
  },
  {
    id: "iconlove",
    numero: "03",
    nome: "ICONLOVE",
    tagline: "EMOÇÃO CRIA CONEXÃO.",
    descricao:
      "Relações profundas começam com autoconhecimento. Desenvolva inteligência emocional e construa vínculos que transformam.",
    bgColor: "#3D0A20",
    accentColor: "#D4688A",
    atmosphere:
      "radial-gradient(circle at 20% 30%, rgba(180,80,120,0.22), transparent 40%), radial-gradient(circle at 75% 20%, rgba(120,40,70,0.18), transparent 45%)",
    imagem: null,
    icone: "Heart",
    recursos: ["Mapa emocional", "Guia de vínculos", "Radar de autoestima"],
  },
  {
    id: "iconfood",
    numero: "04",
    nome: "ICONFOOD",
    tagline: "SABOR CRIA MEMÓRIA.",
    descricao:
      "Gastronomia é linguagem universal. Transforme experiências culinárias em conteúdo, cultura e comunidade.",
    bgColor: "#3D2800",
    accentColor: "#F5C518",
    atmosphere:
      "radial-gradient(circle at 20% 25%, rgba(245,197,24,0.25), transparent 40%), radial-gradient(circle at 75% 20%, rgba(220,160,10,0.18), transparent 45%), radial-gradient(circle at 50% 70%, rgba(180,120,0,0.20), transparent 50%)",
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
    bgColor: "#2A0F5C",
    accentColor: "#7A5CCF",
    imagem: null,
    icone: "Palette",
    recursos: ["Mapa estético", "Guia de linguagem visual", "Radar criativo"],
  },
];

const BG_SCROLL_PROGRESS = [0, 0.2, 0.4, 0.6, 0.8, 1.0] as const;

const BG_SCROLL_COLORS: string[] = [
  "#08091A",
  ...universos.map((u) => u.bgColor),
];

const CROSSFADE_MS = 0.4;

function accentGlowColor(hex: string, alpha = 0.35) {
  const normalized = hex.replace("#", "");
  const a = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${normalized}${a}`;
}

function accentGlowGradient(hex: string) {
  return `radial-gradient(circle, ${accentGlowColor(hex, 0.25)} 0%, ${accentGlowColor(hex, 0.1)} 40%, transparent 70%)`;
}

function accentGlowGradientOuter(hex: string) {
  return `radial-gradient(circle, ${accentGlowColor(hex, 0.08)} 0%, transparent 60%)`;
}

function getActiveIndex(progress: number) {
  return Math.min(4, Math.max(0, Math.floor(progress * 5)));
}

const ICON_WHITE = "rgba(255, 255, 255, 0.90)";

function UniversoIcon({
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
        width={280}
        height={280}
        className="pointer-events-none relative z-[1] h-[280px] w-[280px] object-contain"
        onError={onImageError}
      />
    );
  }

  return (
    <Icon
      size={280}
      strokeWidth={1}
      color={ICON_WHITE}
      className="pointer-events-none relative z-[1]"
      style={{ color: ICON_WHITE, stroke: ICON_WHITE }}
      aria-hidden
    />
  );
}

function IconWithGlow({
  universo,
  imageFailed,
  onImageError,
}: {
  universo: Universo;
  imageFailed: boolean;
  onImageError: () => void;
}) {
  return (
    <div className="relative flex h-[700px] w-[700px] items-center justify-center">
      <div
        aria-hidden
        className="absolute z-0 rounded-full"
        style={{
          width: 700,
          height: 700,
          background: accentGlowGradientOuter(universo.accentColor),
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="absolute z-0 rounded-full"
        style={{
          width: 500,
          height: 500,
          background: accentGlowGradient(universo.accentColor),
          filter: "blur(60px)",
        }}
      />
      <UniversoIcon
        universo={universo}
        imageFailed={imageFailed}
        onImageError={onImageError}
      />
    </div>
  );
}

function IconCrossfade({ activeIndex }: { activeIndex: number }) {
  const [shownIndex, setShownIndex] = useState(activeIndex);
  const [visible, setVisible] = useState(true);
  const [imageFailed, setImageFailed] = useState(false);
  const pendingIndexRef = useRef<number | null>(null);

  useEffect(() => {
    if (activeIndex === shownIndex) return;

    pendingIndexRef.current = activeIndex;
    setVisible(false);
  }, [activeIndex, shownIndex]);

  const handleAnimationComplete = () => {
    if (pendingIndexRef.current === null) return;

    setShownIndex(pendingIndexRef.current);
    pendingIndexRef.current = null;
    setImageFailed(false);
    setVisible(true);
  };

  return (
    <motion.div
      className="pointer-events-none absolute top-1/2 left-1/2 z-[2] -translate-x-1/2 -translate-y-1/2"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: CROSSFADE_MS, ease: "easeInOut" }}
      onAnimationComplete={handleAnimationComplete}
    >
      <IconWithGlow
        universo={universos[shownIndex]}
        imageFailed={imageFailed}
        onImageError={() => setImageFailed(true)}
      />
    </motion.div>
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
    <>
      {/* Layer 2 — texto gigante translúcido */}
      <p
        className="pointer-events-none absolute bottom-[-10px] left-[-10px] z-[1] w-[120%] select-none font-black leading-none text-white/[0.08] mix-blend-soft-light text-[clamp(48px,18vw,72px)] md:bottom-[-30px] md:text-[clamp(100px,14vw,180px)]"
        aria-hidden
      >
        {universo.nome}
      </p>

      {/* Layer 4 — HUD + coluna direita (desktop) */}
      <div className="relative z-[3] flex h-full w-full pt-[calc(4.5rem+env(safe-area-inset-top,0px))] md:flex-row">
        <div className="flex min-h-0 flex-1 flex-col justify-end px-6 pb-10 sm:px-10 sm:pb-14 md:max-w-[55%] md:px-12">
          <p className="text-xs tracking-[0.2em] text-white/60">{universo.numero}</p>
          <h3 className="mt-2 text-3xl font-black tracking-tight text-white md:text-[48px]">
            {universo.nome}
          </h3>
          <p className="mt-2 text-[11px] tracking-[0.25em] text-white/70 md:mt-3">
            {universo.tagline}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-[1.6] text-white/60 md:mt-4 md:leading-[1.7]">
            {universo.descricao}
          </p>

          <div className="mt-6 flex items-center gap-2 md:mt-8">
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

        <div
          className="hidden min-h-0 w-full max-w-md flex-col justify-between self-end px-6 py-10 sm:px-8 md:flex md:w-[40%] md:max-w-none md:px-10 md:py-14"
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="min-h-0 overflow-y-auto">
            <p className="text-[13px] text-white/50">Meu universo</p>
            <p className="mt-2 text-2xl font-light text-white md:text-[32px]">
              {universo.nome}
            </p>

            <p className="mt-6 text-[10px] tracking-[0.2em] text-white/50 md:mt-10">
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
            className="mt-6 inline-flex w-fit shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,0.35)] bg-transparent px-8 py-[14px] text-[14px] tracking-[0.08em] text-[rgba(255,255,255,0.90)] transition-[background-color,transform] hover:bg-white/5 active:translate-y-px md:mt-10"
          >
            Explorar {universo.nome}
          </Link>
        </div>
      </div>
    </>
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
    <div className="absolute inset-0 h-full w-full overflow-visible">
      {previous !== null ? (
        <motion.div
          className="absolute inset-0 h-full w-full overflow-visible"
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
        className="absolute inset-0 h-full w-full overflow-visible"
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
  panelBackground,
  onDotClick,
}: {
  activeIndex: number;
  panelBackground: MotionValue<string>;
  onDotClick: (index: number) => void;
}) {
  return (
    <div className="sticky top-0 h-[100vh] w-full overflow-visible">
      <div className="relative h-full w-full overflow-visible md:overflow-hidden">
        {/* Layer 1 — fundo animado fullscreen */}
        <motion.div
          aria-hidden
          className="absolute inset-0 h-full w-full transition-[background-color] duration-[800ms] ease-in-out"
          style={{ backgroundColor: panelBackground }}
        />

        <AtmosphericOverlay activeIndex={activeIndex} />

        <ContentCrossfade activeIndex={activeIndex} onDotClick={onDotClick} />
        <IconCrossfade activeIndex={activeIndex} />
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

  const panelBackground = useTransform(
    scrollYProgress,
    [...BG_SCROLL_PROGRESS],
    BG_SCROLL_COLORS,
  );

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
      className="relative z-30 m-0 mt-0 bg-[#08091A] p-0 pt-0"
      style={{ height: "600vh", marginTop: 0, paddingTop: 0 }}
      aria-label="Universos ICONZA"
    >
      <StickyPanel
        activeIndex={activeIndex}
        panelBackground={panelBackground}
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
