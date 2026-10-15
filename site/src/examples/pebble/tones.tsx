import { Pebble } from "seaglass";

const tones = ["clear", "periwinkle", "aqua", "sky", "seafoam", "mint", "lilac", "coral", "rose", "amber", "sand"] as const;

export default function Tones() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 22, width: "100%" }}>
      {tones.map((tone) => (
        <Pebble key={tone} tone={tone} style={{ height: 80, display: "grid", alignItems: "end", padding: "10px 14px", fontWeight: 600 }}>
          {tone}
        </Pebble>
      ))}
    </div>
  );
}
