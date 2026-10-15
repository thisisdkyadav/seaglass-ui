import { useState, type ComponentType } from "react";
import { Tabs, TabsList, Tab } from "seaglass-ui";
import { Eye, Code2 } from "lucide-react";
import { CodeBlock } from "./code";
import type { ExampleRef } from "../content/registry";

const live = import.meta.glob<{ default: ComponentType }>("../examples/*/*.tsx", { eager: true });
const source = import.meta.glob<string>("../examples/*/*.tsx", { eager: true, query: "?raw", import: "default" });

export const exampleSource = (id: string) => source[`../examples/${id}.tsx`] ?? "";

/** A live preview of an example file, with its source a tab away. */
export function Example({ example }: { example: ExampleRef }) {
  const [view, setView] = useState("preview");
  const Demo = live[`../examples/${example.id}.tsx`]?.default;
  const anchor = example.id.split("/")[1];
  if (!Demo) return <p className="site-muted">Missing example {example.id}</p>;
  return (
    <section className="site-example" id={anchor} aria-labelledby={`${anchor}-title`}>
      <div className="site-example-head">
        <div>
          <h3 id={`${anchor}-title`}><a href={`#${anchor}`}>{example.title}</a></h3>
          {example.description && <p>{example.description}</p>}
        </div>
        <Tabs value={view} onValueChange={setView} variant="chips">
          <TabsList aria-label={`${example.title}: view`}>
            <Tab value="preview" icon={<Eye />}>Preview</Tab>
            <Tab value="code" icon={<Code2 />}>Code</Tab>
          </TabsList>
        </Tabs>
      </div>
      {view === "preview" ? (
        <div className={`site-preview site-preview-${example.id.split("/")[0]}`}><Demo /></div>
      ) : (
        <CodeBlock code={exampleSource(example.id)} className="site-example-code" />
      )}
    </section>
  );
}
