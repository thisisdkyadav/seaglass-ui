import type { ReactNode } from "react";
import { Kbd, Badge } from "seaglass";
import type { PropGroup } from "../content/registry";

export function PropsTable({ group }: { group: PropGroup }) {
  return (
    <div className="site-api">
      <h3 id={"api-" + slugify(group.name)}><code>{group.name}</code></h3>
      {group.description && <p className="site-muted">{group.description}</p>}
      {group.props.length > 0 && (
        <div className="site-table-scroll">
          <table className="site-props">
            <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              {group.props.map((p) => (
                <tr key={p.name}>
                  <td><code className="site-prop-name">{p.name}</code>{p.required && <Badge size="sm" tone="coral" variant="outline" className="site-req">required</Badge>}</td>
                  <td><code className="site-prop-type">{p.type}</code></td>
                  <td>{p.default ? <code>{p.default}</code> : <span className="site-faint">—</span>}</td>
                  <td>{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/** Renders "Shift + D", "⌘K / Ctrl K", "↑ ↓" as key caps. */
export function KeysTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="site-table-scroll">
      <table className="site-props site-keys">
        <thead><tr><th>Keys</th><th>Action</th></tr></thead>
        <tbody>
          {rows.map(([keys, action]) => (
            <tr key={keys + action}><td><Keys spec={keys} /></td><td>{action}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Keys({ spec }: { spec: string }) {
  // " / " separates alternatives; within one, every word is a key cap ("or" is text)
  return (
    <span className="site-keycaps">
      {spec.split(" / ").map((alt, i) => (
        <span key={i}>
          {i > 0 && <span className="site-faint"> or </span>}
          {alt.split(" + ").join(" ").split(" ").filter(Boolean).map((k, j) =>
            k === "or" ? <span key={j} className="site-faint"> or </span> : <Kbd key={j}>{k}</Kbd>,
          )}
        </span>
      ))}
    </span>
  );
}

export function Callout({ tone = "sky", title, children }: { tone?: "sky" | "amber" | "mint" | "lilac"; title?: ReactNode; children: ReactNode }) {
  return (
    <div className="site-callout sg-pebble" data-tone={tone} data-depth="sm">
      {title && <strong>{title}</strong>}
      <div>{children}</div>
    </div>
  );
}

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
