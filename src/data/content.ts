import {
  Route,
  Database,
  Radar,
  Truck,
  Building2,
  Car,
  Store,
} from "lucide-react";
import type {
  NavLink,
  Feature,
  UseCase,
  Stat,
  FooterColumn,
} from "@/types";

/** Primary navigation links (single-page anchors). */
export const NAV_LINKS: NavLink[] = [
  { label: "Solutions", href: "#solutions" },
  { label: "Platform", href: "#platform" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Company", href: "#company" },
];

/** Core solutions shown in the features section. */
export const FEATURES: Feature[] = [
  {
    icon: Route,
    title: "Predictive Routing",
    description:
      "AI-driven route optimization and logistics that adapt to traffic, weather, and demand in real time — cutting fuel costs and delivery windows.",
    accent: "from-cyan-400 to-blue-500",
  },
  {
    icon: Database,
    title: "Geospatial Analytics",
    description:
      "Process millions of location data points in milliseconds. Surface patterns, clusters, and anomalies across your entire geographic footprint.",
    accent: "from-blue-500 to-purple-500",
  },
  {
    icon: Radar,
    title: "Geo-Fencing & Automation",
    description:
      "Trigger automated workflows based on real-time entity locations. Define smart boundaries and let LOCOBOTICS AI act the moment they're crossed.",
    accent: "from-purple-500 to-fuchsia-500",
  },
];

/** Industries served, laid out as a bento grid. */
export const USE_CASES: UseCase[] = [
  {
    icon: Truck,
    title: "Supply Chain & Logistics",
    description:
      "End-to-end fleet visibility and predictive ETAs across global networks.",
    span: "md:col-span-2 md:row-span-2",
    accent: "from-cyan-500/20 to-blue-500/10",
    visual: "logistics",
  },
  {
    icon: Building2,
    title: "Smart Cities",
    description: "Urban flow modeling for infrastructure and public services.",
    span: "md:col-span-1 md:row-span-1",
    accent: "from-blue-500/20 to-indigo-500/10",
    visual: "city",
  },
  {
    icon: Car,
    title: "Autonomous Vehicles",
    description: "High-definition spatial context for safe navigation.",
    span: "md:col-span-1 md:row-span-1",
    accent: "from-purple-500/20 to-fuchsia-500/10",
    visual: "vehicle",
  },
  {
    icon: Store,
    title: "Retail Footfall Analytics",
    description:
      "Understand visitor movement, dwell time, and catchment areas to optimize every location.",
    span: "md:col-span-2 md:row-span-1",
    accent: "from-fuchsia-500/20 to-purple-500/10",
    visual: "footfall",
  },
];

/** Headline metrics used as social proof in the hero. */
export const STATS: Stat[] = [
  { value: "12B+", label: "Data points / day" },
  { value: "<40ms", label: "Query latency" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "180+", label: "Countries mapped" },
];

/** Footer link groups. */
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "#platform" },
      { label: "Solutions", href: "#solutions" },
      { label: "Use Cases", href: "#use-cases" },
      { label: "Pricing", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#company" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Security", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
];
