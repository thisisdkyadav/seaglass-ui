import { Card, CardHeader } from "seaglass-ui";
import { Leaf, Sparkles, SunMedium } from "lucide-react";

export default function Tones() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 24, width: "100%" }}>
      <Card tone="seafoam" padding="sm" interactive tabIndex={0}><CardHeader icon={<Leaf />} title="Seafoam" description="Interactive" /></Card>
      <Card tone="lilac" padding="sm" interactive tabIndex={0}><CardHeader icon={<Sparkles />} title="Lilac" description="Interactive" /></Card>
      <Card tone="amber" padding="sm" interactive tabIndex={0}><CardHeader icon={<SunMedium />} title="Amber" description="Interactive" /></Card>
    </div>
  );
}
