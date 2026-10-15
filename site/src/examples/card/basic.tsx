import { Card, CardHeader, CardBody, CardFooter, Button, Badge } from "seaglass";
import { Droplet } from "lucide-react";

export default function Basic() {
  return (
    <Card style={{ width: "min(420px, 100%)" }}>
      <CardHeader
        icon={<Droplet />}
        title="Tidepool"
        description="Studio workspace · 5 members"
        actions={<Badge tone="mint" dot>Active</Badge>}
      />
      <CardBody>
        Every surface is a pebble of frosted sea glass. Cards are just the biggest ones.
      </CardBody>
      <CardFooter>
        <Button tone="clear">Settings</Button>
        <Button tone="primary">Open</Button>
      </CardFooter>
    </Card>
  );
}
