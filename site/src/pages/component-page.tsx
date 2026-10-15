import { Badge } from "seaglass";
import { ExternalLink } from "lucide-react";
import { DocsLayout, type TocItem } from "../layout";
import { Pager } from "./pager";
import { Example } from "../ui/example";
import { CodeBlock } from "../ui/code";
import { PropsTable, KeysTable, slugify } from "../ui/tables";
import type { Entry } from "../content/registry";

export function ComponentPage({ entry }: { entry: Entry }) {
  const toc: TocItem[] = [
    { id: "usage", label: "Usage" },
    ...entry.examples.map((e) => ({ id: e.id.split("/")[1], label: e.title, depth: 1 })),
    { id: "api", label: "API reference" },
    ...entry.api.map((g) => ({ id: "api-" + slugify(g.name), label: g.name.replace(/\(.*$/, "()"), depth: 1 })),
    ...(entry.keyboard ? [{ id: "keyboard", label: "Keyboard" }] : []),
    ...(entry.a11y ? [{ id: "accessibility", label: "Accessibility" }] : []),
  ];
  return (
    <DocsLayout active={`components/${entry.slug}`} crumbs={[{ label: "Components", to: "/components" }, { label: entry.group }, { label: entry.name }]} toc={toc}>
      <header className="site-page-head">
        <p className="site-eyebrow">{entry.group}</p>
        <h1>{entry.name}</h1>
        <p className="site-lede">{entry.summary}</p>
        {entry.radix && (
          <div className="site-page-meta">
            <a href={entry.radix.url} target="_blank" rel="noreferrer"><Badge tone="clear" variant="outline" icon={<ExternalLink size={12} />}>Radix {entry.radix.name}</Badge></a>
          </div>
        )}
      </header>
      <article className="site-prose">
        {entry.description && <p>{entry.description}</p>}
        <h2 id="usage"><a href="#usage">Usage</a></h2>
        <CodeBlock code={entry.imports} />
        {entry.examples.map((ex) => <Example key={ex.id} example={ex} />)}
        <h2 id="api"><a href="#api">API reference</a></h2>
        {entry.api.map((g) => <PropsTable key={g.name} group={g} />)}
        {entry.keyboard && (<><h2 id="keyboard"><a href="#keyboard">Keyboard</a></h2><KeysTable rows={entry.keyboard} /></>)}
        {entry.a11y && (
          <>
            <h2 id="accessibility"><a href="#accessibility">Accessibility</a></h2>
            <ul className="site-list">{entry.a11y.map((a) => <li key={a}>{a}</li>)}</ul>
          </>
        )}
      </article>
      <Pager current={`/components/${entry.slug}`} />
    </DocsLayout>
  );
}
