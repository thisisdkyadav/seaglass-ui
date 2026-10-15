import { Field, Select } from "seaglass";

export default function Groups() {
  return (
    <div style={{ width: "min(320px, 100%)" }}>
      <Field label="Plan">
        <Select
          defaultValue="pro"
          options={[
            { label: "Monthly", options: [
              { value: "starter", label: "Starter", description: "$9 / month" },
              { value: "pro", label: "Pro", description: "$29 / month" },
            ] },
            { label: "Yearly", options: [
              { value: "team", label: "Team", description: "$290 / year" },
            ] },
          ]}
        />
      </Field>
    </div>
  );
}
