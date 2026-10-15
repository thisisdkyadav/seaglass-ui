import { SegmentedControl } from "seaglass";

export default function Joined() {
  return (
    <SegmentedControl
      aria-label="Period"
      variant="joined"
      defaultValue="7d"
      options={[
        { value: "24h", label: "24h" },
        { value: "7d", label: "7 days" },
        { value: "30d", label: "30 days" },
        { value: "12m", label: "12 months" },
      ]}
    />
  );
}
