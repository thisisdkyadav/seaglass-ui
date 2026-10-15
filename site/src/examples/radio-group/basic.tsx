import { RadioGroup, Radio } from "seaglass";

export default function Basic() {
  return (
    <RadioGroup defaultValue="card" aria-label="Payment method">
      <Radio value="card" label="Card" description="Visa, Mastercard, Amex" />
      <Radio value="bank" label="Bank transfer" />
      <Radio value="crypto" label="Crypto" disabled />
    </RadioGroup>
  );
}
