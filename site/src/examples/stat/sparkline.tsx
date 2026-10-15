import { Sparkline } from "seaglass-ui";

export default function SparklineExample() {
  return (
    <div style={{ display: "flex", gap: 32, alignItems: "center", color: "hsl(234 45% 50%)" }}>
      <Sparkline data={[3, 5, 4, 7, 6, 9, 8, 11]} />
      <Sparkline data={[9, 7, 8, 5, 6, 4, 5, 3]} area width={140} height={44} />
    </div>
  );
}
