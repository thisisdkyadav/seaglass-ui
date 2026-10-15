// A tiny history router: the site has a handful of flat routes, so a dependency isn't worth it.
import { useSyncExternalStore, type AnchorHTMLAttributes, type MouseEvent } from "react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());
addEventListener("popstate", notify);

const current = () => {
  const p = location.pathname.startsWith(BASE) ? location.pathname.slice(BASE.length) : location.pathname;
  return p.replace(/\/+$/, "") || "/";
};

export function usePath() {
  return useSyncExternalStore((cb) => { listeners.add(cb); return () => listeners.delete(cb); }, current, () => "/");
}

export const href = (to: string) => BASE + to;

export function navigate(to: string) {
  const [path, hash] = to.split("#");
  if (path && path !== current()) {
    history.pushState(null, "", href(path) + (hash ? "#" + hash : ""));
    notify();
    if (!hash) scrollTo({ top: 0 });
  }
  if (hash) requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }));
}

export function Link({ to, onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) {
  const go = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return <a href={href(to)} onClick={go} {...rest} />;
}
