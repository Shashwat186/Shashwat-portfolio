"use client";

import Image from "next/image";
import { KeyboardEvent, useRef, useState } from "react";
import { ExperienceEntry } from "@/types/resume";

const logos: Record<string, string> = {
  genpact: "/genpact-logo-black.png",
  blockstash: "/blockstash-logo.png",
};

const brandOf = (company: string) => Object.keys(logos).find((key) => company.toLowerCase().includes(key)) ?? "default";
// On short desktop screens (see the "short" variant in globals.css) only the top highlights show until expanded.
const SHORT_SCREEN_VISIBLE = 6;
// Short lists read best as one aligned column; two columns only pay off for long ones.
const TWO_COLUMN_MIN = 4;

const shortName = (company: string) => company.split(/[ ,]/)[0];

export default function ExperienceTabs({ experience }: { experience: ExperienceEntry[] }) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const select = (index: number) => { setActive(index); setExpanded(false); };
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = experience[active];
  const brand = brandOf(item.company);

  // Arrow keys move between tabs, per the WAI-ARIA tabs pattern.
  const onKeyDown = (event: KeyboardEvent) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    const next = (active + step + experience.length) % experience.length;
    select(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="mt-8 short:mt-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Companies" className="flex flex-wrap gap-2" onKeyDown={onKeyDown}>
        {experience.map((entry, index) => (
          <button
            key={entry.company}
            ref={(el) => { tabs.current[index] = el; }}
            type="button"
            role="tab"
            id={`experience-tab-${index}`}
            aria-selected={index === active}
            aria-controls="experience-panel"
            tabIndex={index === active ? 0 : -1}
            onClick={() => select(index)}
            className={`experience-tab ${index === active ? "is-active" : ""}`}
          >
            {shortName(entry.company)}
            <span className="experience-tab-period">{entry.period}</span>
          </button>
        ))}
      </div>
        {!expanded && item.highlights.length > SHORT_SCREEN_VISIBLE && <button type="button" onClick={() => setExpanded(true)} aria-controls="experience-panel" className="show-more hidden short:inline-flex">Show {item.highlights.length - SHORT_SCREEN_VISIBLE} more highlights <span aria-hidden="true">↓</span></button>}
      </div>

      <article key={active} id="experience-panel" role="tabpanel" aria-labelledby={`experience-tab-${active}`} className={`glass-card experience-card experience-card--${brand} experience-panel mt-4 p-6 sm:p-8 short:p-6`}>
        <div className="company-watermark" aria-hidden="true">
          {brand in logos ? <Image src={logos[brand]} alt="" width={860} height={260} className="company-logo" /> : <span>{shortName(item.company)}</span>}
        </div>
        <div className="experience-content">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <div><h3 className="text-xl font-medium text-white">{item.title}</h3><p className="mt-1 text-slate-400">{item.company}</p></div>
            <p className="text-sm text-cyan-100/80">{item.period}</p>
          </div>
          <ul className={`mt-5 gap-x-10 text-sm leading-[1.6] text-slate-300 ${item.highlights.length > TWO_COLUMN_MIN ? "lg:columns-2" : ""}`}>
            {item.highlights.map((highlight, index) => <li key={highlight} className={`mb-2.5 flex break-inside-avoid gap-3 ${index >= SHORT_SCREEN_VISIBLE && !expanded ? "short:hidden" : ""}`}><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />{highlight}</li>)}
          </ul>
        </div>
      </article>
    </div>
  );
}
