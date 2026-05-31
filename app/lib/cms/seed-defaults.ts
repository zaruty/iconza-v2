import type {
  ComunidadeSectionProps,
  EventosSectionProps,
  HeroSectionProps,
  HomeSectionRow,
  HomeSectionType,
  SectionPropsMap,
  UniversosSectionProps,
  VisualThemeRow,
} from "./types";

export const DEFAULT_HERO_PROPS: HeroSectionProps = {
  title_line1: "Universos",
  title_line2: "para mentes",
  title_highlight: "criativas",
  subtitle:
    "Explore experiências visuais e universos temáticos que desenvolvem criatividade, emoção e inteligência estratégica.",
  cta_text: "Explorar universos",
  cta_url: "/cadastro",
  background_media_id: null,
  featured_video_id: null,
};

export const DEFAULT_EVENTOS_PROPS: EventosSectionProps = {
  eyebrow: "Eventos",
  title: "Próximos encontros",
  subtitle: "Workshops, lives e experiências ao vivo.",
  items: [],
};

export const DEFAULT_COMUNIDADE_PROPS: ComunidadeSectionProps = {
  eyebrow: "Comunidade",
  title: "Criadoras em movimento",
  subtitle:
    "Histórias, destaques e conquistas da comunidade ICONZA.",
  highlights: [],
  featured_video_id: null,
};

export const DEFAULT_UNIVERSOS_PROPS: UniversosSectionProps = {
  eyebrow: "Universos",
  title: "Cinco mundos para explorar",
  subtitle:
    "Cada universo ICONZA é um caminho de aprendizado focado em um domínio criativo diferente.",
  cards: [
    {
      name: "ICONMIND",
      tagline: "Pensamento visual",
      description:
        "Transforme ideias complexas em ícones claros. Aprenda a sintetizar conceitos com IA.",
      accent: "from-iconza-lilac/20 to-transparent",
    },
    {
      name: "ICONLOVE",
      tagline: "Emoção e conexão",
      description:
        "Crie símbolos que comunicam afeto, empatia e relações humanas de forma única.",
      accent: "from-iconza-pink/10 to-transparent",
    },
    {
      name: "ICONETNIA",
      tagline: "Cultura e identidade",
      description:
        "Explore tradições, diversidade e narrativas visuais de diferentes povos e origens.",
      accent: "from-iconza-lavender/15 to-transparent",
    },
    {
      name: "ICONFOOD",
      tagline: "Sabores em ícone",
      description:
        "Represente gastronomia, ingredientes e experiências culinárias com precisão visual.",
      accent: "from-iconza-lilac/15 to-transparent",
    },
    {
      name: "ICONART",
      tagline: "Arte e expressão",
      description:
        "Mergulhe na estética, composição e linguagem artística aplicada ao design de ícones.",
      accent: "from-iconza-lavender/20 to-transparent",
    },
  ],
};

const DEFAULT_PROPS: SectionPropsMap = {
  hero: DEFAULT_HERO_PROPS,
  eventos: DEFAULT_EVENTOS_PROPS,
  comunidade: DEFAULT_COMUNIDADE_PROPS,
  universos: DEFAULT_UNIVERSOS_PROPS,
};

const SECTION_ORDER: HomeSectionType[] = [
  "hero",
  "eventos",
  "comunidade",
  "universos",
];

export function buildDefaultHomeSections(): HomeSectionRow[] {
  return SECTION_ORDER.map((type, index) => ({
    id: `default-${type}`,
    type,
    order_index: index,
    visible: type === "hero" || type === "universos",
    props_json: DEFAULT_PROPS[type],
    schema_version: 1,
    updated_at: new Date().toISOString(),
    updated_by: null,
  }));
}

export const DEFAULT_VISUAL_THEME: VisualThemeRow = {
  id: "default-theme",
  name: "Editorial",
  primary_color: "#B39DFF",
  secondary_color: "#7B88FF",
  glow_color: "#A9D6FF",
  accent_color: "#E8B4FF",
  background_color: "#0A0612",
  glass_color: "rgba(255,255,255,0.06)",
  border_glow_color: "rgba(169,214,255,0.25)",
  background_type: "aurora",
  particle_density: "medium",
  font_mode: "editorial",
  is_active: true,
  scheduled_at: null,
  expires_at: null,
  created_at: new Date().toISOString(),
};
