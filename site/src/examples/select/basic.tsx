import { Field, Select } from "seaglass-ui";

export default function Basic() {
  return (
    <div style={{ width: "min(320px, 100%)" }}>
      <Field label="Currency">
        <Select
          placeholder="Choose a currency"
          options={[
            { value: "usd", label: "US dollar" },
            { value: "eur", label: "Euro" },
            { value: "gbp", label: "Pound sterling" },
            { value: "jpy", label: "Japanese yen", disabled: true },
          ]}
        />
      </Field>
    </div>
  );
}
