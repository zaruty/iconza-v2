"use client";
export default function AuroraBackground() {
  return (
    <div className="aurora-wrapper" aria-hidden="true">
      <div className="aurora-ambient" />
      <div className="aurora-glow aurora-glow-blue" />
      <div className="aurora-glow aurora-glow-lilac" />
      <div className="aurora-glow aurora-glow-rose" />
      <div className="aurora-glow aurora-glow-warm" />
      <div className="aurora-glow aurora-glow-teal" />
      <div className="aurora-vignette" />
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
          isolation: isolate;
          background:
            radial-gradient(
              ellipse 130% 90% at 50% -10%,
              rgba(45, 25, 70, 0.55) 0%,
              transparent 55%
            ),
            radial-gradient(
              ellipse 90% 70% at 90% 80%,
              rgba(20, 35, 65, 0.35) 0%,
              transparent 50%
            ),
            radial-gradient(
              ellipse 80% 60% at 10% 90%,
              rgba(55, 30, 60, 0.25) 0%,
              transparent 45%
            ),
            #07030f;
        }

        /* Camada ambiental difusa — luz indireta espalhada */
        .aurora-ambient {
          position: absolute;
          inset: -25%;
          background:
            radial-gradient(
              ellipse 70% 55% at 30% 35%,
              rgba(168, 146, 200, 0.14) 0%,
              transparent 65%
            ),
            radial-gradient(
              ellipse 65% 50% at 70% 55%,
              rgba(100, 150, 230, 0.12) 0%,
              transparent 60%
            ),
            radial-gradient(
              ellipse 60% 45% at 50% 75%,
              rgba(196, 176, 224, 0.1) 0%,
              transparent 55%
            );
          filter: blur(90px);
          animation: ambient-breathe 38s ease-in-out infinite;
        }

        .aurora-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(160px);
          mix-blend-mode: screen;
          will-change: transform, opacity;
        }

        /* Azul suave — canto superior esquerdo */
        .aurora-glow-blue {
          width: 85vw;
          height: 85vw;
          max-width: 1100px;
          max-height: 1100px;
          background: radial-gradient(
            circle,
            rgba(100, 155, 240, 0.32) 0%,
            rgba(100, 155, 240, 0.08) 35%,
            transparent 68%
          );
          top: -30%;
          left: -25%;
          opacity: 0.7;
          animation: drift-blue 42s ease-in-out infinite alternate;
        }

        /* Lilás ICONZA — canto superior direito */
        .aurora-glow-lilac {
          width: 80vw;
          height: 80vw;
          max-width: 1050px;
          max-height: 1050px;
          background: radial-gradient(
            circle,
            rgba(168, 146, 200, 0.35) 0%,
            rgba(168, 146, 200, 0.1) 38%,
            transparent 70%
          );
          top: -20%;
          right: -28%;
          opacity: 0.65;
          animation: drift-lilac 48s ease-in-out infinite alternate-reverse;
        }

        /* Rosa pálido — inferior esquerdo */
        .aurora-glow-rose {
          width: 90vw;
          height: 90vw;
          max-width: 1200px;
          max-height: 1200px;
          background: radial-gradient(
            circle,
            rgba(210, 150, 170, 0.28) 0%,
            rgba(196, 176, 224, 0.08) 40%,
            transparent 72%
          );
          bottom: -35%;
          left: -20%;
          opacity: 0.6;
          animation: drift-rose 52s ease-in-out infinite alternate;
        }

        /* Calor sutil — inferior direito */
        .aurora-glow-warm {
          width: 75vw;
          height: 75vw;
          max-width: 980px;
          max-height: 980px;
          background: radial-gradient(
            circle,
            rgba(230, 190, 130, 0.18) 0%,
            rgba(243, 200, 160, 0.06) 42%,
            transparent 70%
          );
          bottom: -25%;
          right: -22%;
          opacity: 0.55;
          animation: drift-warm 45s ease-in-out infinite alternate-reverse;
        }

        /* Toque esmeralda — centro lateral, muito sutil */
        .aurora-glow-teal {
          width: 70vw;
          height: 70vw;
          max-width: 900px;
          max-height: 900px;
          background: radial-gradient(
            circle,
            rgba(90, 180, 165, 0.15) 0%,
            rgba(90, 180, 165, 0.04) 45%,
            transparent 72%
          );
          top: 35%;
          left: 30%;
          opacity: 0.45;
          animation: drift-teal 55s ease-in-out infinite alternate;
        }

        /* Vinheta leve — profundidade sem apagar */
        .aurora-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 62%,
            rgba(7, 3, 15, 0.12) 82%,
            rgba(7, 3, 15, 0.32) 100%
          );
          pointer-events: none;
        }

        @keyframes ambient-breathe {
          0%,
          100% {
            opacity: 0.75;
            transform: scale(1) translate(0, 0);
          }
          50% {
            opacity: 1;
            transform: scale(1.04) translate(1vw, -1vh);
          }
        }

        @keyframes drift-blue {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.55;
          }
          50% {
            transform: translate(12vw, 10vh) scale(1.08);
            opacity: 0.75;
          }
          100% {
            transform: translate(6vw, 18vh) scale(0.96);
            opacity: 0.6;
          }
        }

        @keyframes drift-lilac {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translate(-14vw, 8vh) scale(1.06);
            opacity: 0.7;
          }
          100% {
            transform: translate(-8vw, 16vh) scale(1.02);
            opacity: 0.55;
          }
        }

        @keyframes drift-rose {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.45;
          }
          50% {
            transform: translate(10vw, -12vh) scale(1.05);
            opacity: 0.65;
          }
          100% {
            transform: translate(16vw, -6vh) scale(0.97);
            opacity: 0.5;
          }
        }

        @keyframes drift-warm {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(-12vw, -10vh) scale(1.07);
            opacity: 0.58;
          }
          100% {
            transform: translate(-6vw, -16vh) scale(0.95);
            opacity: 0.42;
          }
        }

        @keyframes drift-teal {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.35;
          }
          50% {
            transform: translate(8vw, -8vh) scale(1.04);
            opacity: 0.5;
          }
          100% {
            transform: translate(-6vw, 6vh) scale(0.98);
            opacity: 0.38;
          }
        }

        @media (max-width: 767px) {
          .aurora-glow {
            mix-blend-mode: normal;
            filter: blur(110px);
          }
          .aurora-ambient {
            filter: blur(70px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .aurora-ambient,
          .aurora-glow {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
