import { Stat } from "seaglass";
import { Wallet, ShoppingBag, Users } from "lucide-react";

// The arrow follows the number; the colour says whether it's good news.
export default function Basic() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, width: "100%" }}>
      <Stat tone="periwinkle" label="Revenue" icon={<Wallet />} value="$48,295" delta="+12.4%" data={[12, 18, 15, 22, 19, 27, 31, 29, 36]} />
      <Stat tone="seafoam" label="Orders" icon={<ShoppingBag />} value="1,284" delta="+4.1%" data={[30, 28, 35, 33, 40, 38, 44, 47, 45]} />
      <Stat tone="rose" label="Bounce rate" icon={<Users />} value="38.1%" delta="+3.0%" trend="down" data={[30, 32, 31, 35, 36, 37, 38]} />
    </div>
  );
}
