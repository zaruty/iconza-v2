import {
  CURRENT_SECTION_SCHEMA_VERSION,
  type ComunidadeSectionProps,
  type EventosSectionProps,
  type HeroSectionProps,
  type HomeSectionType,
  type SectionPropsMap,
  type UniversosSectionProps,
} from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(obj: Record<string, unknown>, key: string, fallback = ""): string {
  const value = obj[key];
  return typeof value === "string" ? value : fallback;
}

function readNullableString(
  obj: Record<string, unknown>,
  key: string,
): string | null {
  const value = obj[key];
  if (value === null) return null;
  return typeof value === "string" ? value : null;
}

function parseHeroProps(raw: unknown): HeroSectionProps {
  const obj = isRecord(raw) ? raw : {};
  return {
    title_line1: readString(obj, "title_line1", "Universos"),
    title_line2: readString(obj, "title_line2", "para mentes"),
    title_highlight: readString(obj, "title_highlight", "criativas"),
    subtitle: readString(obj, "subtitle"),
    cta_text: readString(obj, "cta_text", "Explorar universos"),
    cta_url: readString(obj, "cta_url", "/cadastro"),
    background_media_id: readNullableString(obj, "background_media_id"),
    featured_video_id: readNullableString(obj, "featured_video_id"),
  };
}

function parseEventosProps(raw: unknown): EventosSectionProps {
  const obj = isRecord(raw) ? raw : {};
  const itemsRaw = Array.isArray(obj.items) ? obj.items : [];

  return {
    eyebrow: readString(obj, "eyebrow", "Eventos"),
    title: readString(obj, "title", "Próximos encontros"),
    subtitle: readString(obj, "subtitle"),
    items: itemsRaw
      .filter(isRecord)
      .map((item, index) => ({
        id: readString(item, "id", `evento-${index}`),
        title: readString(item, "title"),
        date: readString(item, "date"),
        description: readString(item, "description"),
        media_id: readNullableString(item, "media_id"),
        cta_url: readNullableString(item, "cta_url"),
      })),
  };
}

function parseComunidadeProps(raw: unknown): ComunidadeSectionProps {
  const obj = isRecord(raw) ? raw : {};
  const highlightsRaw = Array.isArray(obj.highlights) ? obj.highlights : [];

  return {
    eyebrow: readString(obj, "eyebrow", "Comunidade"),
    title: readString(obj, "title", "Criadoras em movimento"),
    subtitle: readString(obj, "subtitle"),
    featured_video_id: readNullableString(obj, "featured_video_id"),
    highlights: highlightsRaw
      .filter(isRecord)
      .map((item, index) => ({
        id: readString(item, "id", `highlight-${index}`),
        title: readString(item, "title"),
        description: readString(item, "description"),
        media_id: readNullableString(item, "media_id"),
      })),
  };
}

function parseUniversosProps(raw: unknown): UniversosSectionProps {
  const obj = isRecord(raw) ? raw : {};
  const cardsRaw = Array.isArray(obj.cards) ? obj.cards : [];

  return {
    eyebrow: readString(obj, "eyebrow", "Universos"),
    title: readString(obj, "title", "Cinco mundos para explorar"),
    subtitle: readString(obj, "subtitle"),
    cards: cardsRaw
      .filter(isRecord)
      .map((card) => ({
        name: readString(card, "name"),
        tagline: readString(card, "tagline"),
        description: readString(card, "description"),
        accent: readString(card, "accent", "from-iconza-lilac/20 to-transparent"),
      })),
  };
}

const PARSERS: {
  [K in HomeSectionType]: (raw: unknown) => SectionPropsMap[K];
} = {
  hero: parseHeroProps,
  eventos: parseEventosProps,
  comunidade: parseComunidadeProps,
  universos: parseUniversosProps,
};

export function parseSectionProps<T extends HomeSectionType>(
  type: T,
  raw: unknown,
): SectionPropsMap[T] {
  return PARSERS[type](raw);
}

export function assertSectionSchemaVersion(version: number): void {
  if (version !== CURRENT_SECTION_SCHEMA_VERSION) {
    throw new Error(
      `Schema version ${version} não suportada. Esperado: ${CURRENT_SECTION_SCHEMA_VERSION}.`,
    );
  }
}

export function serializeSectionProps<T extends HomeSectionType>(
  props: SectionPropsMap[T],
): SectionPropsMap[T] {
  return structuredClone(props);
}
