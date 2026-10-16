import { useState } from "react";
import { Field, NumberInput } from "seaglass-ui";

export default function Basic() {
  const [qty, setQty] = useState<number | null>(2);
  return (
    <div style={{ display: "grid", gap: 16, width: "min(320px, 100%)" }}>
      <Field label="Quantity" description={`Between 1 and 20. You picked ${qty ?? "nothing"}.`}>
        <NumberInput value={qty} onValueChange={setQty} min={1} max={20} />
      </Field>
      <Field label="Price">
        <NumberInput defaultValue={1249.5} min={0} step={0.01} format={{ style: "currency", currency: "EUR" }} locale="en-IE" />
      </Field>
      <Field label="Opacity">
        <NumberInput defaultValue={0.8} min={0} max={1} step={0.05} largeStep={0.25} format={{ style: "percent" }} size="sm" />
      </Field>
    </div>
  );
}
