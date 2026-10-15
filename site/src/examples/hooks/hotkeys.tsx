import { useState } from "react";
import { useHotkeys, Kbd, Pebble } from "seaglass-ui";

export default function Hotkeys() {
  const [count, setCount] = useState(0);
  const [last, setLast] = useState("—");
  useHotkeys("j", () => { setCount((c) => c + 1); setLast("j"); });
  useHotkeys("k", () => { setCount((c) => c - 1); setLast("k"); });
  useHotkeys("alt+0", () => { setCount(0); setLast("alt+0"); });
  return (
    <Pebble tone="sky" style={{ padding: "22px 28px", display: "grid", gap: 10, minWidth: 260 }}>
      <span>Press <Kbd>J</Kbd> / <Kbd>K</Kbd> to count, <Kbd keys="alt+0" /> to reset.</span>
      <b style={{ fontSize: "2rem" }}>{count}</b>
      <small>Last: {last}</small>
    </Pebble>
  );
}
