"use client";
export default function AuroraBackground() {
  return (
    <div className="aurora-wrapper" aria-hidden="true">
      <div className="gemini-blob gemini-blue"></div>
      <div className="gemini-blob gemini-purple"></div>
      <div className="gemini-blob gemini-pink"></div>
      <div className="gemini-blob gemini-yellow"></div>
      <div className="aurora-center-shadow"></div>
      <div className="aurora-vignette"></div>
      <style jsx>{`
        .aurora-wrapper {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          min-height: 100dvh;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
          background: #07030f;
          isolation: isolate;
        }
        .gemini-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(110px);
          mix-blend-mode: screen;
          opacity: 0.65;
          will-change: transform;
        }
        @media (max-width: 767px) {
          .gemini-blob {
            mix-blend-mode: normal;
            opacity: 0.45;
            filter: blur(80px);
          }
          .aurora-center-shadow {
            background: radial-gradient(
              ellipse 70% 60% at center,
              rgba(7, 3, 15, 0.35) 0%,
              rgba(7, 3, 15, 0.15) 45%,
              transparent 75%
            ) !important;
          }
          .aurora-vignette {
            background: radial-gradient(
              ellipse at center,
              transparent 0%,
              transparent 55%,
              rgba(7, 3, 15, 0.25) 90%,
              rgba(7, 3, 15, 0.5) 100%
            ) !important;
          }
        }
        /* AZUL — orbita canto superior esquerdo */
        .gemini-blue {
          width: 45vw;
          height: 45vw;
          background: radial-gradient(circle, #4285f4 0%, transparent 70%);
          top: -15%;
          left: -15%;
          animation: orbit-blue 20s infinite ease-in-out alternate;
        }
        /* ROXO — orbita canto superior direito */
        .gemini-purple {
          width: 42vw;
          height: 42vw;
          background: radial-gradient(circle, #a05af5 0%, transparent 70%);
          top: -10%;
          right: -15%;
          animation: orbit-purple 24s infinite ease-in-out alternate-reverse;
        }
        /* ROSA — orbita canto inferior esquerdo */
        .gemini-pink {
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, #e37482 0%, transparent 70%);
          bottom: -20%;
          left: -10%;
          animation: orbit-pink 22s infinite ease-in-out alternate;
        }
        /* AMARELO — orbita canto inferior direito */
        .gemini-yellow {
          width: 40vw;
          height: 40vw;
          background: radial-gradient(circle, #fbbc04 0%, transparent 70%);
          bottom: -10%;
          right: -10%;
          animation: orbit-yellow 18s infinite ease-in-out alternate-reverse;
        }
        /* SOMBRA CENTRAL — escurece o miolo da tela para legibilidade */
        .aurora-center-shadow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 60% 50% at center,
            rgba(7, 3, 15, 0.6) 0%,
            rgba(7, 3, 15, 0.3) 40%,
            transparent 70%
          );
          pointer-events: none;
        }
        /* VINHETA DAS BORDAS — mantém profundidade */
        .aurora-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 50%,
            rgba(7, 3, 15, 0.4) 90%,
            rgba(7, 3, 15, 0.75) 100%
          );
          pointer-events: none;
        }
        /* ANIMACOES — cada blob se move APENAS pela sua borda */
        /* Azul: ronda topo-esquerda (nunca passa do centro) */
        @keyframes orbit-blue {
          0%   { transform: translate(0, 0) scale(1); }
          33%  { transform: translate(8vw, 5vh) scale(1.1); }
          66%  { transform: translate(5vw, 15vh) scale(0.95); }
          100% { transform: translate(0, 10vh) scale(1.05); }
        }
        /* Roxo: ronda topo-direita */
        @keyframes orbit-purple {
          0%   { transform: translate(0, 0) scale(1); }
          33%  { transform: translate(-8vw, 6vh) scale(1.1); }
          66%  { transform: translate(-3vw, 12vh) scale(0.95); }
          100% { transform: translate(-5vw, 8vh) scale(1.15); }
        }
        /* Rosa: ronda baixo-esquerda */
        @keyframes orbit-pink {
          0%   { transform: translate(0, 0) scale(1); }
          33%  { transform: translate(10vw, -8vh) scale(0.95); }
          66%  { transform: translate(5vw, -15vh) scale(1.1); }
          100% { transform: translate(12vw, -5vh) scale(1); }
        }
        /* Amarelo: ronda baixo-direita */
        @keyframes orbit-yellow {
          0%   { transform: translate(0, 0) scale(1); }
          33%  { transform: translate(-10vw, -6vh) scale(1.1); }
          66%  { transform: translate(-5vw, -14vh) scale(0.95); }
          100% { transform: translate(-12vw, -3vh) scale(1.05); }
        }
        @media (prefers-reduced-motion: reduce) {
          .gemini-blob { animation: none; }
        }
      `}</style>
    </div>
  );
}
