import { Pebble } from "seaglass";

export default function Depth() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
      <Pebble tone="periwinkle" depth="lg" radius="xl" style={{ width: 170, height: 104 }} />
      <Pebble tone="periwinkle" depth="md" radius="lg" style={{ width: 120, height: 76 }} />
      <Pebble tone="periwinkle" depth="sm" radius="md" style={{ width: 84, height: 54 }} />
      <Pebble tone="periwinkle" depth="xs" radius="sm" style={{ width: 52, height: 38 }} />
    </div>
  );
}
