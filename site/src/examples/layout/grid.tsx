import { Grid, Pebble } from "seaglass-ui";

const tones = ["periwinkle", "aqua", "seafoam", "mint", "amber", "coral"] as const;

export default function GridExample() {
  return (
    <Grid minColumnWidth={140} gap={4} style={{ width: "100%" }}>
      {tones.map((t) => (
        <Pebble key={t} tone={t} depth="sm" style={{ height: 72, display: "grid", placeItems: "center", fontSize: 13, fontWeight: 600 }}>{t}</Pebble>
      ))}
    </Grid>
  );
}
