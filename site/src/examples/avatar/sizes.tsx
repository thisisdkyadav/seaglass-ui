import { Avatar } from "seaglass-ui";

export default function Sizes() {
  return (
    <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
      <Avatar name="Ava Thompson" size="xl" status="online" />
      <Avatar name="Leo Martins" size="lg" status="away" />
      <Avatar name="Mia Chen" status="busy" />
      <Avatar name="Noah Patel" size="sm" shape="square" />
      <Avatar name="Isla Romero" size="xs" status="offline" />
    </div>
  );
}
