import { BarChart } from "seaglass-ui";

const data = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((label, i) => ({ label, value: [4200, 5100, 4700, 6800, 7900, 6100, 3900][i] }));

export default function Basic() {
  return (
    <div style={{ width: "min(560px, 100%)" }}>
      <BarChart data={data} format={(v) => `$${v.toLocaleString()}`} />
    </div>
  );
}
