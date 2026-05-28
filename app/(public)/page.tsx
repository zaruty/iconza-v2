import Link from "next/link";
import { HomeAtmosphere } from "@/app/components/home-atmosphere";
import { CustomCursor } from "@/app/components/custom-cursor";
import { UniversosStickyScroll } from "@/components/home/UniversosStickyScroll";

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
    <div className="homepage-root">
      <div className="homepage-atmosphere" aria-hidden>
        <HomeAtmosphere />
      </div>

      <div className="homepage-ui">
        <CustomCursor />

        {/* NAV */}
        <header className="glass-panel site-content fixed inset-x-0 top-0 z-50 border-b border-refined">
          <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
            <Link
              href="/"
              className="group flex min-h-[44px] shrink-0 items-center gap-2.5 text-iconza-pink transition-opacity hover:opacity-80"
            >
              <CrownLogo className="h-5 w-7 text-white/70 transition-colors group-hover:text-white/90 sm:h-6 sm:w-8" />
              <span className="font-display text-lg font-semibold tracking-[0.2em] sm:text-xl">
                ICONZA
              </span>
            </Link>

            <div className="flex items-center gap-1 sm:gap-2">
              <Link href="/login" className="nav-text-link">
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="btn-outline-premium btn-outline-premium--sm"
              >
                Começar gratuitamente
              </Link>
            </div>
          </nav>
        </header>

        <main className="site-content relative z-10">
        {/* HERO */}
        <section className="hero-section relative overflow-hidden px-4 pb-8 pt-14 sm:px-6 md:flex md:min-h-[100dvh] md:flex-col md:items-center md:justify-center md:pb-16 md:pt-[4.5rem]">
          <div className="hero-section__content content-readability relative mx-auto w-full max-w-3xl text-center">
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
            <p className="font-subtitle mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:mt-6 sm:text-base md:text-lg">
              Explore experiências visuais e universos temáticos que
              desenvolvem criatividade, emoção e inteligência estratégica.
            </p>
            <div className="hero-cta-row mt-8 flex justify-center px-2 sm:mt-10">
              <Link href="/cadastro" className="btn-outline-premium hero-explore-btn">
                <BrainOutlineIcon className="hero-explore-btn__icon" />
                <span>Explorar universos</span>
              </Link>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 animate-bounce md:block">
            <div className="h-8 w-5 rounded-full border border-white/20 p-1">
              <div className="mx-auto h-1.5 w-1 rounded-full bg-white/50" />
            </div>
          </div>
        </section>

        <UniversosStickyScroll />

        {/* CTA */}
        <section
          id="comecar"
          className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28"
        >
          <div className="glass-panel content-readability relative mx-auto max-w-3xl rounded-3xl border border-refined px-6 py-14 text-center sm:px-12 sm:py-16">
            <CrownLogo className="mx-auto h-7 w-10 text-white/70" />
            <h2 className="mt-6 font-display text-3xl font-semibold text-iconza-pink sm:text-4xl md:text-5xl">
              Pronto para criar?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-iconza-pink/65 sm:text-base">
              Entre na ICONZA e comece sua jornada gratuita. Descubra como a IA
              pode ampliar sua criatividade visual.
            </p>
            <Link
              href="/cadastro"
              className="btn-outline-premium hero-explore-btn mt-8 inline-flex"
            >
              Começar gratuitamente
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-content relative z-10 border-t border-refined px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-iconza-pink/50">
            <CrownLogo className="h-4 w-6 text-white/45" />
            <span className="text-xs font-medium tracking-[0.15em]">
              ICONZA
            </span>
          </div>
          <p className="text-xs text-iconza-pink/40">
            © {new Date().getFullYear()} ICONZA. Crie ícones com IA.
          </p>
        </div>
      </footer>
      </div>
    </div>
  );
}
