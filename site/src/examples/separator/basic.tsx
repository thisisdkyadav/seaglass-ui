import { Separator } from "seaglass";

export default function Basic() {
  return (
    <div style={{ display: "grid", gap: 20, width: "min(420px, 100%)" }}>
      <span>Account</span>
      <Separator />
      <Separator label="or continue with" />
      <div style={{ display: "flex", gap: 14, height: 24, alignItems: "center" }}>
        <span>Docs</span><Separator orientation="vertical" /><span>Components</span><Separator orientation="vertical" /><span>Themes</span>
      </div>
    </div>
  );
}
