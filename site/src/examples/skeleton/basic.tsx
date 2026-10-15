import { Skeleton } from "seaglass";

export default function Basic() {
  return (
    <div style={{ display: "flex", gap: 16, width: "min(420px, 100%)" }}>
      <Skeleton shape="circle" width={48} />
      <div style={{ flex: 1, display: "grid", gap: 10 }}>
        <Skeleton shape="text" width="55%" />
        <Skeleton shape="text" />
        <Skeleton shape="text" width="80%" />
      </div>
    </div>
  );
}
