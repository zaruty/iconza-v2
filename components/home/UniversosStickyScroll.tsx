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

const BG_SCROLL_PROGRESS = [0, 0.2, 0.4, 0.6, 0.8, 1.0] as const;

const BG_SCROLL_COLORS: string[] = [
  "#08091A",
  ...universos.map((u) => u.bgColor),
];

const CROSSFADE_MS = 0.4;

const DESKTOP_PLANET_TEXT_GAP_PX = 450;

function accentWithAlpha(hex: string, alpha = "60") {
  return `${hex}${alpha}`;
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
        <PlanetaCSS key={universo.id} universo={universo} />
      </div>
    </motion.div>
  );
}

function GiantBackgroundText({ activeIndex }: { activeIndex: number }) {
  const universo = universos[activeIndex];

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-[-10px] z-[1] overflow-hidden md:bottom-[-30px]"
      aria-hidden
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={`${universo.id}-mobile`}
          className="w-full select-none font-black leading-none text-white mix-blend-overlay text-[clamp(48px,18vw,72px)] md:hidden"
          initial={{ opacity: 0, y: 150, scale: 0.8 }}
          animate={{ opacity: 0.15, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -150, scale: 1.2 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
        >
          {universo.textoFundo}
        </motion.p>

        <motion.div
          key={`${universo.id}-desktop`}
          className="hidden w-full select-none items-center justify-center font-black leading-none text-white mix-blend-overlay md:flex md:text-[32vw]"
          initial={{ opacity: 0, y: 150, scale: 0.8 }}
          animate={{ opacity: 0.15, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -150, scale: 1.2 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
        >
          <span>IC</span>
          <span
            className="shrink-0"
            style={{ width: DESKTOP_PLANET_TEXT_GAP_PX }}
            aria-hidden
          />
          <span>N</span>
          <span>{universo.textoFundo}</span>
        </motion.div>
      </AnimatePresence>
    </div>
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
    <div className="relative z-[3] flex h-full w-full flex-col justify-start md:flex-row md:items-center md:justify-center md:pt-[calc(4.5rem+env(safe-area-inset-top,0px))]">
      <div className="flex w-full flex-col justify-start px-6 pb-10 md:min-h-0 md:w-[55%] md:max-w-[55%] md:justify-end md:px-12 md:pb-14">
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

      <div
        className="hidden min-h-0 w-full flex-col justify-between self-end px-6 py-10 sm:px-8 md:flex md:w-[45%] md:max-w-[45%] md:px-10 md:py-14"
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
  panelBackground,
  onDotClick,
}: {
  activeIndex: number;
  panelBackground: MotionValue<string>;
  onDotClick: (index: number) => void;
}) {
  return (
    <div className="sticky top-0 h-[100dvh] w-full">
      <div className="relative flex h-full w-full flex-col justify-start pt-20 md:block md:pt-0">
        <motion.div
          aria-hidden
          className="absolute inset-0 h-full w-full transition-[background-color] duration-[800ms] ease-in-out"
          style={{ backgroundColor: panelBackground }}
        />

        <AtmosphericOverlay activeIndex={activeIndex} />
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
      className="relative z-30 m-0 mt-0 w-full overflow-x-clip overflow-y-visible bg-[#08091A] p-0 pt-0"
      style={{ height: "1000vh", marginTop: 0, paddingTop: 0 }}
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
