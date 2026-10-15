import { Pebble } from "seaglass-ui";

// Any colour is one hue / saturation / lightness triple.
// Body, rim, core, lip, shadow and text are all derived from it.
export default function CustomTint() {
  return (
    <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
      <Pebble style={{ "--h": 172, "--s": "45%", "--l": "80%", padding: "20px 26px", fontWeight: 600 } as React.CSSProperties}>
        Bottle green
      </Pebble>
      <Pebble style={{ "--h": 256, "--s": "60%", "--l": "86%", padding: "20px 26px", fontWeight: 600 } as React.CSSProperties}>
        Lavender
      </Pebble>
    </div>
  );
}
