import { Spinner } from "seaglass-ui";

export default function Spinners() {
  return (
    <div style={{ display: "flex", gap: 22, alignItems: "center" }}>
      <Spinner size={16} />
      <Spinner />
      <Spinner size={28} label="Loading results" />
    </div>
  );
}
