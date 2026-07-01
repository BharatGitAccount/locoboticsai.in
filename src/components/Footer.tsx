"use client";

import { MapPinned } from "lucide-react";
import { FOOTER_COLUMNS } from "@/data/content";
import { Reveal } from "./motion/Reveal";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "./SocialIcons";

const SOCIALS = [
  { label: "GitHub", href: "#", Icon: GithubIcon },
  { label: "Twitter", href: "#", Icon: TwitterIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
];

/** Clean, minimal site footer with brand, link columns, and socials. */
export default function Footer() {
  return (
    <footer
      id="company"
      className="relative border-t border-white/10 bg-slate-950"
    >
      {/* Faint top glow separating footer from content */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      <Reveal className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2">
            <a href="#" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500">
                <MapPinned
                  className="h-5 w-5 text-slate-950"
                  strokeWidth={2.4}
                />
              </span>
              <span className="text-lg font-semibold tracking-tight">
                <span className="text-gradient">LOCOBOTICS</span>{" "}
                <span className="text-slate-100">AI</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Spatial intelligence for the AI era. Turn location data into
              real-time, enterprise-grade decisions.
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-white">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-cyan-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; 2026 LOCOBOTICS AI, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-slate-500 transition-colors hover:text-slate-300"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-xs text-slate-500 transition-colors hover:text-slate-300"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-xs text-slate-500 transition-colors hover:text-slate-300"
            >
              Cookies
            </a>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
