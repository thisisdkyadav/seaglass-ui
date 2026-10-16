import { useEffect } from "react";
import { usePath } from "./router";
import { Home } from "./pages/home";
import { DocPage } from "./pages/doc-page";
import { ComponentPage } from "./pages/component-page";
import { ComponentsIndex } from "./pages/components-index";
import { NotFound } from "./pages/not-found";
import { docBySlug } from "./content/docs";
import { bySlug } from "./content/registry";

export function App() {
  const path = usePath();
  const [, section, slug] = path.split("/");
  const doc = section === "docs" ? docBySlug.get(slug ?? "introduction") : undefined;
  const entry = section === "components" && slug ? bySlug.get(slug) : undefined;

  const title = path === "/" ? null : doc?.title ?? entry?.name ?? (section === "components" && !slug ? "Components" : "Not found");
  const description = doc?.summary ?? (entry ? `${entry.summary} React component, with live examples, API reference and keyboard support.` : null);
  useEffect(() => {
    document.title = title ? `${title} — Sea Glass UI` : "Sea Glass UI — frosted, accessible React components";
    // keep the tags the build wrote for this route in step during client-side navigation
    if (description) document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", "https://seaglass.awacxo.com" + path);
  }, [title, description, path]);

  // scroll to #anchor after a page renders (deep links, reloads)
  useEffect(() => {
    if (!location.hash) return;
    requestAnimationFrame(() => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ block: "start" }));
  }, [path]);

  if (path === "/") return <Home />;
  if (doc) return <DocPage key={doc.slug} doc={doc} />;
  if (section === "components" && !slug) return <ComponentsIndex />;
  if (entry) return <ComponentPage key={entry.slug} entry={entry} />;
  return <NotFound />;
}
