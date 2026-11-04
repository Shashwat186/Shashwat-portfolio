"use client";

import { useEffect } from "react";

// Hides only what starts below the fold, and only once JS is running, so nothing flashes on load and the page still works without JS.
export default function ScrollReveal() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter((el) => el.getBoundingClientRect().top > window.innerHeight);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("reveal-hidden");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    targets.forEach((el) => {
      el.classList.add("reveal-hidden");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
