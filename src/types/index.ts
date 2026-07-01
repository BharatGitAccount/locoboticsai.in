import type { LucideIcon } from "lucide-react";

/** A single navigation entry rendered in the sticky navbar. */
export interface NavLink {
  label: string;
  href: string;
}

/** A feature/solution card in the "Beyond Basic Mapping" section. */
export interface Feature {
  /** Lucide icon component rendered inside the card. */
  icon: LucideIcon;
  title: string;
  description: string;
  /** Tailwind gradient classes used for the icon glow, e.g. "from-cyan-400 to-blue-500". */
  accent: string;
}

/** Identifies which decorative SVG visualization renders inside a bento tile. */
export type BentoVisualKind = "logistics" | "city" | "vehicle" | "footfall";

/** An industry tile in the bento-box "Use Cases" grid. */
export interface UseCase {
  icon: LucideIcon;
  title: string;
  description: string;
  /**
   * Tailwind column/row span classes controlling the tile's footprint
   * within the bento grid (e.g. "md:col-span-2 md:row-span-2").
   */
  span: string;
  accent: string;
  /** Which industry-themed data visualization fills the tile background. */
  visual: BentoVisualKind;
}

/** A single measurable stat shown as social proof. */
export interface Stat {
  value: string;
  label: string;
}

/** A grouped column of links within the footer. */
export interface FooterColumn {
  title: string;
  links: NavLink[];
}
