import { Field, Input } from "seaglass-ui";
import { Search } from "lucide-react";

export default function Adornments() {
  return (
    <div style={{ display: "grid", gap: 18, width: "min(400px, 100%)" }}>
      <Input aria-label="Search" type="search" placeholder="Search…" leading={<Search size={18} />} size="sm" />
      <Field label="Store URL">
        <Input defaultValue="tidepool" leading="https://" trailing=".shop" />
      </Field>
      <Field label="Read only" disabled>
        <Input value="Can't touch this" readOnly />
      </Field>
    </div>
  );
}
