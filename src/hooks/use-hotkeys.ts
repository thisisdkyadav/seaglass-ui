import { useEffect, useRef } from "react";

export const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

export interface HotkeyOptions {
  /** Fire even while the user is typing in an input, textarea or contenteditable. Default false. */
  enableInInputs?: boolean;
  /** Turn the binding off without unmounting. Default true. */
  enabled?: boolean;
  /** Call preventDefault when the combo matches. Default true. */
  preventDefault?: boolean;
}

/** Parses "mod+k", "shift+d", "[", "?" … `mod` is ⌘ on Apple platforms and Ctrl elsewhere. */
export function matchHotkey(e: KeyboardEvent, combo: string): boolean {
  const parts = combo.toLowerCase().split("+").map((p) => p.trim());
  const key = parts.pop()!;
  const want = {
    meta: parts.includes("meta") || (parts.includes("mod") && isMac),
    ctrl: parts.includes("ctrl") || (parts.includes("mod") && !isMac),
    shift: parts.includes("shift"),
    alt: parts.includes("alt") || parts.includes("option"),
  };
  if (e.metaKey !== want.meta || e.ctrlKey !== want.ctrl || e.altKey !== want.alt) return false;
  const k = e.key.toLowerCase();
  // shifted symbols ("?") arrive with shiftKey set: only enforce shift when it was asked for or the key is a letter
  if (want.shift !== e.shiftKey && (want.shift || /^[a-z0-9]$/.test(k))) return false;
  const named: Record<string, string> = { esc: "escape", space: " ", enter: "enter", up: "arrowup", down: "arrowdown", left: "arrowleft", right: "arrowright" };
  return k === (named[key] ?? key) || e.code.toLowerCase() === "key" + key;
}

function typingIn(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  return el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
}

/**
 * Binds one or more keyboard shortcuts on window.
 *   useHotkeys("mod+k", openPalette)
 *   useHotkeys(["[", "mod+b"], toggleSidebar)
 */
export function useHotkeys(combos: string | string[], handler: (e: KeyboardEvent) => void, options: HotkeyOptions = {}) {
  const { enableInInputs = false, enabled = true, preventDefault = true } = options;
  const handlerRef = useRef(handler);
  handlerRef.current = handler;
  const key = Array.isArray(combos) ? combos.join("|") : combos;

  useEffect(() => {
    if (!enabled) return;
    const list = key.split("|");
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.isComposing) return;
      if (!enableInInputs && typingIn(e.target)) return;
      if (!list.some((c) => matchHotkey(e, c))) return;
      if (preventDefault) e.preventDefault();
      handlerRef.current(e);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [key, enabled, enableInInputs, preventDefault]);
}

/** Renders a combo for display: "mod+k" → ["⌘", "K"] on Mac, ["Ctrl", "K"] elsewhere. */
export function formatHotkey(combo: string): string[] {
  const map: Record<string, string> = isMac
    ? { mod: "⌘", meta: "⌘", ctrl: "⌃", shift: "⇧", alt: "⌥", option: "⌥", enter: "↵", esc: "Esc", escape: "Esc", up: "↑", down: "↓", left: "←", right: "→", backspace: "⌫" }
    : { mod: "Ctrl", meta: "Win", ctrl: "Ctrl", shift: "Shift", alt: "Alt", option: "Alt", enter: "Enter", esc: "Esc", escape: "Esc", up: "↑", down: "↓", left: "←", right: "→", backspace: "Backspace" };
  return combo.split("+").map((p) => map[p.trim().toLowerCase()] ?? (p.length === 1 ? p.toUpperCase() : p[0].toUpperCase() + p.slice(1)));
}
