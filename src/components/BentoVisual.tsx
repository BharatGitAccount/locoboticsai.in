import type { BentoVisualKind } from "@/types";

/**
 * Decorative, industry-specific data visualizations that fill each
 * bento-box tile. Pure SVG + CSS (no image assets) so they stay crisp at
 * any size and match the LOCOBOTICS AI spatial theme.
 *
 * Each visual is absolutely positioned to cover its tile; the parent tile
 * applies a bottom gradient mask so the heading/description stay readable.
 */

/** Route/network map — for Supply Chain & Logistics (the large tile). */
function LogisticsVisual() {
  const nodes = [
    { cx: 40, cy: 60 },
    { cx: 120, cy: 40 },
    { cx: 210, cy: 80 },
    { cx: 300, cy: 50 },
    { cx: 90, cy: 130 },
    { cx: 190, cy: 150 },
    { cx: 280, cy: 120 },
  ];

  return (
    <svg
      viewBox="0 0 340 200"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="routeStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      {/* Connecting routes */}
      <g fill="none" stroke="url(#routeStroke)" strokeWidth="1.5">
        <path
          className="animate-dash-flow"
          strokeOpacity="0.7"
          d="M40 60 Q 80 30 120 40 T 210 80 T 300 50"
        />
        <path
          className="animate-dash-flow"
          strokeOpacity="0.5"
          style={{ animationDelay: "1s" }}
          d="M40 60 Q 70 100 90 130 T 190 150 T 280 120"
        />
        <path
          strokeOpacity="0.25"
          d="M120 40 L 90 130 M210 80 L 190 150 M300 50 L 280 120"
        />
      </g>

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.cx}
            cy={n.cy}
            r="6"
            fill="#22d3ee"
            fillOpacity="0.15"
          />
          <circle cx={n.cx} cy={n.cy} r="2.5" fill="#67e8f9" />
        </g>
      ))}
    </svg>
  );
}

/** Top-down city block grid — for Smart Cities. */
function CityVisual() {
  const blocks = [
    { x: 20, y: 18, w: 26, h: 26 },
    { x: 54, y: 18, w: 18, h: 26 },
    { x: 20, y: 52, w: 18, h: 20 },
    { x: 46, y: 52, w: 26, h: 20 },
    { x: 84, y: 18, w: 22, h: 20 },
    { x: 84, y: 46, w: 22, h: 26 },
  ];

  return (
    <svg
      viewBox="0 0 120 90"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      {/* Roads */}
      <g stroke="#38bdf8" strokeOpacity="0.2" strokeWidth="1">
        <line x1="0" y1="48" x2="120" y2="48" />
        <line x1="78" y1="0" x2="78" y2="90" />
        <line x1="42" y1="0" x2="42" y2="90" />
      </g>

      {/* City blocks */}
      {blocks.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx="2"
          fill="#60a5fa"
          fillOpacity="0.1"
          stroke="#93c5fd"
          strokeOpacity="0.35"
          strokeWidth="0.75"
        />
      ))}

      {/* Glowing intersections */}
      {[
        [42, 48],
        [78, 48],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="2"
          fill="#7dd3fc"
          className="animate-pulse-glow"
        />
      ))}
    </svg>
  );
}

/** Lidar road sweep — for Autonomous Vehicles. */
function VehicleVisual() {
  return (
    <svg
      viewBox="0 0 120 90"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      {/* Perspective road */}
      <path
        d="M50 90 L20 90 L52 20 L68 20 Z"
        fill="#a855f7"
        fillOpacity="0.08"
      />
      {/* Lane dashes */}
      <line
        x1="60"
        y1="90"
        x2="60"
        y2="20"
        stroke="#d8b4fe"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        className="animate-dash-flow"
      />

      {/* Lidar scan rings from the sensor */}
      <g>
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx="60"
            cy="26"
            r="16"
            fill="none"
            stroke="#c084fc"
            strokeWidth="1"
            className="animate-radar-ping"
            style={{ animationDelay: `${i}s` }}
          />
        ))}
        <circle cx="60" cy="26" r="3" fill="#e9d5ff" />
      </g>
    </svg>
  );
}

/** Footfall heatmap — for Retail Footfall Analytics. */
function FootfallVisual() {
  const cols = 14;
  const rows = 6;
  const cells = Array.from({ length: cols * rows }, (_, i) => {
    const x = i % cols;
    const y = Math.floor(i / cols);
    // Two hotspot centers; intensity falls off with distance.
    const d1 = Math.hypot(x - 4, y - 2);
    const d2 = Math.hypot(x - 10, y - 4);
    const intensity = Math.max(0, 1 - Math.min(d1, d2) / 5);
    return { x, y, intensity };
  });

  return (
    <svg
      viewBox="0 0 280 120"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      {cells.map((c, i) => (
        <circle
          key={i}
          cx={12 + c.x * 20}
          cy={12 + c.y * 20}
          r={2 + c.intensity * 5}
          fill="#f0abfc"
          fillOpacity={0.12 + c.intensity * 0.75}
        />
      ))}
    </svg>
  );
}

const VISUALS: Record<BentoVisualKind, () => React.ReactElement> = {
  logistics: LogisticsVisual,
  city: CityVisual,
  vehicle: VehicleVisual,
  footfall: FootfallVisual,
};

export default function BentoVisual({ kind }: { kind: BentoVisualKind }) {
  const Visual = VISUALS[kind];
  return <Visual />;
}
