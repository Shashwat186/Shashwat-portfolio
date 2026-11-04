"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import CopyEmail, { CopyIcon } from "./CopyEmail";

export default function MobileMenu({ items, email }: { items: string[]; email: string }) {
  const [open, setOpen] = useState(false);
  // false during server render, true in the browser, so the portal only renders client-side.
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const close = () => window.innerWidth >= 1280 && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  // The nav's backdrop-filter traps fixed children inside it, so the overlay is portalled to <body>.
  const overlay = (
    <div id="mobile-menu" className={`mobile-menu xl:hidden ${open ? "mobile-menu--open" : ""}`} aria-hidden={!open}>
      <nav className="flex h-full flex-col justify-center px-8" aria-label="Mobile">
        <p className="eyebrow mb-8">Navigate</p>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={item} className="mobile-menu-item" style={{ transitionDelay: open ? `${80 + index * 45}ms` : "0ms" }}>
              <a href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} className="flex items-baseline gap-4 py-2 text-4xl font-semibold tracking-[-.04em] text-white transition hover:text-cyan-200">
                <span className="text-xs font-medium tracking-normal text-slate-500">0{index + 1}</span>{item}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-item mt-12 border-t border-white/10 pt-6" style={{ transitionDelay: open ? `${80 + items.length * 45}ms` : "0ms" }}>
          <a href="#contact" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} className="button-primary">Let&apos;s talk <span aria-hidden="true">→</span></a>
          <CopyEmail email={email} tabIndex={open ? 0 : -1} className="mt-4 flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">{email}<CopyIcon /></CopyEmail>
        </div>
      </nav>
    </div>
  );

  return (
    <>
      <button type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/10 xl:hidden">
        <span className={`hamburger ${open ? "hamburger--open" : ""}`} aria-hidden="true"><span /><span /></span>
      </button>
      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
