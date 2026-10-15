import { Field, Textarea } from "seaglass";

export default function TextareaExample() {
  return (
    <div style={{ width: "min(400px, 100%)" }}>
      <Field label="Bio" description="Grows as you type.">
        <Textarea autoResize placeholder="A few words about you…" />
      </Field>
    </div>
  );
}
