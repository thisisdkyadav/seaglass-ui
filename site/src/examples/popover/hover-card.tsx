import { HoverCard, HoverCardTrigger, HoverCardContent, Avatar, Button } from "seaglass";

export default function HoverCardExample() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" tone="periwinkle">@mia.chen</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div style={{ display: "flex", gap: 14, alignItems: "center", width: 250 }}>
          <Avatar name="Mia Chen" size="lg" status="online" />
          <div>
            <b>Mia Chen</b>
            <div style={{ opacity: 0.7, fontSize: ".9rem" }}>Product designer · Lisbon</div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
