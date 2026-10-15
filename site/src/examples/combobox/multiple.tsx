import { useState } from "react";
import { Field, Combobox } from "seaglass-ui";

export default function Multiple() {
  const [options, setOptions] = useState(["design", "launch", "marketing", "research", "urgent"].map((t) => ({ value: t, label: t })));
  const [tags, setTags] = useState(["design", "launch"]);
  return (
    <div style={{ width: "min(360px, 100%)" }}>
      <Field label="Tags" description="Type a new tag to create it.">
        <Combobox
          multiple
          options={options}
          value={tags}
          onValueChange={setTags}
          onCreate={(q) => {
            setOptions((o) => [...o, { value: q, label: q }]);
            setTags((t) => [...t, q]);
          }}
        />
      </Field>
    </div>
  );
}
