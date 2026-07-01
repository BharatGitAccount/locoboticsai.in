"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import GlobeVisual from "./GlobeVisual";
import { STATS } from "@/data/content";
import { fadeUp, staggerContainer } from "./motion/Reveal";

/**
 * Hero section — the conversion-critical first fold.
 * Left column: headline, sub-headline, CTAs and headline stats.
 * Right column: animated spatial-data globe visualization.
 */
export default function Hero() {
  return (
    <section
      id="platform"
      className="relative overflow-hidden pt-28 pb-20 sm:pt-36 lg:pt-40"
    >
      {/* Spatial grid backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-radial-fade" />
      {/* Accent radial glows */}
      <div className="pointer-events-none absolute -top-24 left-1/3 -z-10 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-40 right-0 -z-10 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* Copy column */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          {/* Eyebrow badge */}
          <motion.div
            variants={fadeUp}
            className="glass mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-cyan-200 lg:mx-0"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Location-based intelligence, reimagined
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Spatial Intelligence <br className="hidden sm:block" />
            for the <span className="text-gradient">AI Era.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg lg:mx-0"
          >
            Transform complex location data into actionable intelligence.
            LOCOBOTICS AI empowers enterprises with real-time geographic insights
            and predictive spatial modeling.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start"
          >
            <a
              href="#solutions"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-400/40 hover:brightness-110 sm:w-auto"
            >
              Start Building
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#platform"
              className="glass inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-slate-100 transition-colors hover:border-cyan-400/40 hover:text-cyan-200 sm:w-auto"
            >
              Explore the Platform
            </a>
          </motion.div>

          {/* Headline stats */}
          <motion.dl
            variants={fadeUp}
            className="mt-12 grid grid-cols-2 gap-6 border-t border-white/5 pt-8 sm:grid-cols-4 lg:max-w-lg"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-bold text-white">{stat.value}</dd>
                <dd className="mt-1 text-xs text-slate-500">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Visual column */}
        <div className="relative">
          <GlobeVisual />
        </div>
      </div>
    </section>
  );
}
