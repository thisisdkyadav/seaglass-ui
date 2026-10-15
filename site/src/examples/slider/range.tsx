import { useState } from "react";
import { Field, Slider } from "seaglass";

export default function Range() {
  const [price, setPrice] = useState([20, 80]);
  return (
    <div style={{ width: "min(400px, 100%)" }}>
      <Field label={`Price · $${price[0]} – $${price[1]}`}>
        <Slider value={price} onValueChange={setPrice} min={0} max={200} step={5} minStepsBetweenThumbs={2} thumbLabels={["Minimum price", "Maximum price"]} />
      </Field>
    </div>
  );
}
