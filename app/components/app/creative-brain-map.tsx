import { MOCK_UNIVERSES } from "@/app/lib/app/mock-student";

export function CreativeBrainMap() {
  const nodes = MOCK_UNIVERSES.map((universe, index) => {
    const angle = (index / MOCK_UNIVERSES.length) * Math.PI * 2 - Math.PI / 2;
    const radius = 68;
    const cx = 120 + Math.cos(angle) * radius;
    const cy = 110 + Math.sin(angle) * radius;
    const isActive = universe.status === "active";
    const isAvailable = universe.status === "available";

    return {
      ...universe,
      cx,
      cy,
      isActive,
      isAvailable,
    };
  });

  return (
    <div className="creative-brain-map" aria-label="Mapa mental dos universos">
      <svg viewBox="0 0 240 220" className="creative-brain-map__svg" aria-hidden>
        <defs>
          <radialGradient id="brainGlow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="rgba(123,136,255,0.35)" />
            <stop offset="100%" stopColor="rgba(123,136,255,0)" />
          </radialGradient>
        </defs>

        <ellipse cx="120" cy="110" rx="88" ry="78" fill="url(#brainGlow)" />

        <path
          d="M120 42 C88 42 62 68 58 98 C54 128 72 158 98 168 C108 172 118 174 120 174 C122 174 132 172 142 168 C168 158 186 128 182 98 C178 68 152 42 120 42 Z"
          fill="rgba(123,136,255,0.08)"
          stroke="rgba(180,210,255,0.22)"
          strokeWidth="1.2"
        />

        <path
          d="M120 58 C104 58 92 72 90 88 C88 104 96 122 108 128 M120 58 C136 58 148 72 150 88 C152 104 144 122 132 128"
          fill="none"
          stroke="rgba(180,210,255,0.16)"
          strokeWidth="1"
        />

        {nodes.map((node) => (
          <line
            key={`line-${node.id}`}
            x1="120"
            y1="110"
            x2={node.cx}
            y2={node.cy}
            stroke={
              node.isActive
                ? "rgba(123,136,255,0.45)"
                : "rgba(180,210,255,0.12)"
            }
            strokeWidth={node.isActive ? 1.4 : 1}
          />
        ))}

        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.isActive ? 14 : 11}
              fill={
                node.isActive || node.isAvailable
                  ? node.accentMuted
                  : "rgba(255,255,255,0.04)"
              }
              stroke={
                node.isActive
                  ? node.accent
                  : node.isAvailable
                    ? "rgba(180,210,255,0.28)"
                    : "rgba(180,210,255,0.12)"
              }
              strokeWidth="1.2"
              opacity={node.status === "locked" ? 0.45 : 1}
            />
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.isActive ? 4 : 3}
              fill={
                node.isActive || node.isAvailable
                  ? node.accent
                  : "rgba(180,210,255,0.25)"
              }
              opacity={node.status === "locked" ? 0.35 : 1}
            />
          </g>
        ))}

        <circle cx="120" cy="110" r="10" fill="rgba(123,136,255,0.25)" />
        <circle cx="120" cy="110" r="4" fill="#7B88FF" />
      </svg>

      <ul className="creative-brain-map__legend">
        {nodes.map((node) => (
          <li key={`legend-${node.id}`} className="creative-brain-map__legend-item">
            <span
              className="creative-brain-map__dot"
              style={{
                background: node.isActive || node.isAvailable ? node.accent : "rgba(180,210,255,0.25)",
                opacity: node.status === "locked" ? 0.4 : 1,
              }}
            />
            <span
              className={`creative-brain-map__name font-subtitle ${node.status === "locked" ? "is-locked" : ""}`}
            >
              {node.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
