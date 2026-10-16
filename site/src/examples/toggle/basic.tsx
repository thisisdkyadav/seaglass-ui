import { useState } from "react";
import { Toggle } from "seaglass-ui";
import { Bold, Pin, Star } from "lucide-react";

export default function Basic() {
  const [pinned, setPinned] = useState(true);
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Toggle aria-label="Bold" icon={<Bold />} />
      <Toggle pressed={pinned} onPressedChange={setPinned} icon={<Pin />}>{pinned ? "Pinned" : "Pin"}</Toggle>
      <Toggle variant="soft" tone="amber" icon={<Star />} defaultPressed>Starred</Toggle>
    </div>
  );
}
