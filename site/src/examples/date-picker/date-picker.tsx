import { Field, DatePicker } from "seaglass";

export default function DatePickerExample() {
  return (
    <div style={{ width: "min(300px, 100%)" }}>
      <Field label="Ship date">
        <DatePicker placeholder="Pick a date" min={new Date()} />
      </Field>
    </div>
  );
}
