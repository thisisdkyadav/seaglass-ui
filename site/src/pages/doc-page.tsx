import { DocsLayout } from "../layout";
import { Pager } from "./pager";
import type { Doc } from "../content/docs";

export function DocPage({ doc }: { doc: Doc }) {
  const { Body } = doc;
  return (
    <DocsLayout active={`docs/${doc.slug}`} crumbs={[{ label: "Docs", to: "/docs/introduction" }, { label: doc.title }]} toc={doc.toc}>
      <header className="site-page-head">
        <p className="site-eyebrow">Getting started</p>
        <h1>{doc.title}</h1>
        <p className="site-lede">{doc.summary}</p>
      </header>
      <article className="site-prose"><Body /></article>
      <Pager current={`/docs/${doc.slug}`} />
    </DocsLayout>
  );
}
