import { EmptyState, Button } from "seaglass";
import { Compass } from "lucide-react";
import { DocsLayout } from "../layout";
import { navigate } from "../router";

export function NotFound() {
  return (
    <DocsLayout active="" crumbs={[{ label: "Not found" }]}>
      <EmptyState
        className="site-404"
        icon={<Compass />}
        title="This page washed away"
        description="The address doesn't match any page. Try the search, or start from the introduction."
        actions={<Button tone="primary" onClick={() => navigate("/docs/introduction")}>Go to the docs</Button>}
      />
    </DocsLayout>
  );
}
