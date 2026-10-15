import { DocsLayout } from "../layout";
import { ComponentGrid } from "./component-grid";
import { registry } from "../content/registry";

export function ComponentsIndex() {
  return (
    <DocsLayout active="components" crumbs={[{ label: "Components" }]}>
      <header className="site-page-head">
        <p className="site-eyebrow">Components</p>
        <h1>All components</h1>
        <p className="site-lede">{registry.length} pages, each with live examples, the code behind them, props and keyboard support.</p>
      </header>
      <ComponentGrid />
    </DocsLayout>
  );
}
