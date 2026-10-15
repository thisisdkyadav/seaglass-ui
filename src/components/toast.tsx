import { useSyncExternalStore, type ReactNode } from "react";
import { Toast as T } from "radix-ui";
import { cx } from "../lib/cx";
import { AlertIcon, CheckCircle, InfoIcon, XIcon } from "../lib/icons";
import type { Tone } from "../lib/types";

/* ============================================================
   Toasts: call toast() from anywhere; <Toaster/> renders them.
     toast("Saved")
     toast.success("Order shipped", { description: "#4821", action: { label: "Undo", onClick } })
     const id = toast.loading("Uploading…"); toast.update(id, { …}); toast.dismiss(id)
   F8 focuses the toast region (Radix), swipe right dismisses.
   ============================================================ */
export type ToastKind = "default" | "success" | "error" | "warning" | "info" | "loading";
export interface ToastOptions {
  description?: ReactNode;
  /** ms; Infinity keeps it until dismissed. Default 5000 (loading: Infinity). */
  duration?: number;
  action?: { label: string; onClick: () => void; altText?: string };
  icon?: ReactNode;
  id?: string;
}
export interface ToastItem extends ToastOptions { id: string; title: ReactNode; kind: ToastKind; open: boolean }

let items: ToastItem[] = [];
const listeners = new Set<() => void>();
const emit = () => { items = [...items]; listeners.forEach((l) => l()); };
let seq = 0;

function push(kind: ToastKind, title: ReactNode, opts: ToastOptions = {}): string {
  const id = opts.id ?? `t${++seq}`;
  const existing = items.findIndex((t) => t.id === id);
  const item: ToastItem = { ...opts, id, title, kind, open: true };
  if (existing >= 0) items[existing] = item; else items.push(item);
  emit();
  return id;
}

export const toast = Object.assign((title: ReactNode, opts?: ToastOptions) => push("default", title, opts), {
  success: (t: ReactNode, o?: ToastOptions) => push("success", t, o),
  error: (t: ReactNode, o?: ToastOptions) => push("error", t, o),
  warning: (t: ReactNode, o?: ToastOptions) => push("warning", t, o),
  info: (t: ReactNode, o?: ToastOptions) => push("info", t, o),
  loading: (t: ReactNode, o?: ToastOptions) => push("loading", t, { duration: Infinity, ...o }),
  update: (id: string, patch: Partial<Omit<ToastItem, "id">>) => {
    items = items.map((t) => {
      if (t.id !== id) return t;
      // a loading toast that settles gets the normal timeout unless one is given
      const settles = t.kind === "loading" && patch.kind && patch.kind !== "loading" && patch.duration === undefined;
      return { ...t, ...patch, ...(settles ? { duration: 5000 } : {}), open: true };
    });
    emit();
  },
  dismiss: (id?: string) => {
    items = items.map((t) => (id == null || t.id === id ? { ...t, open: false } : t));
    emit();
  },
});

const TONE: Record<ToastKind, Tone> = { default: "clear", success: "mint", error: "coral", warning: "amber", info: "aqua", loading: "clear" };
const ICON: Partial<Record<ToastKind, ReactNode>> = {
  success: <CheckCircle />, error: <AlertIcon />, warning: <AlertIcon />, info: <InfoIcon />,
  loading: <svg className="sg-spinner" width="18" height="18" viewBox="0 0 24 24" aria-hidden><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity=".2" strokeWidth="3" /><path d="M12 3a9 9 0 0 1 9 9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>,
};

export interface ToasterProps {
  position?: "top-right" | "top-center" | "bottom-right" | "bottom-center" | "bottom-left";
  /** Shortcut that focuses the region. Default F8. */
  hotkey?: string[];
}

export function Toaster({ position = "bottom-right", hotkey = ["F8"] }: ToasterProps) {
  const list = useSyncExternalStore((cb) => { listeners.add(cb); return () => listeners.delete(cb); }, () => items, () => items);
  return (
    <T.Provider swipeDirection={position.endsWith("left") ? "left" : "right"}>
      {list.map((t) => (
        <T.Root
          key={t.id}
          open={t.open}
          onOpenChange={(o) => {
            if (o) return;
            toast.dismiss(t.id);
            setTimeout(() => { items = items.filter((x) => x.id !== t.id); emit(); }, 300);
          }}
          duration={t.duration ?? 5000}
          data-tone={TONE[t.kind]}
          data-depth="md"
          data-kind={t.kind}
          className="sg-toast sg-pebble"
        >
          {(t.icon ?? ICON[t.kind]) && <span className="sg-toast-icon" aria-hidden>{t.icon ?? ICON[t.kind]}</span>}
          <div className="sg-toast-text">
            <T.Title className="sg-toast-title">{t.title}</T.Title>
            {t.description && <T.Description className="sg-toast-description">{t.description}</T.Description>}
          </div>
          {t.action && (
            <T.Action altText={t.action.altText ?? t.action.label} asChild>
              <button className="sg-toast-action sg-chip-surface" onClick={t.action.onClick}>{t.action.label}</button>
            </T.Action>
          )}
          <T.Close className="sg-toast-close" aria-label="Dismiss"><XIcon width={16} height={16} /></T.Close>
        </T.Root>
      ))}
      <T.Viewport hotkey={hotkey} className={cx("sg-toast-viewport")} data-position={position} />
    </T.Provider>
  );
}
