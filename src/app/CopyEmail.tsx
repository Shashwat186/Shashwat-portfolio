"use client";

import { ComponentProps, useEffect, useState } from "react";

const TOAST_EVENT = "copy-email-toast";

async function copyEmail(email: string, success: string) {
  let detail = { message: success, duration: 2200 };
  try {
    await navigator.clipboard.writeText(email);
  } catch {
    // Clipboard can be blocked or unavailable, so show the address for the visitor to copy by hand.
    detail = { message: `Couldn't copy. Email: ${email}`, duration: 6000 };
  }
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail }));
}

export default function CopyEmail({ email, className = "", ...props }: { email: string } & ComponentProps<"button">) {
  return <button type="button" title="Copy email address" aria-label={`Copy email address ${email}`} onClick={() => copyEmail(email, "Copied!")} className={`cursor-pointer ${className}`} {...props} />;
}

// For "contact me" buttons: still opens the mail app, and copies too in case there isn't one.
export function MailLink({ email, ...props }: { email: string } & ComponentProps<"a">) {
  return <a href={`mailto:${email}`} onClick={() => copyEmail(email, "Email address copied")} {...props} />;
}

export function CopyIcon() {
  return <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 opacity-70" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" /></svg>;
}

export function CopyToast() {
  const [toast, setToast] = useState({ message: "", visible: false });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const show = (event: Event) => {
      const { message, duration } = (event as CustomEvent<{ message: string; duration: number }>).detail;
      clearTimeout(timer);
      setToast({ message, visible: true });
      timer = setTimeout(() => setToast((current) => ({ ...current, visible: false })), duration);
    };
    window.addEventListener(TOAST_EVENT, show);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(TOAST_EVENT, show);
    };
  }, []);

  return <div role="status" className={`copy-toast ${toast.visible ? "is-visible" : ""}`}>{toast.message}</div>;
}
