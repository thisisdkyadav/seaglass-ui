import { useState } from "react";
import { Alert, Button } from "seaglass-ui";

export default function Actions() {
  const [open, setOpen] = useState(true);
  if (!open) return <Button onClick={() => setOpen(true)}>Show the alert again</Button>;
  return (
    <Alert
      tone="lilac"
      variant="pebble"
      title="Invite your team"
      onDismiss={() => setOpen(false)}
      actions={<><Button size="sm" tone="lilac">Send invites</Button><Button size="sm" variant="ghost">Later</Button></>}
      style={{ width: "min(560px, 100%)" }}
    >
      Projects are more fun together. Invite up to 5 people for free.
    </Alert>
  );
}
