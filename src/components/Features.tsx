"use client";

import { motion } from "framer-motion";
import { FEATURES } from "@/data/content";
import { fadeUp, staggerContainer } from "./motion/Reveal";

/**
 * "Beyond Basic Mapping" — three core solution cards.
 * Each card uses glassmorphism, a gradient icon badge, and a glowing
 * border that intensifies on hover.
 */
export default function Features() {
  return (
    <section id="solutions" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-widest text-cyan-400"
          >
            Solutions
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Beyond Basic Mapping.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-base text-slate-400"
          >
            A unified spatial intelligence platform that turns raw coordinates
            into decisions — at enterprise scale.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass glow-border group relative overflow-hidden rounded-2xl border border-white/10 p-8 transition-colors hover:border-cyan-400/30"
              >
                {/* Hover glow wash */}
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${feature.accent} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30`}
                />

                {/* Icon badge */}
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.accent} shadow-lg`}
                >
                  <Icon className="h-6 w-6 text-slate-950" strokeWidth={2.2} />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {feature.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
