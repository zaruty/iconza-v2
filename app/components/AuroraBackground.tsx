"use client";
export default function AuroraBackground() {
  return (
    <div className="aurora-wrapper" aria-hidden="true">
      <div className="light-top"></div>
      <div className="light-bottom"></div>
      <div className="light-cloud light-cloud-1"></div>
      <div className="light-cloud light-cloud-2"></div>
      <div className="light-cloud light-cloud-3"></div>
      <div className="light-cloud light-cloud-4"></div>
      <div className="light-cloud light-cloud-5"></div>
      <div className="vignette-frame"></div>
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
          background: #07030f;
        }
        /* ============================================ */
        /* GLOW TOPO — estilo Gemini (luz com núcleo)   */
        /* ============================================ */
        .light-top {
          position: absolute;
          top: -10vh;
          left: 50%;
          transform: translateX(-50%);
          width: 120vw;
          height: 50vh;
          background: radial-gradient(
            ellipse at center top,
            rgba(255, 255, 255, 0.18) 0%,
            rgba(120, 180, 200, 0.4) 8%,
            rgba(27, 77, 92, 0.45) 25%,
            rgba(27, 77, 92, 0.2) 50%,
            rgba(27, 77, 92, 0.05) 75%,
            transparent 100%
          );
          filter: blur(60px);
          animation: breathe-top 14s ease-in-out infinite;
        }
        /* ============================================ */
        /* HALO HORIZONTE — estilo Wope (luz nascendo)  */
        /* ============================================ */
        .light-bottom {
          position: absolute;
          bottom: -15vh;
          left: 50%;
          transform: translateX(-50%);
          width: 140vw;
          height: 60vh;
          background: radial-gradient(
            ellipse at center bottom,
            rgba(255, 255, 255, 0.22) 0%,
            rgba(255, 180, 200, 0.45) 6%,
            rgba(232, 90, 130, 0.55) 18%,
            rgba(180, 60, 110, 0.35) 35%,
            rgba(100, 35, 80, 0.18) 55%,
            rgba(50, 20, 60, 0.08) 75%,
            transparent 100%
          );
          filter: blur(80px);
          animation: breathe-bottom 18s ease-in-out infinite;
        }
        /* ============================================ */
        /* NUVENS DE LUZ — orgânicas, núcleo + halo     */
        /* ============================================ */
        .light-cloud {
          position: absolute;
          mix-blend-mode: screen;
          will-change: transform, opacity;
          filter: blur(100px);
        }
        /* Nuvem 1 — rosa-coral com núcleo (topo-esquerda) */
        .light-cloud-1 {
          width: 55vw;
          height: 40vh;
          background: radial-gradient(
            ellipse at 45% 50%,
            rgba(255, 255, 255, 0.25) 0%,
            rgba(255, 180, 200, 0.4) 5%,
            rgba(232, 90, 130, 0.4) 18%,
            rgba(180, 60, 110, 0.2) 40%,
            transparent 75%
          );
          border-radius: 60% 40% 55% 45% / 45% 60% 40% 55%;
          top: 12vh;
          left: -10vw;
          animation: float-1 45s ease-in-out infinite;
        }
        /* Nuvem 2 — roxo profundo (centro-direita) */
        .light-cloud-2 {
          width: 60vw;
          height: 45vh;
          background: radial-gradient(
            ellipse at 55% 50%,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(200, 140, 220, 0.35) 6%,
            rgba(120, 60, 140, 0.4) 20%,
            rgba(70, 30, 100, 0.2) 45%,
            transparent 75%
          );
          border-radius: 50% 60% 40% 55% / 60% 45% 55% 40%;
          top: 25vh;
          right: -15vw;
          animation: float-2 52s ease-in-out infinite;
          animation-delay: -10s;
        }
        /* Nuvem 3 — azul-petróleo (centro-baixo) */
        .light-cloud-3 {
          width: 65vw;
          height: 35vh;
          background: radial-gradient(
            ellipse at 50% 50%,
            rgba(255, 255, 255, 0.22) 0%,
            rgba(140, 200, 220, 0.4) 6%,
            rgba(27, 77, 92, 0.5) 20%,
            rgba(15, 45, 60, 0.25) 45%,
            transparent 75%
          );
          border-radius: 55% 45% 60% 40% / 50% 55% 45% 50%;
          top: 48vh;
          left: 15vw;
          animation: float-3 48s ease-in-out infinite;
          animation-delay: -20s;
        }
        /* Nuvem 4 — rosa-coral suave (baixo-direita) */
        .light-cloud-4 {
          width: 50vw;
          height: 38vh;
          background: radial-gradient(
            ellipse at 50% 50%,
            rgba(255, 255, 255, 0.18) 0%,
            rgba(255, 170, 195, 0.35) 6%,
            rgba(232, 90, 130, 0.3) 22%,
            rgba(150, 50, 100, 0.15) 48%,
            transparent 78%
          );
          border-radius: 45% 55% 50% 50% / 60% 40% 50% 50%;
          bottom: 12vh;
          right: 0vw;
          animation: float-4 55s ease-in-out infinite;
          animation-delay: -30s;
        }
        /* Nuvem 5 — roxo profundo acento (topo-direita) */
        .light-cloud-5 {
          width: 45vw;
          height: 32vh;
          background: radial-gradient(
            ellipse at 50% 50%,
            rgba(255, 255, 255, 0.16) 0%,
            rgba(180, 130, 200, 0.3) 7%,
            rgba(80, 40, 120, 0.35) 22%,
            rgba(50, 25, 80, 0.18) 48%,
            transparent 78%
          );
          border-radius: 50% 50% 45% 55% / 55% 45% 50% 50%;
          top: 5vh;
          right: 15vw;
          animation: float-5 50s ease-in-out infinite;
          animation-delay: -15s;
        }
        /* Vinheta sutil pra preservar bordas escuras */
        .vignette-frame {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              ellipse at center,
              transparent 30%,
              rgba(7, 3, 15, 0.3) 75%,
              rgba(7, 3, 15, 0.7) 100%
            );
          pointer-events: none;
        }
        /* ============================================ */
        /* ANIMAÇÕES — movimento lento, orgânico        */
        /* ============================================ */
        @keyframes breathe-top {
          0%, 100% { opacity: 0.9; transform: translateX(-50%) translateY(0) scale(1); }
          50%      { opacity: 1;   transform: translateX(-50%) translateY(-1vh) scale(1.03); }
        }
        @keyframes breathe-bottom {
          0%, 100% { opacity: 0.95; transform: translateX(-50%) translateY(0) scale(1); }
          50%      { opacity: 1;    transform: translateX(-50%) translateY(1vh) scale(1.04); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.85; }
          25%      { transform: translate(8vw, -3vh) scale(1.05); opacity: 1; }
          50%      { transform: translate(14vw, 2vh) scale(0.95); opacity: 0.75; }
          75%      { transform: translate(4vw, 5vh) scale(1.02); opacity: 0.9; }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.9; }
          25%      { transform: translate(-7vw, 4vh) scale(1.05); opacity: 1; }
          50%      { transform: translate(-12vw, -2vh) scale(0.95); opacity: 0.8; }
          75%      { transform: translate(-3vw, -6vh) scale(1.02); opacity: 0.95; }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
          33%      { transform: translate(6vw, -5vh) scale(1.05); opacity: 0.95; }
          66%      { transform: translate(-4vw, 3vh) scale(0.95); opacity: 0.7; }
        }
        @keyframes float-4 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.85; }
          25%      { transform: translate(-5vw, -4vh) scale(1.05); opacity: 1; }
          50%      { transform: translate(-10vw, 2vh) scale(0.95); opacity: 0.75; }
          75%      { transform: translate(-3vw, 5vh) scale(1.02); opacity: 0.9; }
        }
        @keyframes float-5 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.75; }
          50%      { transform: translate(-6vw, 4vh) scale(1.1); opacity: 0.95; }
        }
        /* ============================================ */
        /* RESPONSIVIDADE MOBILE — ajustes nativos      */
        /* ============================================ */
        @media (max-width: 768px) {
          /* Blur menor pra performance mobile */
          .light-top { filter: blur(50px); }
          .light-bottom { filter: blur(60px); }
          .light-cloud { filter: blur(70px); }
          /* Nuvens redimensionadas pra mobile (altura proporcional) */
          .light-cloud-1 {
            width: 90vw;
            height: 30vh;
            top: 10vh;
            left: -20vw;
          }
          .light-cloud-2 {
            width: 90vw;
            height: 35vh;
            top: 25vh;
            right: -25vw;
          }
          .light-cloud-3 {
            width: 100vw;
            height: 30vh;
            top: 48vh;
            left: -10vw;
          }
          .light-cloud-4 {
            width: 85vw;
            height: 30vh;
            bottom: 10vh;
            right: -15vw;
          }
          .light-cloud-5 {
            width: 80vw;
            height: 28vh;
            top: 8vh;
            right: -10vw;
          }
          /* Movimentos menores em mobile (menos vw) */
          @keyframes float-1 {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.85; }
            50%      { transform: translate(4vw, 2vh) scale(1.03); opacity: 1; }
          }
          @keyframes float-2 {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.9; }
            50%      { transform: translate(-4vw, 2vh) scale(1.03); opacity: 1; }
          }
          @keyframes float-3 {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
            50%      { transform: translate(3vw, -2vh) scale(1.03); opacity: 0.95; }
          }
          @keyframes float-4 {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.85; }
            50%      { transform: translate(-3vw, -2vh) scale(1.03); opacity: 1; }
          }
          @keyframes float-5 {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.75; }
            50%      { transform: translate(-3vw, 2vh) scale(1.05); opacity: 0.9; }
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .light-top,
          .light-bottom,
          .light-cloud { animation: none; }
        }
      `}</style>
    </div>
  );
}
