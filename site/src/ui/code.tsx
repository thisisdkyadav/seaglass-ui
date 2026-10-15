import { useMemo, useState } from "react";
import { highlight } from "sugar-high";
import { IconButton, Tooltip, cx } from "seaglass";
import { Check, Copy } from "lucide-react";

export function CopyButton({ text, label = "Copy code" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); } catch { return; }
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  };
  return (
    <Tooltip content={done ? "Copied" : label}>
      <IconButton aria-label={label} size="sm" variant="ghost" tone="clear" onClick={copy} className="site-copy">
        {done ? <Check /> : <Copy />}
      </IconButton>
    </Tooltip>
  );
}

/** Highlighted, copyable code in a sunken well. */
export function CodeBlock({ code, lang = "tsx", className, bare }: { code: string; lang?: string; className?: string; bare?: boolean }) {
  const text = code.replace(/\n+$/, "");
  const html = useMemo(() => (lang === "sh" || lang === "css" ? escape(text) : highlight(text)), [text, lang]);
  return (
    <div className={cx("site-code", bare && "site-code-bare", className)} data-lang={lang}>
      <pre><code dangerouslySetInnerHTML={{ __html: html }} /></pre>
      <CopyButton text={text} />
    </div>
  );
}

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Inline `code`. */
export const C = ({ children }: { children: React.ReactNode }) => <code className="site-inline-code">{children}</code>;
