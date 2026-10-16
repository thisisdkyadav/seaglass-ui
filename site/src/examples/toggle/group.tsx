import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "seaglass-ui";
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from "lucide-react";

export default function Group() {
  const [align, setAlign] = useState("left");
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
      <ToggleGroup type="multiple" aria-label="Text style" defaultValue={["bold"]}>
        <ToggleGroupItem value="bold" aria-label="Bold" icon={<Bold />} />
        <ToggleGroupItem value="italic" aria-label="Italic" icon={<Italic />} />
        <ToggleGroupItem value="underline" aria-label="Underline" icon={<Underline />} />
      </ToggleGroup>
      <ToggleGroup type="single" aria-label="Alignment" value={align} onValueChange={(v) => v && setAlign(v)}>
        <ToggleGroupItem value="left" aria-label="Align left" icon={<AlignLeft />} />
        <ToggleGroupItem value="center" aria-label="Align centre" icon={<AlignCenter />} />
        <ToggleGroupItem value="right" aria-label="Align right" icon={<AlignRight />} />
      </ToggleGroup>
      <ToggleGroup type="multiple" layout="separate" variant="soft" tone="aqua" aria-label="Days" defaultValue={["mon", "wed"]}>
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => <ToggleGroupItem key={d} value={d.toLowerCase()}>{d}</ToggleGroupItem>)}
      </ToggleGroup>
    </div>
  );
}
