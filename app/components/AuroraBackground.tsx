"use client";
export default function AuroraBackground() {
  return (
    <div className="aurora-wrapper" aria-hidden="true">
      {/* Núcleos volumétricos — focos localizados */}
      <div className="volumetric volumetric-blue">
        <div className="nucleus nucleus-blue" />
        <div className="halo halo-blue" />
      </div>
      <div className="volumetric volumetric-lilac">
        <div className="nucleus nucleus-lilac" />
        <div className="halo halo-lilac" />
      </div>
      <div className="volumetric volumetric-gold">
        <div className="nucleus nucleus-gold" />
        <div className="halo halo-gold" />
      </div>

      {/* Névoa conectiva — une os núcleos sem lavar o centro */}
      <div className="aurora-fog" />

      {/* Legibilidade + bordas escuras */}
      <div className="aurora-readability" />
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
          background: #07030f;
        }

        .volumetric {
          position: absolute;
          pointer-events: none;
        }

        .nucleus,
        .halo {
          position: absolute;
          border-radius: 50%;
          mix-blend-mode: screen;
          will-change: transform, opacity;
        }

        /* ── AZUL PROFUNDO — lateral esquerdo ── */
        .volumetric-blue {
          left: -18%;
          top: 22%;
          width: 70vw;
          height: 85vh;
          max-width: 900px;
        }
        .nucleus-blue {
          width: 38%;
          height: 38%;
          left: 28%;
          top: 32%;
          background: radial-gradient(
            circle,
            rgba(35, 75, 210, 0.55) 0%,
            rgba(35, 75, 210, 0.22) 28%,
            rgba(35, 75, 210, 0.06) 55%,
            transparent 72%
          );
          filter: blur(70px);
          animation: pulse-blue 36s ease-in-out infinite;
        }
        .halo-blue {
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          background: radial-gradient(
            ellipse 55% 65% at 42% 48%,
            rgba(45, 90, 220, 0.2) 0%,
            rgba(45, 90, 220, 0.06) 35%,
            transparent 68%
          );
          filter: blur(140px);
          opacity: 0.7;
          animation: drift-blue 44s ease-in-out infinite alternate;
        }

        /* ── ROSA / LILÁS — centro inferior ── */
        .volumetric-lilac {
          left: 50%;
          bottom: -8%;
          width: 80vw;
          height: 65vh;
          max-width: 1000px;
          transform: translateX(-50%);
        }
        .nucleus-lilac {
          width: 42%;
          height: 42%;
          left: 50%;
          top: 18%;
          transform: translateX(-50%);
          background: radial-gradient(
            circle,
            rgba(190, 130, 185, 0.48) 0%,
            rgba(168, 146, 200, 0.2) 30%,
            rgba(168, 146, 200, 0.05) 58%,
            transparent 75%
          );
          filter: blur(75px);
          animation: pulse-lilac 40s ease-in-out infinite;
          animation-delay: -12s;
        }
        .halo-lilac {
          width: 100%;
          height: 100%;
          background: radial-gradient(
            ellipse 60% 55% at 50% 35%,
            rgba(180, 140, 200, 0.18) 0%,
            rgba(168, 146, 200, 0.05) 40%,
            transparent 70%
          );
          filter: blur(160px);
          opacity: 0.65;
          animation: drift-lilac 50s ease-in-out infinite alternate-reverse;
        }

        /* ── DOURADO SUAVE — topo direito ── */
        .volumetric-gold {
          right: -12%;
          top: -12%;
          width: 60vw;
          height: 60vw;
          max-width: 820px;
          max-height: 820px;
        }
        .nucleus-gold {
          width: 36%;
          height: 36%;
          right: 22%;
          top: 22%;
          background: radial-gradient(
            circle,
            rgba(220, 175, 90, 0.42) 0%,
            rgba(220, 175, 90, 0.16) 32%,
            rgba(220, 175, 90, 0.04) 58%,
            transparent 74%
          );
          filter: blur(65px);
          animation: pulse-gold 32s ease-in-out infinite;
          animation-delay: -8s;
        }
        .halo-gold {
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at 62% 38%,
            rgba(230, 190, 110, 0.16) 0%,
            rgba(230, 190, 110, 0.04) 42%,
            transparent 72%
          );
          filter: blur(130px);
          opacity: 0.6;
          animation: drift-gold 38s ease-in-out infinite alternate;
        }

        /* Névoa espacial — conecta os focos sem brilho global */
        .aurora-fog {
          position: absolute;
          inset: -15%;
          background:
            radial-gradient(
              ellipse 40% 50% at 18% 55%,
              rgba(50, 90, 210, 0.06) 0%,
              transparent 60%
            ),
            radial-gradient(
              ellipse 50% 40% at 50% 78%,
              rgba(168, 146, 200, 0.05) 0%,
              transparent 55%
            ),
            radial-gradient(
              ellipse 35% 35% at 82% 18%,
              rgba(220, 180, 100, 0.04) 0%,
              transparent 50%
            );
          filter: blur(100px);
          opacity: 0.9;
          animation: fog-drift 55s ease-in-out infinite;
        }

        /* Centro levemente escurecido — legibilidade do texto */
        .aurora-readability {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 52% 44% at 50% 46%,
            rgba(7, 3, 15, 0.32) 0%,
            rgba(7, 3, 15, 0.12) 45%,
            transparent 72%
          );
          pointer-events: none;
        }

        /* Bordas escuras — contraste preto vs luz */
        .aurora-vignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              ellipse at center,
              transparent 0%,
              transparent 48%,
              rgba(7, 3, 15, 0.18) 72%,
              rgba(7, 3, 15, 0.48) 100%
            ),
            linear-gradient(
              to right,
              rgba(7, 3, 15, 0.35) 0%,
              transparent 18%,
              transparent 82%,
              rgba(7, 3, 15, 0.3) 100%
            );
          pointer-events: none;
        }

        @keyframes pulse-blue {
          0%,
          100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.06);
          }
        }

        @keyframes pulse-lilac {
          0%,
          100% {
            opacity: 0.65;
            transform: translateX(-50%) scale(1);
          }
          50% {
            opacity: 0.95;
            transform: translateX(-50%) scale(1.08);
          }
        }

        @keyframes pulse-gold {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.05);
          }
        }

        @keyframes drift-blue {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(4vw, 6vh);
          }
        }

        @keyframes drift-lilac {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(-3vw, -5vh);
          }
        }

        @keyframes drift-gold {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(-5vw, 4vh);
          }
        }

        @keyframes fog-drift {
          0%,
          100% {
            opacity: 0.85;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.02);
          }
        }

        @media (max-width: 767px) {
          .nucleus,
          .halo {
            mix-blend-mode: normal;
          }
          .nucleus-blue,
          .nucleus-lilac,
          .nucleus-gold {
            filter: blur(55px);
          }
          .halo-blue,
          .halo-lilac,
          .halo-gold {
            filter: blur(100px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .nucleus,
          .halo,
          .aurora-fog {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
