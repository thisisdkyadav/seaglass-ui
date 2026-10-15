import { Switch } from "seaglass-ui";

export default function Basic() {
  return (
    <div style={{ display: "grid", gap: 18, width: "min(400px, 100%)" }}>
      <Switch label="Vacation mode" description="Pause all orders while you're away." />
      <Switch label="Two-factor authentication" defaultChecked tone="periwinkle" />
      <Switch label="Compact" size="sm" defaultChecked />
    </div>
  );
}
