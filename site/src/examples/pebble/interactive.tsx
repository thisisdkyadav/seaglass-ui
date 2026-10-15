import { Pebble } from "seaglass-ui";

export default function Interactive() {
  return (
    <Pebble asChild tone="seafoam" interactive>
      <button style={{ padding: "22px 30px", font: "inherit", fontWeight: 600 }}>
        Hover lifts · press sinks
      </button>
    </Pebble>
  );
}
