import { useState } from "react";
import { Field, DateRangePicker, type DateRange } from "seaglass-ui";

const daysAgo = (n: number) => new Date(Date.now() - n * 864e5);

export default function RangeExample() {
  const [range, setRange] = useState<DateRange>({ from: null, to: null });
  return (
    <div style={{ width: "min(320px, 100%)" }}>
      <Field label="Report period">
        <DateRangePicker
          value={range}
          onValueChange={setRange}
          presets={[
            { label: "Last 7 days", range: () => ({ from: daysAgo(6), to: new Date() }) },
            { label: "Last 30 days", range: () => ({ from: daysAgo(29), to: new Date() }) },
            { label: "Last 90 days", range: () => ({ from: daysAgo(89), to: new Date() }) },
          ]}
        />
      </Field>
    </div>
  );
}
