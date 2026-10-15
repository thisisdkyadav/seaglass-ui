import { Kbd } from "seaglass-ui";

// "mod" renders as ⌘ on Mac and Ctrl elsewhere.
export default function Combos() {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
      <Kbd keys="mod+k" />
      <Kbd keys="shift+d" />
      <Kbd keys="mod+shift+p" />
      <Kbd keys="[" />
      <Kbd>Esc</Kbd>
    </div>
  );
}
