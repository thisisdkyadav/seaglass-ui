import { Button, toast } from "seaglass-ui";

export default function Loading() {
  const exportOrders = () => {
    const id = toast.loading("Exporting orders…");
    setTimeout(() => {
      toast.update(id, { kind: "success", title: "Export ready", description: "orders.csv · 48 rows" });
    }, 1800);
  };
  return <Button tone="periwinkle" onClick={exportOrders}>Export orders</Button>;
}
