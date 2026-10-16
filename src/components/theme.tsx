import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Direction, Tooltip } from "radix-ui";
import { useMediaQuery } from "../hooks/use-media-query";
import { useHotkeys } from "../hooks/use-hotkeys";

export type ThemeSetting = "light" | "dark" | "system";

interface ThemeCtx {
  /** What the user picked. */
  theme: ThemeSetting;
  /** What is actually showing. */
  resolved: "light" | "dark";
  setTheme: (t: ThemeSetting) => void;
  toggle: () => void;
}
const Ctx = createContext<ThemeCtx | null>(null);

export interface ThemeProviderProps {
  children?: ReactNode;
  defaultTheme?: ThemeSetting;
  /** Controlled theme. */
  theme?: ThemeSetting;
  onThemeChange?: (t: ThemeSetting) => void;
  /** localStorage key to remember the choice. Set to false to disable. Default "sg-theme". */
  storageKey?: string | false;
  /** Shortcut that toggles light/dark. Set to false to disable. Default "shift+d". */
  toggleHotkey?: string | false;
  /** Element that receives data-sg-theme. Default document.documentElement. */
  target?: () => HTMLElement;
  /**
   * Writing direction. Sets dir on the target element and tells every component, so arrow keys,
   * menus, sliders and the sidebar follow it. Leave unset to keep whatever dir the page has (ltr).
   */
  dir?: "ltr" | "rtl";
}

/**
 * Sets data-sg-theme on <html>, adds .sg-root to <body> and renders the lamp
 * that lights the page in dark mode. Also provides tooltip timing, so Tooltip needs no
 * separate TooltipProvider.
 */
export function ThemeProvider({
  children, defaultTheme = "system", theme: controlled, onThemeChange,
  storageKey = "sg-theme", toggleHotkey = "shift+d", target, dir,
}: ThemeProviderProps) {
  const [inner, setInner] = useState<ThemeSetting>(() => {
    if (storageKey && typeof window !== "undefined") {
      try {
        const v = window.localStorage.getItem(storageKey);
        if (v === "light" || v === "dark" || v === "system") return v;
      } catch { /* ignore */ }
    }
    return defaultTheme;
  });
  const theme = controlled ?? inner;
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const resolved = theme === "system" ? (prefersDark ? "dark" : "light") : theme;

  const setTheme = useCallback((t: ThemeSetting) => {
    if (controlled === undefined) setInner(t);
    if (storageKey) try { window.localStorage.setItem(storageKey, t); } catch { /* ignore */ }
    onThemeChange?.(t);
  }, [controlled, storageKey, onThemeChange]);
  const toggle = useCallback(() => setTheme(resolved === "dark" ? "light" : "dark"), [resolved, setTheme]);

  useEffect(() => {
    const el = target?.() ?? document.documentElement;
    el.setAttribute("data-sg-theme", resolved);
    document.body.classList.add("sg-root");
  }, [resolved, target]);

  useEffect(() => {
    if (dir) (target?.() ?? document.documentElement).setAttribute("dir", dir);
  }, [dir, target]);

  useHotkeys(toggleHotkey || "", toggle, { enabled: !!toggleHotkey });

  const value = useMemo(() => ({ theme, resolved, setTheme, toggle }), [theme, resolved, setTheme, toggle]);
  return (
    <Ctx.Provider value={value}>
      <div className="sg-lamp" aria-hidden />
      {/* tooltips work without a separate TooltipProvider; one nested inside still wins */}
      <Tooltip.Provider delayDuration={300}>
        {dir ? <Direction.Provider dir={dir}>{children}</Direction.Provider> : children}
      </Tooltip.Provider>
    </Ctx.Provider>
  );
}

export function useTheme(): ThemeCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

/** The current writing direction, from ThemeProvider dir (or a Radix DirectionProvider). */
export const useDirection = (): "ltr" | "rtl" => Direction.useDirection();

/** Set the direction for part of a page. Pair it with a dir attribute on an element: <DirectionProvider dir="rtl"><div dir="rtl">…</div></DirectionProvider> */
export function DirectionProvider({ dir, children }: { dir: "ltr" | "rtl"; children?: ReactNode }) {
  return <Direction.Provider dir={dir}>{children}</Direction.Provider>;
}
