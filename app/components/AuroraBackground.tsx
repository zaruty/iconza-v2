"use client";
export default function AuroraBackground() {
  return (
    <div className="aurora-wrapper" aria-hidden="true">
      <div className="side-wash-left"></div>
      <div className="side-wash-right"></div>
      <div className="aurora-violet"></div>
      <div className="aurora-cyan"></div>
      <div className="aurora-top-glow"></div>
      <div className="aurora-horizon"></div>
      <div className="darkness-center"></div>
      <div className="atmosphere-depth"></div>
      <div className="atmosphere-luminance"></div>
      <div className="vignette-edges"></div>
      <style jsx>{`
        .aurora-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
          background: #0a1228;
        }

        /* WASH LATERAL CONTÍNUO — página inteira */
        .side-wash-left {
          position: absolute;
          top: 0;
          left: 0;
          width: 58%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(155, 105, 215, 0.2) 0%,
            rgba(120, 70, 185, 0.12) 28%,
            rgba(80, 45, 140, 0.06) 52%,
            transparent 78%
          );
          pointer-events: none;
        }

        .side-wash-right {
          position: absolute;
          top: 0;
          right: 0;
          width: 58%;
          height: 100%;
          background: linear-gradient(
            270deg,
            rgba(55, 185, 205, 0.2) 0%,
            rgba(35, 145, 170, 0.12) 28%,
            rgba(20, 95, 120, 0.06) 52%,
            transparent 78%
          );
          pointer-events: none;
        }

        /* AURORA LILÁS — coluna esquerda animada, altura total */
        .aurora-violet {
          position: absolute;
          top: 0;
          left: -10vw;
          width: 46vw;
          height: 100%;
          background:
            linear-gradient(
              to right,
              rgba(210, 175, 255, 0.32) 0%,
              rgba(165, 110, 225, 0.2) 40%,
              rgba(100, 55, 165, 0.06) 72%,
              transparent 100%
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.22) 0%,
              rgba(165, 110, 225, 0.28) 12%,
              rgba(120, 65, 185, 0.2) 38%,
              rgba(80, 45, 140, 0.14) 62%,
              rgba(50, 28, 95, 0.1) 82%,
              rgba(35, 18, 70, 0.07) 100%
            );
          border-radius: 0 45% 55% 0 / 0 30% 70% 0;
          filter: blur(56px);
          mix-blend-mode: screen;
          transform: skewX(-6deg);
          animation:
            wave-left 38s ease-in-out infinite,
            glow-pulse-violet 26s ease-in-out infinite;
        }

        /* AURORA CIANO — coluna direita animada, altura total */
        .aurora-cyan {
          position: absolute;
          top: 0;
          right: -10vw;
          width: 48vw;
          height: 100%;
          background:
            linear-gradient(
              to left,
              rgba(130, 230, 245, 0.3) 0%,
              rgba(55, 185, 205, 0.18) 40%,
              rgba(25, 120, 145, 0.06) 72%,
              transparent 100%
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.24) 0%,
              rgba(80, 210, 220, 0.26) 12%,
              rgba(35, 155, 175, 0.2) 38%,
              rgba(20, 100, 125, 0.14) 62%,
              rgba(12, 65, 85, 0.1) 82%,
              rgba(8, 42, 58, 0.07) 100%
            );
          border-radius: 45% 0 0 55% / 30% 0 0 70%;
          filter: blur(52px);
          mix-blend-mode: screen;
          transform: skewX(5deg);
          animation:
            wave-right 42s ease-in-out infinite,
            glow-pulse-cyan 30s ease-in-out infinite;
        }

        /* GLOW TOPO — reforço no hero */
        .aurora-top-glow {
          position: absolute;
          top: -15vh;
          left: 50%;
          transform: translateX(-50%);
          width: 80vw;
          height: 45vh;
          background: radial-gradient(
            ellipse at center bottom,
            rgba(255, 255, 255, 0.22) 0%,
            rgba(180, 220, 255, 0.14) 10%,
            rgba(80, 160, 210, 0.08) 30%,
            transparent 65%
          );
          filter: blur(48px);
          mix-blend-mode: screen;
          animation: breathe-top 22s ease-in-out infinite;
        }

        /* HORIZONTE — base da página com ciano sutil */
        .aurora-horizon {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30vh;
          background: linear-gradient(
            to top,
            rgba(12, 55, 78, 0.32) 0%,
            rgba(18, 75, 98, 0.16) 40%,
            transparent 100%
          );
          filter: blur(36px);
          mix-blend-mode: screen;
          opacity: 0.6;
          animation: horizon-breathe 34s ease-in-out infinite;
        }

        /* CENTRO ESCURO — contraste horizontal para leitura, altura total */
        .darkness-center {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              to right,
              transparent 0%,
              rgba(4, 10, 24, 0.08) 14%,
              rgba(4, 10, 24, 0.42) 36%,
              rgba(4, 10, 24, 0.5) 50%,
              rgba(4, 10, 24, 0.42) 64%,
              rgba(4, 10, 24, 0.08) 86%,
              transparent 100%
            ),
            linear-gradient(
              to bottom,
              rgba(4, 12, 28, 0.22) 0%,
              rgba(4, 10, 24, 0.06) 20%,
              transparent 45%,
              rgba(2, 8, 18, 0.18) 100%
            );
          pointer-events: none;
        }

        /* PROFUNDIDADE — escurece levemente ao descer, sem matar laterais */
        .atmosphere-depth {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(3, 9, 22, 0.04) 30%,
            rgba(2, 8, 18, 0.14) 65%,
            rgba(2, 6, 14, 0.28) 100%
          );
          pointer-events: none;
        }

        /* LUMINÂNCIA — mantém vida no rodapé */
        .atmosphere-luminance {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              ellipse 80% 40% at 8% 92%,
              rgba(120, 70, 180, 0.08) 0%,
              transparent 55%
            ),
            radial-gradient(
              ellipse 80% 40% at 92% 92%,
              rgba(30, 120, 150, 0.1) 0%,
              transparent 55%
            ),
            radial-gradient(
              ellipse 90% 35% at 50% 100%,
              rgba(18, 55, 82, 0.1) 0%,
              transparent 65%
            );
          pointer-events: none;
          animation: luminance-drift 48s ease-in-out infinite;
        }

        /* VINHETA — apenas base, sem escurecer laterais */
        .vignette-edges {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 55%,
            rgba(2, 8, 18, 0.22) 82%,
            rgba(1, 5, 12, 0.45) 100%
          );
          pointer-events: none;
        }

        @keyframes wave-left {
          0%, 100% {
            transform: skewX(-6deg) translate(0, 0) scale(1);
          }
          25% {
            transform: skewX(-4deg) translate(1vw, 0.4vh) scale(1.008);
          }
          50% {
            transform: skewX(-7deg) translate(-0.5vw, 0.8vh) scale(1.014);
          }
          75% {
            transform: skewX(-5deg) translate(0.6vw, 0.2vh) scale(1.006);
          }
        }

        @keyframes wave-right {
          0%, 100% {
            transform: skewX(5deg) translate(0, 0) scale(1);
          }
          25% {
            transform: skewX(7deg) translate(-0.8vw, -0.3vh) scale(1.008);
          }
          50% {
            transform: skewX(4deg) translate(0.5vw, -0.6vh) scale(1.014);
          }
          75% {
            transform: skewX(6deg) translate(-0.4vw, -0.15vh) scale(1.006);
          }
        }

        @keyframes glow-pulse-violet {
          0%, 100% {
            opacity: 0.82;
            filter: blur(56px) brightness(0.95);
          }
          50% {
            opacity: 0.96;
            filter: blur(52px) brightness(1.05);
          }
        }

        @keyframes glow-pulse-cyan {
          0%, 100% {
            opacity: 0.84;
            filter: blur(52px) brightness(0.96);
          }
          50% {
            opacity: 0.98;
            filter: blur(48px) brightness(1.06);
          }
        }

        @keyframes breathe-top {
          0%, 100% {
            opacity: 0.65;
            transform: translateX(-50%) translateY(0) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translateX(-50%) translateY(-0.6vh) scale(1.02);
          }
        }

        @keyframes horizon-breathe {
          0%, 100% {
            opacity: 0.52;
          }
          50% {
            opacity: 0.68;
          }
        }

        @keyframes luminance-drift {
          0%, 100% {
            opacity: 0.88;
          }
          50% {
            opacity: 1;
          }
        }

        /* === DESKTOP — glows densos, corredor central amplo === */
        @media (min-width: 769px) {
          .side-wash-left {
            width: 38%;
            background: linear-gradient(
              90deg,
              rgba(175, 115, 235, 0.42) 0%,
              rgba(140, 80, 210, 0.26) 20%,
              rgba(100, 50, 170, 0.1) 38%,
              transparent 58%
            );
          }

          .side-wash-right {
            width: 38%;
            background: linear-gradient(
              270deg,
              rgba(45, 195, 220, 0.42) 0%,
              rgba(30, 155, 185, 0.26) 20%,
              rgba(18, 100, 130, 0.1) 38%,
              transparent 58%
            );
          }

          .aurora-violet {
            left: -5vw;
            width: 34vw;
            filter: blur(38px);
            background:
              linear-gradient(
                to right,
                rgba(230, 195, 255, 0.58) 0%,
                rgba(180, 115, 240, 0.4) 26%,
                rgba(130, 70, 200, 0.16) 48%,
                transparent 66%
              ),
              linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0.28) 0%,
                rgba(175, 115, 235, 0.38) 14%,
                rgba(130, 70, 200, 0.28) 40%,
                rgba(85, 48, 150, 0.2) 65%,
                rgba(55, 30, 105, 0.14) 100%
              );
            animation:
              wave-left 38s ease-in-out infinite,
              glow-pulse-violet-dt 26s ease-in-out infinite;
          }

          .aurora-cyan {
            right: -5vw;
            width: 34vw;
            filter: blur(36px);
            background:
              linear-gradient(
                to left,
                rgba(120, 235, 250, 0.55) 0%,
                rgba(50, 195, 220, 0.38) 26%,
                rgba(28, 140, 170, 0.15) 48%,
                transparent 66%
              ),
              linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0.26) 0%,
                rgba(70, 215, 230, 0.36) 14%,
                rgba(38, 165, 190, 0.28) 40%,
                rgba(22, 105, 130, 0.2) 65%,
                rgba(12, 68, 88, 0.14) 100%
              );
            animation:
              wave-right 42s ease-in-out infinite,
              glow-pulse-cyan-dt 30s ease-in-out infinite;
          }

          .aurora-top-glow {
            width: 62vw;
            height: 40vh;
            filter: blur(42px);
            opacity: 0.85;
          }

          .darkness-center {
            background:
              linear-gradient(
                to right,
                transparent 0%,
                rgba(3, 8, 20, 0.04) 6%,
                rgba(3, 8, 20, 0.52) 20%,
                rgba(3, 7, 18, 0.72) 34%,
                rgba(2, 6, 16, 0.78) 50%,
                rgba(3, 7, 18, 0.72) 66%,
                rgba(3, 8, 20, 0.52) 80%,
                rgba(3, 8, 20, 0.04) 94%,
                transparent 100%
              ),
              linear-gradient(
                to bottom,
                rgba(4, 12, 28, 0.2) 0%,
                rgba(4, 10, 24, 0.04) 22%,
                transparent 48%,
                rgba(2, 8, 18, 0.22) 100%
              );
          }

          .atmosphere-depth {
            background: linear-gradient(
              to bottom,
              transparent 0%,
              rgba(3, 9, 22, 0.05) 35%,
              rgba(2, 8, 18, 0.18) 70%,
              rgba(2, 6, 14, 0.32) 100%
            );
          }
        }

        @keyframes glow-pulse-violet-dt {
          0%, 100% {
            opacity: 0.94;
            filter: blur(38px) brightness(1);
          }
          50% {
            opacity: 1;
            filter: blur(34px) brightness(1.12);
          }
        }

        @keyframes glow-pulse-cyan-dt {
          0%, 100% {
            opacity: 0.95;
            filter: blur(36px) brightness(1.02);
          }
          50% {
            opacity: 1;
            filter: blur(32px) brightness(1.14);
          }
        }

        @media (max-width: 768px) {
          .side-wash-left,
          .side-wash-right {
            width: 72%;
          }

          .aurora-violet {
            width: 68vw;
            left: -14vw;
            filter: blur(44px);
            animation:
              wave-left 44s ease-in-out infinite,
              glow-pulse-violet 32s ease-in-out infinite;
          }

          .aurora-cyan {
            width: 72vw;
            right: -14vw;
            filter: blur(42px);
            animation:
              wave-right 48s ease-in-out infinite,
              glow-pulse-cyan 36s ease-in-out infinite;
          }

          .aurora-top-glow {
            width: 95vw;
            height: 32vh;
            filter: blur(38px);
          }

          .darkness-center {
            background:
              linear-gradient(
                to right,
                transparent 0%,
                rgba(4, 10, 24, 0.1) 10%,
                rgba(4, 10, 24, 0.48) 38%,
                rgba(4, 10, 24, 0.52) 50%,
                rgba(4, 10, 24, 0.48) 62%,
                rgba(4, 10, 24, 0.1) 90%,
                transparent 100%
              ),
              linear-gradient(
                to bottom,
                rgba(4, 12, 28, 0.28) 0%,
                transparent 28%,
                rgba(2, 8, 18, 0.2) 100%
              );
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .aurora-violet,
          .aurora-cyan,
          .aurora-top-glow,
          .aurora-horizon,
          .atmosphere-luminance {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
