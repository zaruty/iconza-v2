"use client";
export default function AuroraBackground() {
  return (
    <div className="aurora-wrapper" aria-hidden="true">
      <div className="glow glow-blue"></div>
      <div className="glow glow-coral"></div>
      <div className="glow glow-gold"></div>
      <div className="glow glow-violet"></div>
      <div className="vignette-edges"></div>
      <style jsx>{`
        .aurora-wrapper {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
          background: #07030f;
        }
        .glow {
          position: absolute;
          border-radius: 50%;
          mix-blend-mode: screen;
          will-change: transform, opacity;
          filter: blur(140px);
        }
        /* AZUL PROFUNDO — central-esquerda, saturação alta */
        .glow-blue {
          width: 50vw;
          height: 50vw;
          max-width: 800px;
          max-height: 800px;
          background: radial-gradient(
            circle,
            rgba(58, 134, 255, 0.85) 0%,
            rgba(58, 134, 255, 0.3) 35%,
            transparent 65%
          );
          top: 15vh;
          left: 5vw;
          opacity: 0.75;
          animation: drift-blue 28s ease-in-out infinite;
        }
        /* CORAL/ROSA — centro-baixo, vivo */
        .glow-coral {
          width: 55vw;
          height: 55vw;
          max-width: 850px;
          max-height: 850px;
          background: radial-gradient(
            circle,
            rgba(255, 100, 130, 0.75) 0%,
            rgba(255, 100, 130, 0.25) 35%,
            transparent 65%
          );
          bottom: 5vh;
          left: 30vw;
          opacity: 0.7;
          animation: drift-coral 32s ease-in-out infinite;
          animation-delay: -8s;
        }
        /* DOURADO — central-direita, presente */
        .glow-gold {
          width: 48vw;
          height: 48vw;
          max-width: 750px;
          max-height: 750px;
          background: radial-gradient(
            circle,
            rgba(255, 195, 40, 0.7) 0%,
            rgba(255, 195, 40, 0.22) 35%,
            transparent 65%
          );
          top: 20vh;
          right: 5vw;
          opacity: 0.65;
          animation: drift-gold 36s ease-in-out infinite;
          animation-delay: -16s;
        }
        /* VIOLETA — apenas toque, topo central */
        .glow-violet {
          width: 42vw;
          height: 42vw;
          max-width: 650px;
          max-height: 650px;
          background: radial-gradient(
            circle,
            rgba(160, 90, 245, 0.5) 0%,
            rgba(160, 90, 245, 0.15) 35%,
            transparent 65%
          );
          top: -15vh;
          left: 35vw;
          opacity: 0.5;
          animation: drift-violet 40s ease-in-out infinite;
          animation-delay: -22s;
        }
        /* VINHETA — escurece bordas, preserva centro com luz */
        .vignette-edges {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 55%,
            rgba(7, 3, 15, 0.4) 85%,
            rgba(7, 3, 15, 0.85) 100%
          );
          pointer-events: none;
        }
        /* MOVIMENTO ELEGANTE — translação lenta e ampla */
        @keyframes drift-blue {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.75; }
          25%      { transform: translate(8vw, -3vh) scale(1.1); opacity: 0.85; }
          50%      { transform: translate(12vw, 5vh) scale(1.05); opacity: 0.6; }
          75%      { transform: translate(4vw, 8vh) scale(0.95); opacity: 0.7; }
        }
        @keyframes drift-coral {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
          25%      { transform: translate(-6vw, -4vh) scale(1.1); opacity: 0.8; }
          50%      { transform: translate(-10vw, -8vh) scale(1.05); opacity: 0.55; }
          75%      { transform: translate(-3vw, -2vh) scale(0.95); opacity: 0.65; }
        }
        @keyframes drift-gold {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.65; }
          25%      { transform: translate(-7vw, 5vh) scale(1.1); opacity: 0.75; }
          50%      { transform: translate(-12vw, 2vh) scale(1.05); opacity: 0.5; }
          75%      { transform: translate(-4vw, -3vh) scale(0.95); opacity: 0.6; }
        }
        @keyframes drift-violet {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          33%      { transform: translate(5vw, 6vh) scale(1.1); opacity: 0.6; }
          66%      { transform: translate(-3vw, 10vh) scale(0.95); opacity: 0.4; }
        }
        @media (prefers-reduced-motion: reduce) {
          .glow { animation: none; }
        }
      `}</style>
    </div>
  );
}
