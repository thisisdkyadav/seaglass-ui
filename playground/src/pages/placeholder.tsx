import { Card, EmptyState, Button } from "seaglass-ui";

export function Placeholder({ title }: { title: string }) {
  return (
    <>
      <div className="pg-title"><div><h1>{title}</h1><p>A page in the demo app.</p></div></div>
      <Card>
        <EmptyState
          tone="sky"
          icon={<span className="ms">construction</span>}
          title="Nothing here yet"
          description="This route exists so the sidebar has somewhere to go. Try Overview, Orders or any page under Components."
          actions={<Button tone="primary" onClick={() => { location.hash = "#/overview"; }}>Back to overview</Button>}
        />
      </Card>
    </>
  );
}
