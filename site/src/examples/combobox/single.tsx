import { Field, Combobox } from "seaglass-ui";

const countries = ["Australia", "Brazil", "Canada", "Denmark", "France", "Germany", "India", "Japan", "Kenya", "Mexico", "Norway", "Portugal", "Singapore", "Spain", "Sweden", "United Kingdom", "United States"]
  .map((c) => ({ value: c.toLowerCase().replace(/ /g, "-"), label: c, group: c < "M" ? "A – L" : "M – Z" }));

export default function Single() {
  return (
    <div style={{ width: "min(320px, 100%)" }}>
      <Field label="Country" description="Type to filter.">
        <Combobox options={countries} placeholder="Select a country" defaultValue="portugal" />
      </Field>
    </div>
  );
}
