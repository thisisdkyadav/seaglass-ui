import { useCallback, useEffect, useState } from "react";

/**
 * useState that survives reloads via localStorage. Pass key = undefined to opt out.
 * Storage failures (private mode, quota) fall back to plain in-memory state.
 */
export function usePersistedState<T>(key: string | undefined, initial: T): [T, (v: T | ((p: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    if (!key || typeof window === "undefined") return initial;
    try {
      const raw = window.localStorage.getItem(key);
      return raw == null ? initial : (JSON.parse(raw) as T);
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    if (!key) return;
    try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
  }, [key, value]);
  const set = useCallback((v: T | ((p: T) => T)) => setValue(v), []);
  return [value, set];
}
