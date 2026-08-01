"use client";

import { useEffect, useState } from "react";

type TypewriterOptions = {
  strings: string[];
  autoStart?: boolean;
  loop?: boolean;
  delay?: number;
  deleteSpeed?: number;
};

export default function Typewriter({ options }: { options: TypewriterOptions }) {
  const { strings, autoStart = true, loop = true, delay = 45, deleteSpeed = 20 } = options;
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!autoStart || strings.length === 0) return;

    const phrase = strings[phraseIndex] ?? "";
    const complete = text === phrase;
    const empty = text.length === 0;

    // A non-looping headline should finish once and never update the page again.
    if (complete && !isDeleting && !loop) return;

    const wait = complete && !isDeleting ? 1650 : empty && isDeleting ? 300 : isDeleting ? deleteSpeed : delay;
    const timer = window.setTimeout(() => {
      if (complete && !isDeleting) return setIsDeleting(true);
      if (empty && isDeleting) {
        setIsDeleting(false);
        return setPhraseIndex((current) => current === strings.length - 1 ? (loop ? 0 : current) : current + 1);
      }
      setText((current) => isDeleting ? current.slice(0, -1) : phrase.slice(0, current.length + 1));
    }, wait);

    return () => window.clearTimeout(timer);
  }, [autoStart, delay, deleteSpeed, isDeleting, loop, phraseIndex, strings, text]);

  return (
    <span className="typewriter-line" aria-label={strings[phraseIndex]}>
      <span className="typewriter">{text}<span className="typewriter-caret" aria-hidden="true" /></span>
    </span>
  );
}
