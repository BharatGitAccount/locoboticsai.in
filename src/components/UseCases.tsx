"use client";

import { motion } from "framer-motion";
import { USE_CASES } from "@/data/content";
import { fadeUp, staggerContainer } from "./motion/Reveal";
import BentoVisual from "./BentoVisual";

/**
 * "Use Cases" — a modern bento-box grid of industries served.
 * Tiles use variable column/row spans (defined per item in the data file)
 * to create the asymmetric bento layout on md+ screens.
 */
export default function UseCases() {
  return (
    <section id="use-cases" className="relative py-24 sm:py-32">
      {/* Subtle grid backdrop for spatial feel */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-radial-fade opacity-60" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-widest text-purple-400"
          >
            Use Cases
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Built for every industry in motion.
          </motion.h2>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid auto-rows-[13rem] grid-cols-1 gap-4 md:grid-cols-3"
        >
          {USE_CASES.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <motion.article
                key={useCase.title}
                variants={fadeUp}
                whileHover={{ scale: 1.015 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 glass p-6 transition-colors hover:border-cyan-400/30 ${useCase.span}`}
              >
                {/* Gradient wash */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${useCase.accent} opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
                />

                {/* Industry data visualization (fills empty space) */}
                <div className="pointer-events-none absolute inset-0 opacity-70 transition-transform duration-700 group-hover:scale-105">
                  <BentoVisual kind={useCase.visual} />
                </div>

                {/* Bottom fade so the heading + description stay legible */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

                <div className="relative flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 text-cyan-300 backdrop-blur-sm">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>

                <div className="relative">
                  <h3 className="text-lg font-semibold text-white">
                    {useCase.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-300/80">
                    {useCase.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
