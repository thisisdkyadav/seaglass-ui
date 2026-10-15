import { Button, ButtonGroup, toast } from "seaglass-ui";

// Render <Toaster /> once near the root of your app, then call toast() from anywhere.
export default function Kinds() {
  return (
    <ButtonGroup>
      <Button variant="soft" tone="clear" onClick={() => toast("Draft saved")}>Default</Button>
      <Button variant="soft" tone="mint" onClick={() => toast.success("Order shipped", { description: "#10482 is on its way." })}>Success</Button>
      <Button variant="soft" tone="coral" onClick={() => toast.error("Payment failed", { description: "The card was declined." })}>Error</Button>
      <Button variant="soft" tone="amber" onClick={() => toast.warning("Low stock", { description: "Only 3 mugs left." })}>Warning</Button>
      <Button variant="soft" tone="aqua" onClick={() => toast.info("New version available")}>Info</Button>
    </ButtonGroup>
  );
}
