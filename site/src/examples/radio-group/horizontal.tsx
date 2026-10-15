import { RadioGroup, Radio } from "seaglass";

export default function Horizontal() {
  return (
    <RadioGroup defaultValue="m" orientation="horizontal" tone="lilac" aria-label="Size">
      <Radio value="s" label="Small" />
      <Radio value="m" label="Medium" />
      <Radio value="l" label="Large" />
    </RadioGroup>
  );
}
