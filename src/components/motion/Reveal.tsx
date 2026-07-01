"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Shared fade-in + slide-up variants used across the site so every
 * section animates consistently as it scrolls into view.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Container variant that staggers the reveal of its children. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay (seconds) before this element animates in. */
  delay?: number;
  /** Render as a stagger container for animating child <Reveal> items. */
  stagger?: boolean;
}

/**
 * Wraps content in a Framer Motion element that fades + slides up the
 * first time it enters the viewport.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  stagger = false,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={stagger ? staggerContainer : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
