import { Pebble, ScrollArea } from "seaglass-ui";

const tones = ["periwinkle", "aqua", "sky", "seafoam", "mint", "lilac", "coral", "rose", "amber", "sand"] as const;

export default function Horizontal() {
  return (
    <ScrollArea orientation="horizontal" aria-label="Tints" style={{ width: "min(460px, 100%)" }}>
      <div style={{ display: "flex", gap: 14, padding: "6px 6px 18px" }}>
        {tones.map((t) => (
          <Pebble key={t} tone={t} depth="sm" style={{ flex: "none", width: 110, height: 80, display: "grid", placeItems: "end start", padding: 10, fontSize: 13, fontWeight: 600 }}>{t}</Pebble>
        ))}
      </div>
    </ScrollArea>
  );
}
