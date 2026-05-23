"use client";
export default function AuroraBackground() {
  return (
    <div className="aurora-wrapper" aria-hidden="true">
      <div className="gemini-blob gemini-blue"></div>
      <div className="gemini-blob gemini-purple"></div>
      <div className="gemini-blob gemini-pink"></div>
      <div className="gemini-blob gemini-yellow"></div>
      <div className="aurora-vignette"></div>
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
        .gemini-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          mix-blend-mode: screen;
          opacity: 0.6;
          will-change: transform;
        }
        .gemini-blue {
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, #4285f4 0%, transparent 70%);
          top: -10%;
          left: -10%;
          animation: float-blue 18s infinite ease-in-out alternate;
        }
        .gemini-purple {
          width: 45vw;
          height: 45vw;
          background: radial-gradient(circle, #a05af5 0%, transparent 70%);
          top: 20%;
          right: -10%;
          animation: float-purple 22s infinite ease-in-out alternate-reverse;
        }
        .gemini-pink {
          width: 60vw;
          height: 60vw;
          background: radial-gradient(circle, #e37482 0%, transparent 70%);
          bottom: -20%;
          left: 10%;
          animation: float-pink 20s infinite ease-in-out alternate;
        }
        .gemini-yellow {
          width: 40vw;
          height: 40vw;
          background: radial-gradient(circle, #fbbc04 0%, transparent 70%);
          bottom: 10%;
          right: 10%;
          animation: float-yellow 15s infinite ease-in-out alternate-reverse;
        }
        .aurora-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 40%,
            rgba(7, 3, 15, 0.35) 75%,
            rgba(7, 3, 15, 0.7) 100%
          );
          pointer-events: none;
        }
        @keyframes float-blue {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(15vw, 15vh) scale(1.2); }
          100% { transform: translate(-5vw, 25vh) scale(0.9); }
        }
        @keyframes float-purple {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20vw, 10vh) scale(1.1); }
          100% { transform: translate(-10vw, -15vh) scale(1.3); }
        }
        @keyframes float-pink {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10vw, -20vh) scale(0.9); }
          100% { transform: translate(25vw, -5vh) scale(1.2); }
        }
        @keyframes float-yellow {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-15vw, -15vh) scale(1.3); }
          100% { transform: translate(5vw, -25vh) scale(0.8); }
        }
        @media (prefers-reduced-motion: reduce) {
          .gemini-blob { animation: none; }
        }
      `}</style>
    </div>
  );
}
