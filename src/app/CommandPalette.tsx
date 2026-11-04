"use client";

import { KeyboardEvent, useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Contact } from "@/types/resume";
import { copyEmail } from "./CopyEmail";

type Command = { label: string; hint: string; keywords?: string; run: () => void };

const sectionKeywords: Record<string, string> = { Work: "experience jobs" };

function Palette({ commands, onClose }: { commands: Command[]; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const search = query.trim().toLowerCase();
  const matches = commands.filter((command) => `${command.label} ${command.keywords ?? ""}`.toLowerCase().includes(search));

  // Runs inside the click or keypress, since browsers only allow new tabs, clipboard writes and downloads during one.
  const select = (command: Command) => {
    onClose();
    command.run();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") return onClose();
    // The input is the only tab stop, so this keeps focus inside the dialog.
    if (event.key === "Tab") return event.preventDefault();
    if (event.key === "Enter") {
      // Closing returns focus to the opener, and an unhandled Enter would then click it and reopen the palette.
      event.preventDefault();
      if (matches[active]) select(matches[active]);
      return;
    }
    if ((event.key === "ArrowDown" || event.key === "ArrowUp") && matches.length > 0) {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((active + step + matches.length) % matches.length);
    }
  };

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active]);

  // Locking body scroll would remove the scrollbar and shift the page, so wheel events are stopped here instead.
  useEffect(() => {
    const overlay = overlayRef.current;
    const stopWheel = (event: WheelEvent) => {
      if (!listRef.current?.contains(event.target as Node)) event.preventDefault();
    };
    overlay?.addEventListener("wheel", stopWheel, { passive: false });
    return () => overlay?.removeEventListener("wheel", stopWheel);
  }, []);

  return (
    <div ref={overlayRef} className="palette-overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label="Command menu" className="palette" onKeyDown={onKeyDown}>
        <input
          autoFocus
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-autocomplete="list"
          aria-activedescendant={matches[active] ? `palette-option-${active}` : undefined}
          aria-label="Search commands"
          placeholder="Where to?"
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          className="palette-input"
        />
        <ul ref={listRef} id="palette-list" role="listbox" aria-label="Commands" className="palette-list">
          {matches.map((command, index) => (
            <li
              key={command.label}
              id={`palette-option-${index}`}
              role="option"
              aria-selected={index === active}
              className={`palette-option ${index === active ? "is-active" : ""}`}
              onMouseMove={() => setActive(index)}
              onClick={() => select(command)}
            >
              {command.label}<span className="palette-hint">{command.hint}</span>
            </li>
          ))}
        </ul>
        {matches.length === 0 && <p className="palette-empty">No results</p>}
        <p className="palette-footer" aria-hidden="true"><span>↑↓ navigate</span><span>↵ select</span><span>esc close</span></p>
      </div>
    </div>
  );
}

export default function CommandPalette({ items, contact, resumeDownload }: { items: string[]; contact: Contact; resumeDownload: { href: string; download: string } }) {
  const [open, setOpen] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);
  // false during server render, so the hint can differ on Mac without a hydration mismatch.
  const isMac = useSyncExternalStore(() => () => {}, () => /Mac|iPhone|iPad/.test(navigator.platform), () => false);

  const show = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.altKey || event.shiftKey || event.key.toLowerCase() !== "k") return;
      event.preventDefault();
      if (open) close();
      else show();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, show, close]);

  const commands: Command[] = [
    ...["Top", ...items].map((item) => ({
      label: item,
      hint: "Section",
      keywords: sectionKeywords[item],
      run: () => document.getElementById(item.toLowerCase())?.scrollIntoView(),
    })),
    { label: "Copy email", hint: contact.email, keywords: "mail contact", run: () => copyEmail(contact.email, "Copied!") },
    { label: "Open LinkedIn", hint: "New tab", keywords: "profile social", run: () => window.open(contact.linkedin, "_blank", "noopener,noreferrer") },
    {
      label: "Download résumé",
      hint: "PDF",
      keywords: "resume cv",
      run: () => {
        const link = document.createElement("a");
        link.href = resumeDownload.href;
        link.download = resumeDownload.download;
        link.click();
      },
    },
  ];

  return (
    <>
      <button type="button" onClick={show} aria-label="Open command menu" aria-keyshortcuts="Control+K Meta+K" title="Open command menu" className="palette-trigger">{isMac ? "⌘ K" : "Ctrl K"}</button>
      {open && createPortal(<Palette commands={commands} onClose={close} />, document.body)}
    </>
  );
}
