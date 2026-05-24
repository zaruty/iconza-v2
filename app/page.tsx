import AuroraBackground from "./components/AuroraBackground";
import { CustomCursor } from "./components/custom-cursor";
import { NeuralCanvas } from "./components/neural-canvas";

const universes = [
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
    name: "ICONETHNIA",
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
] as const;

function BrainOutlineIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M12 3.75c-2.95 0-5.35 2.15-5.75 5.05-.16 1.1.04 2.15.58 3.05-.48.78-.73 1.68-.73 2.65 0 2.4 1.95 4.35 4.35 4.35h3.1c2.4 0 4.35-1.95 4.35-4.35 0-.97-.25-1.87-.73-2.65.54-.9.74-1.95.58-3.05-.4-2.9-2.8-5.05-5.75-5.05z"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6.25v11.5"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M9 10.25c.9.6 1.65.72 3 .32"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path
        d="M15 10.25c-.9.6-1.65.72-3 .32"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path
        d="M8.5 14c1.05.5 2.15.45 3.5-.08"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path
        d="M15.5 14c-1.05.5-2.15.45-3.5-.08"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CrownLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M4 18h24l-2-10-6 5-4-8-4 8-6-5-2 10z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M3 19.5h26v1.5a1 1 0 01-1 1H4a1 1 0 01-1-1v-1.5z"
        fill="currentColor"
      />
      <circle cx="16" cy="5" r="1.2" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <CustomCursor />
      <AuroraBackground />
      <NeuralCanvas />

      {/* NAV */}
      <header className="glass-panel site-content fixed inset-x-0 top-0 z-50 border-b border-iconza-lilac/10">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <a
            href="#"
            className="group flex items-center gap-2.5 text-iconza-pink transition-opacity hover:opacity-80"
          >
            <CrownLogo className="h-5 w-7 text-iconza-lavender transition-colors group-hover:text-iconza-lilac sm:h-6 sm:w-8" />
            <span className="font-display text-lg font-semibold tracking-[0.2em] sm:text-xl">
              ICONZA
            </span>
          </a>

          <a
            href="#comecar"
            className="rounded-full border border-iconza-lilac/40 bg-iconza-lilac/10 px-4 py-2 text-xs font-medium text-iconza-pink transition-all hover:border-iconza-lavender hover:bg-iconza-lilac/20 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Começar gratuitamente
          </a>
        </nav>
      </header>

      <main className="site-content relative z-10">
        {/* HERO */}
        <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-16 sm:px-6">
          <div className="relative z-20 mx-auto max-w-3xl text-center">
            <h1 className="hero-title font-hero font-medium tracking-tight text-white">
              Universos
              <br />
              para mentes
              <br />
              <span
                className="bg-[linear-gradient(90deg,#A9D6FF_0%,#7B88FF_50%,#B39DFF_100%)] bg-clip-text text-transparent"
              >
                criativas
              </span>
            </h1>
            <p className="font-subtitle mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base md:text-lg">
              Explore experiências visuais e universos temáticos que
              desenvolvem criatividade, emoção e inteligência estratégica.
            </p>
            <div className="mt-10 flex justify-center px-2">
              <a href="#universos" className="hero-explore-btn">
                <BrainOutlineIcon className="hero-explore-btn__icon" />
                <span>Explorar universos</span>
              </a>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
            <div className="h-8 w-5 rounded-full border border-iconza-lilac/30 p-1">
              <div className="mx-auto h-1.5 w-1 rounded-full bg-iconza-lavender/60" />
            </div>
          </div>
        </section>

        {/* UNIVERSOS */}
        <section
          id="universos"
          className="relative border-t border-iconza-lilac/10 px-4 py-20 sm:px-6 sm:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 max-w-2xl sm:mb-16">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-iconza-lilac">
                Universos
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-iconza-pink sm:text-4xl md:text-5xl">
                Cinco mundos para explorar
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-iconza-pink/65 sm:text-base">
                Cada universo ICONZA é um caminho de aprendizado focado em um
                domínio criativo diferente.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {universes.map((universe, index) => (
                <article
                  key={universe.name}
                  className={`glass-panel group relative overflow-hidden rounded-2xl border border-iconza-lilac/15 p-6 transition-all duration-300 hover:border-iconza-lavender/35 sm:p-7 ${
                    index === universes.length - 1
                      ? "sm:col-span-2 lg:col-span-1"
                      : ""
                  }`}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${universe.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />
                  <div className="relative">
                    <span className="inline-block rounded-full border border-iconza-lilac/25 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-iconza-lavender">
                      {universe.tagline}
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-semibold tracking-wide text-iconza-pink sm:text-3xl">
                      {universe.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-iconza-pink/60">
                      {universe.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-iconza-lilac transition-colors group-hover:text-iconza-lavender">
                      Explorar
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M3 7h8M8 4l3 3-3 3"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          id="comecar"
          className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28"
        >
          <div className="glass-panel relative mx-auto max-w-3xl rounded-3xl border border-iconza-lilac/20 px-6 py-14 text-center sm:px-12 sm:py-16">
            <CrownLogo className="mx-auto h-7 w-10 text-iconza-lavender" />
            <h2 className="mt-6 font-display text-3xl font-semibold text-iconza-pink sm:text-4xl md:text-5xl">
              Pronto para criar?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-iconza-pink/65 sm:text-base">
              Entre na ICONZA e comece sua jornada gratuita. Descubra como a IA
              pode ampliar sua criatividade visual.
            </p>
            <a
              href="#"
              className="mt-8 inline-block rounded-full bg-iconza-lilac px-10 py-3.5 text-sm font-semibold text-iconza-bg transition-all hover:bg-iconza-lavender sm:text-base"
            >
              Começar gratuitamente
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-content relative z-10 border-t border-iconza-lilac/10 px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-iconza-pink/50">
            <CrownLogo className="h-4 w-6 text-iconza-lilac/60" />
            <span className="text-xs font-medium tracking-[0.15em]">
              ICONZA
            </span>
          </div>
          <p className="text-xs text-iconza-pink/40">
            © {new Date().getFullYear()} ICONZA. Crie ícones com IA.
          </p>
        </div>
      </footer>
    </>
  );
}
