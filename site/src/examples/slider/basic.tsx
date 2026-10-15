import { useState } from "react";
import { Field, Slider } from "seaglass-ui";

export default function Basic() {
  const [volume, setVolume] = useState([60]);
  return (
    <div style={{ width: "min(400px, 100%)" }}>
      <Field label={`Volume · ${volume[0]}%`}>
        <Slider value={volume} onValueChange={setVolume} tone="lilac" thumbLabels={["Volume"]} />
      </Field>
    </div>
  );
}
