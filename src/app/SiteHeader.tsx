"use client";

import { ReactNode, useEffect, useState } from "react";

export default function SiteHeader({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <header className={`site-header fixed inset-x-0 top-0 z-20 px-4 pt-4 sm:px-6 ${scrolled ? "is-scrolled" : ""}`}>{children}</header>;
}
