import { useEffect, useState } from "react";
import { Progress } from "seaglass-ui";

export default function Basic() {
  const [value, setValue] = useState(20);
  useEffect(() => {
    const t = setInterval(() => setValue((v) => (v >= 100 ? 10 : v + 7)), 700);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ display: "grid", gap: 22, width: "min(420px, 100%)" }}>
      <Progress value={value} tone="periwinkle" label="Uploading assets" showValue />
      <Progress value={68} tone="aqua" size="sm" label="Storage" showValue formatValue={() => "6.8 / 10 GB"} />
      <Progress value={null} tone="lilac" label="Syncing" />
    </div>
  );
}
