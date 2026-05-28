"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Brain,
  Globe,
  Heart,
  Palette,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { useRef, useState } from "react";

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
    bgCenter: "#6B1535",
    bgMid: "#3D0A1E",
    bgEdge: "#1A0510",
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
    bgCenter: "#0F4A2A",
    bgMid: "#072B18",
    bgEdge: "#03120A",
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
    bgCenter: "#6B2A08",
    bgMid: "#3D1504",
    bgEdge: "#1A0902",
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

function getActiveIndex(progress: number) {
  return Math.min(4, Math.max(0, Math.floor(progress * 5)));
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
      className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 md:flex md:right-8"
      aria-hidden
    >
      <div
        className="rounded-full p-[60px]"
        style={{
          background: `radial-gradient(circle, ${universo.accentColor}26 0%, transparent 70%)`,
        }}
      >
        <Icon
          size={200}
          strokeWidth={1.1}
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
      className="flex h-full w-full flex-col md:flex-row"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
      transition={{ duration: 0.4 }}
    >
      {/* Coluna esquerda */}
      <div
        className="relative flex min-h-[420px] flex-1 flex-col justify-between overflow-visible p-8 pb-10 md:min-h-0 md:w-[55%] md:rounded-l-[24px] md:p-10 md:pb-12"
        style={{
          background: `radial-gradient(ellipse at 60% 40%, ${universo.bgCenter} 0%, ${universo.bgMid} 45%, ${universo.bgEdge} 100%)`,
        }}
      >
        <UniversoVisual
          universo={universo}
          imageFailed={imageFailed}
          onImageError={() => setImageFailed(true)}
        />

        <div className="relative z-20 max-w-md">
          <p
            className="text-xs tracking-[0.2em]"
            style={{ color: universo.accentColor }}
          >
            {universo.numero}
          </p>
          <h3 className="mt-2 text-4xl font-black tracking-tight text-white md:text-[48px]">
            {universo.nome}
          </h3>
          <p
            className="mt-3 text-[11px] tracking-[0.25em]"
            style={{ color: universo.accentColor }}
          >
            {universo.tagline}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-[1.7] text-white/60">
            {universo.descricao}
          </p>
        </div>

        {/* Ícone mobile */}
        <div className="relative z-20 my-6 flex justify-center md:hidden">
          <div
            className="rounded-full p-10"
            style={{
              background: `radial-gradient(circle, ${universo.accentColor}26 0%, transparent 70%)`,
            }}
          >
            {(() => {
              const Icon = ICON_MAP[universo.icone];
              return (
                <Icon
                  size={120}
                  strokeWidth={1.1}
                  style={{ color: universo.accentColor }}
                />
              );
            })()}
          </div>
        </div>

        <div className="relative z-20 flex items-center gap-2">
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
          className="pointer-events-none absolute bottom-[-20px] left-[-10px] z-0 w-[200%] select-none font-black leading-none text-white/[0.07] mix-blend-overlay max-md:text-[clamp(48px,18vw,80px)] md:text-[clamp(80px,12vw,140px)]"
          aria-hidden
        >
          {universo.nome}
        </p>
      </div>

      {/* Coluna direita */}
      <div className="flex flex-col justify-between border-t border-white/30 bg-white/55 p-8 backdrop-blur-[20px] md:w-[45%] md:border-l md:border-t-0 md:px-10 md:py-12">
        <div>
          <p className="text-[13px] text-black/45">Meu universo</p>
          <p className="mt-2 text-[32px] font-light text-black/80">
            {universo.nome}
          </p>

          <p className="mt-10 text-[10px] tracking-[0.2em] text-black/35">
            RECURSOS
          </p>
          <ul className="mt-4">
            {universo.recursos.map((recurso, index) => (
              <li key={recurso}>
                {index > 0 ? (
                  <div className="my-3 h-px bg-black/[0.06]" aria-hidden />
                ) : null}
                <span className="text-sm text-black/70">{recurso}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/cadastro"
          className="mt-8 inline-flex w-fit items-center justify-center rounded-full px-8 py-3.5 text-sm tracking-wide text-[#F3F3F5] transition-[filter,transform] hover:brightness-105 active:translate-y-px md:mt-10"
          style={{
            background:
              "linear-gradient(180deg, #5B53C7 0%, #3B338F 48%, #211A59 100%)",
          }}
        >
          Explorar {universo.nome}
        </Link>
      </div>
    </motion.div>
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
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    universos.map((u) => u.bgMid).concat(universos[4].bgMid),
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

  const activeUniverso = universos[activeIndex];

  return (
    <section
      id="universos"
      ref={containerRef}
      className="relative scroll-mt-20 sm:scroll-mt-24"
      style={{ height: "600vh" }}
      aria-label="Universos ICONZA"
    >
      <motion.div
        className="sticky top-0 flex h-screen items-center px-4 py-6 sm:px-6"
        style={{ backgroundColor: panelBackground }}
      >
        <div className="mx-auto h-[min(720px,calc(100vh-3rem))] w-full max-w-6xl overflow-hidden rounded-[24px] shadow-2xl shadow-black/40 md:h-[min(640px,calc(100vh-4rem))]">
          <AnimatePresence mode="wait">
            <UniversoPanel
              key={activeUniverso.id}
              universo={activeUniverso}
              activeIndex={activeIndex}
              onDotClick={scrollToUniverse}
            />
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
