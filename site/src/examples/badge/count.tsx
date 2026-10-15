import { Count } from "seaglass";

export default function Counts() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Count value={4} tone="periwinkle" />
      <Count value={12} />
      <Count value={240} tone="clear" />
      <Count value={1200} max={999} tone="amber" />
    </div>
  );
}
