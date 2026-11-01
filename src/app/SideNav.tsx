"use client";

import { useEffect, useState } from "react";

export default function SideNav({ items }: { items: string[] }) {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.toLowerCase())).filter((el): el is HTMLElement => el !== null);
    // A section counts as active once it crosses the middle band of the viewport.
    // Observer callbacks can land after the last scroll event, so both paths re-check whether we're back at the hero.
    const nearTop = () => window.scrollY < window.innerHeight * 0.5;
    const observer = new IntersectionObserver((entries) => {
      if (nearTop()) return setActive(-1);
      entries.forEach((entry) => entry.isIntersecting && setActive(sections.indexOf(entry.target as HTMLElement)));
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((section) => observer.observe(section));
    const onScroll = () => nearTop() && setActive(-1);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  // The rail starts at the "back to top" arrow, so the fill runs from it (hero) down to the active section.
  const progress = (active + 1) / items.length;
  const atTop = active < 0;

  return (
    <nav aria-label="Sections" className="side-nav hidden xl:block">
      <div className="side-nav-track" aria-hidden="true"><div className="side-nav-fill" style={{ transform: `scaleY(${progress})` }} /></div>
      <ol className="relative space-y-9">
        <li>
          <a href="#top" className={`side-nav-link ${atTop ? "is-active" : "is-passed"}`} aria-current={atTop ? "true" : undefined} aria-label="Back to top">
            <span className="side-nav-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" /></svg>
            </span>
            <span className="side-nav-label">Top</span>
          </a>
        </li>
        {items.map((item, index) => {
          const state = index === active ? "is-active" : index < active ? "is-passed" : "";
          return (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className={`side-nav-link ${state}`} aria-current={index === active ? "true" : undefined}>
                <span className="side-nav-dot" aria-hidden="true" />
                <span className="side-nav-label"><span className="text-slate-500">0{index + 1}</span> {item}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
