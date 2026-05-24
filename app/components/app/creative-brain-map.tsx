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
        <path
          d="M120 42 C88 42 62 68 58 98 C54 128 72 158 98 168 C108 172 118 174 120 174 C122 174 132 172 142 168 C168 158 186 128 182 98 C178 68 152 42 120 42 Z"
          className="creative-brain-map__brain-fill creative-brain-map__brain-stroke"
          strokeWidth="1.2"
        />

        <path
          d="M120 58 C104 58 92 72 90 88 C88 104 96 122 108 128 M120 58 C136 58 148 72 150 88 C152 104 144 122 132 128"
          fill="none"
          className="creative-brain-map__brain-detail"
          strokeWidth="1"
        />

        {nodes.map((node) => (
          <line
            key={`line-${node.id}`}
            x1="120"
            y1="110"
            x2={node.cx}
            y2={node.cy}
            className={`creative-brain-map__line ${node.isActive ? "is-active" : ""}`}
            stroke={node.isActive || node.isAvailable ? node.accent : undefined}
            strokeWidth={node.isActive ? 1.8 : 1.2}
            strokeOpacity={node.isActive ? 0.72 : node.isAvailable ? 0.42 : 0.22}
          />
        ))}

        {nodes.map((node) => {
          const nodeFill =
            node.isActive || node.isAvailable ? node.accent : "var(--app-map-node-empty)";
          const nodeStroke =
            node.isActive || node.isAvailable ? node.accentDeep : "var(--app-map-stroke)";

          return (
            <g key={node.id}>
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.isActive ? 14 : 11}
                fill={nodeFill}
                stroke={nodeStroke}
                strokeWidth={node.isActive ? 0 : 1.2}
                opacity={node.status === "locked" ? 0.5 : 1}
              />
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.isActive ? 4.5 : 3.5}
                fill={node.isActive || node.isAvailable ? "#FAF9F7" : "var(--app-map-node-muted)"}
                opacity={node.status === "locked" ? 0.45 : 0.92}
              />
            </g>
          );
        })}

        <circle cx="120" cy="110" r="10" className="creative-brain-map__core-outer" />
        <circle cx="120" cy="110" r="4.5" className="creative-brain-map__core-inner" />
      </svg>

      <ul className="creative-brain-map__legend">
        {nodes.map((node) => (
          <li key={`legend-${node.id}`} className="creative-brain-map__legend-item">
            <span
              className="creative-brain-map__dot"
              style={{
                background: node.isActive || node.isAvailable ? node.accent : "var(--app-map-node-muted)",
                opacity: node.status === "locked" ? 0.5 : 1,
              }}
            />
            <span
              className={`creative-brain-map__name font-subtitle ${node.status === "locked" ? "is-locked" : ""}`}
              style={
                node.isActive || node.isAvailable
                  ? { color: node.accentDeep }
                  : undefined
              }
            >
              {node.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
