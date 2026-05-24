"use client";
export default function AuroraBackground() {
  return (
    <div className="aurora-wrapper" aria-hidden="true">
      <div className="aurora-violet"></div>
      <div className="aurora-cyan"></div>
      <div className="aurora-top-glow"></div>
      <div className="aurora-horizon"></div>
      <div className="darkness-center"></div>
      <div className="vignette-edges"></div>
      <style jsx>{`
        .aurora-wrapper {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
          background: #0a1228;
        }
        /* AURORA VIOLETA — lateral ESQUERDA, vertical */
        .aurora-violet {
          position: absolute;
          top: -10vh;
          left: -10vw;
          width: 45vw;
          height: 85vh;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(200, 160, 240, 0.45) 5%,
            rgba(160, 100, 220, 0.5) 15%,
            rgba(120, 60, 180, 0.4) 35%,
            rgba(70, 30, 120, 0.2) 60%,
            rgba(40, 20, 70, 0.08) 80%,
            transparent 100%
          );
          border-radius: 50% 50% 40% 60% / 30% 40% 60% 70%;
          filter: blur(60px);
          mix-blend-mode: screen;
          transform: skewX(-8deg);
          animation: wave-left 22s ease-in-out infinite;
        }
        /* AURORA CIANO-VERDE — lateral DIREITA, vertical */
        .aurora-cyan {
          position: absolute;
          top: -15vh;
          right: -10vw;
          width: 50vw;
          height: 90vh;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.5) 0%,
            rgba(180, 250, 240, 0.55) 5%,
            rgba(80, 220, 200, 0.55) 15%,
            rgba(30, 180, 170, 0.45) 35%,
            rgba(20, 100, 110, 0.2) 60%,
            rgba(10, 50, 60, 0.08) 80%,
            transparent 100%
          );
          border-radius: 50% 50% 60% 40% / 40% 30% 70% 60%;
          filter: blur(55px);
          mix-blend-mode: screen;
          transform: skewX(6deg);
          animation: wave-right 26s ease-in-out infinite;
        }
        /* GLOW BRANCO TOPO — núcleo de luz central acima */
        .aurora-top-glow {
          position: absolute;
          top: -20vh;
          left: 50%;
          transform: translateX(-50%);
          width: 80vw;
          height: 50vh;
          background: radial-gradient(
            ellipse at center bottom,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(200, 230, 255, 0.3) 8%,
            rgba(100, 180, 220, 0.2) 25%,
            transparent 60%
          );
          filter: blur(50px);
          mix-blend-mode: screen;
          animation: breathe-top 16s ease-in-out infinite;
        }
        /* REFLEXO HORIZONTE — sutil, na base */
        .aurora-horizon {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 25vh;
          background: linear-gradient(
            to top,
            rgba(20, 80, 90, 0.4) 0%,
            rgba(30, 120, 130, 0.25) 30%,
            rgba(40, 150, 160, 0.12) 60%,
            transparent 100%
          );
          filter: blur(40px);
          mix-blend-mode: screen;
          opacity: 0.7;
        }
        /* DARKNESS CENTER — PROTEGE o texto do hero */
        .darkness-center {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 50% 35% at center 55%,
            rgba(7, 3, 15, 0.85) 0%,
            rgba(7, 3, 15, 0.6) 35%,
            rgba(7, 3, 15, 0.25) 65%,
            transparent 100%
          );
          pointer-events: none;
        }
        /* VINHETA EDGES — escurece bordas inferiores */
        .vignette-edges {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              to bottom,
              transparent 60%,
              rgba(7, 3, 15, 0.5) 90%,
              rgba(7, 3, 15, 0.85) 100%
            ),
            linear-gradient(
              to right,
              rgba(7, 3, 15, 0.3) 0%,
              transparent 15%,
              transparent 85%,
              rgba(7, 3, 15, 0.3) 100%
            );
          pointer-events: none;
        }
        /* === ANIMAÇÕES === */
        @keyframes wave-left {
          0%, 100% { 
            transform: skewX(-8deg) translateY(0) scale(1); 
            opacity: 0.85; 
          }
          50% { 
            transform: skewX(-5deg) translateY(2vh) scale(1.03); 
            opacity: 1; 
          }
        }
        @keyframes wave-right {
          0%, 100% { 
            transform: skewX(6deg) translateY(0) scale(1); 
            opacity: 0.9; 
          }
          50% { 
            transform: skewX(9deg) translateY(-2vh) scale(1.04); 
            opacity: 1; 
          }
        }
        @keyframes breathe-top {
          0%, 100% { 
            opacity: 0.7; 
            transform: translateX(-50%) translateY(0) scale(1); 
          }
          50% { 
            opacity: 1; 
            transform: translateX(-50%) translateY(-2vh) scale(1.05); 
          }
        }
        /* === MOBILE === */
        @media (max-width: 768px) {
          .aurora-violet { 
            width: 70vw; 
            height: 70vh; 
            filter: blur(45px); 
          }
          .aurora-cyan { 
            width: 75vw; 
            height: 75vh; 
            filter: blur(45px); 
          }
          .aurora-top-glow { 
            width: 95vw; 
            height: 35vh; 
            filter: blur(40px); 
          }
          .darkness-center {
            background: radial-gradient(
              ellipse 70% 30% at center 55%,
              rgba(7, 3, 15, 0.85) 0%,
              rgba(7, 3, 15, 0.6) 35%,
              rgba(7, 3, 15, 0.25) 65%,
              transparent 100%
            );
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-violet,
          .aurora-cyan,
          .aurora-top-glow { 
            animation: none; 
          }
        }
      `}</style>
    </div>
  );
}
