import { Badge } from "seaglass";

export default function Variants() {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Badge tone="mint" dot>Paid</Badge>
      <Badge tone="amber" dot>Pending</Badge>
      <Badge tone="coral">Failed</Badge>
      <Badge tone="lilac" variant="pebble">Pebble</Badge>
      <Badge tone="periwinkle" variant="outline">Outline</Badge>
      <Badge tone="periwinkle" variant="solid">Solid</Badge>
      <Badge size="sm">Small</Badge>
    </div>
  );
}
