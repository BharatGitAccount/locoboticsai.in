"use client";

import { motion } from "framer-motion";

/**
 * Placeholder for a complex 3D globe / spatial data-network visualization.
 *
 * Built entirely with CSS + SVG (no external assets) so it renders instantly:
 * - Concentric rotating orbital rings suggest a rotating planet / radar sweep.
 * - Latitude/longitude arcs form a wireframe globe.
 * - Pulsing nodes + connecting lines represent live geographic data points.
 *
 * Swap this out for a WebGL/Three.js globe later without touching the Hero.
 */
export default function GlobeVisual() {
  // Data "nodes" positioned around the globe (percentage coordinates).
  const nodes = [
    { top: "18%", left: "30%", delay: "0s" },
    { top: "32%", left: "72%", delay: "0.6s" },
    { top: "55%", left: "20%", delay: "1.2s" },
    { top: "68%", left: "62%", delay: "0.3s" },
    { top: "44%", left: "48%", delay: "0.9s" },
    { top: "78%", left: "38%", delay: "1.5s" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="relative mx-auto aspect-square w-full max-w-[34rem]"
    >
      {/* Ambient glow behind the globe */}
      <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute inset-8 rounded-full bg-purple-500/10 blur-3xl" />

      {/* Rotating outer orbital ring with a traveling satellite node */}
      <div className="animate-spin-slow absolute inset-0">
        <div className="absolute inset-0 rounded-full border border-cyan-400/20" />
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_16px_4px_rgba(34,211,238,0.7)]" />
      </div>

      {/* Counter-rotating middle ring */}
      <div className="animate-spin-slower absolute inset-6">
        <div className="absolute inset-0 rounded-full border border-purple-400/20" />
        <span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-purple-300 shadow-[0_0_14px_3px_rgba(168,85,247,0.7)]" />
      </div>

      {/* Wireframe globe */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-12 h-[calc(100%-6rem)] w-[calc(100%-6rem)]"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="globeFill" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#0e7490" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#1e293b" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="meridian" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Sphere body */}
        <circle cx="100" cy="100" r="80" fill="url(#globeFill)" />
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="#22d3ee"
          strokeOpacity="0.35"
        />

        {/* Longitude ellipses */}
        {[80, 55, 28].map((rx) => (
          <ellipse
            key={`lon-${rx}`}
            cx="100"
            cy="100"
            rx={rx}
            ry="80"
            fill="none"
            stroke="url(#meridian)"
            strokeWidth="0.75"
          />
        ))}

        {/* Latitude lines */}
        {[-45, 0, 45].map((offset) => (
          <ellipse
            key={`lat-${offset}`}
            cx="100"
            cy={100 + offset}
            rx="80"
            ry="18"
            fill="none"
            stroke="#38bdf8"
            strokeOpacity="0.25"
            strokeWidth="0.75"
            transform={`rotate(0 100 ${100 + offset})`}
          />
        ))}
      </svg>

      {/* Live data nodes */}
      {nodes.map((node, i) => (
        <span
          key={i}
          className="animate-pulse-glow absolute h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_3px_rgba(34,211,238,0.6)]"
          style={{ top: node.top, left: node.left, animationDelay: node.delay }}
        />
      ))}

      {/* Connective data lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g stroke="#a855f7" strokeOpacity="0.35" strokeWidth="0.3">
          <line x1="30" y1="18" x2="48" y2="44" />
          <line x1="48" y1="44" x2="72" y2="32" />
          <line x1="48" y1="44" x2="20" y2="55" />
          <line x1="48" y1="44" x2="62" y2="68" />
          <line x1="62" y1="68" x2="38" y2="78" />
        </g>
      </svg>
    </motion.div>
  );
}
