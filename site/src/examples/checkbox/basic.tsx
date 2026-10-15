import { useState } from "react";
import { Checkbox } from "seaglass-ui";

export default function Basic() {
  const [checked, setChecked] = useState(true);
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Checkbox label="Email me about new orders" description="At most one email per hour." checked={checked} onCheckedChange={(v) => setChecked(v === true)} />
      <Checkbox label="Weekly summary" tone="periwinkle" />
      <Checkbox label="Some items selected" checked="indeterminate" tone="amber" />
      <Checkbox label="Disabled" disabled />
    </div>
  );
}
