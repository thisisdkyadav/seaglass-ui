import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
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
}

/**
 * Sets data-sg-theme on <html>, adds .sg-root to <body> and renders the lamp
 * that lights the page in dark mode.
 */
export function ThemeProvider({
  children, defaultTheme = "system", theme: controlled, onThemeChange,
  storageKey = "sg-theme", toggleHotkey = "shift+d", target,
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

  useHotkeys(toggleHotkey || "", toggle, { enabled: !!toggleHotkey });

  const value = useMemo(() => ({ theme, resolved, setTheme, toggle }), [theme, resolved, setTheme, toggle]);
  return (
    <Ctx.Provider value={value}>
      <div className="sg-lamp" aria-hidden />
      {children}
    </Ctx.Provider>
  );
}

export function useTheme(): ThemeCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
