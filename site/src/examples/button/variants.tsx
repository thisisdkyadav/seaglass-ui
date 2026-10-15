import { Button, ButtonGroup } from "seaglass-ui";

export default function Variants() {
  return (
    <ButtonGroup>
      <Button tone="primary">Pebble</Button>
      <Button variant="soft" tone="primary">Soft</Button>
      <Button variant="ghost" tone="clear">Ghost</Button>
      <Button variant="link" tone="primary">Link</Button>
    </ButtonGroup>
  );
}
