import { Button, Pebble, Stack } from "seaglass-ui";

const box = { padding: "14px 18px", fontSize: 13, fontWeight: 600 };

export default function StackExample() {
  return (
    <Stack gap={5} style={{ width: "min(520px, 100%)" }}>
      <Stack direction="row" gap={2} wrap>
        <Pebble tone="aqua" depth="sm" style={box}>One</Pebble>
        <Pebble tone="mint" depth="sm" style={box}>Two</Pebble>
        <Pebble tone="lilac" depth="sm" style={box}>Three</Pebble>
      </Stack>
      <Stack direction="row" justify="between" align="center">
        <span style={{ fontWeight: 600 }}>3 items selected</span>
        <Stack direction="row" gap={2}>
          <Button variant="ghost">Cancel</Button>
          <Button tone="primary">Archive</Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
