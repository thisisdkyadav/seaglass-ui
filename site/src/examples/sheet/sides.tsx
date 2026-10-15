import { Sheet, SheetTrigger, SheetContent, DialogHeader, DialogBody, Button, ButtonGroup, Field, Input, Switch } from "seaglass";

const sides = ["left", "right", "top", "bottom"] as const;

export default function Sides() {
  return (
    <ButtonGroup>
      {sides.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button tone="clear">{side[0].toUpperCase() + side.slice(1)}</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <DialogHeader title="Filters" description="Narrow down the orders list." />
            <DialogBody>
              <Field label="Customer"><Input placeholder="Name or email" /></Field>
              <Switch label="Only unpaid" />
            </DialogBody>
          </SheetContent>
        </Sheet>
      ))}
    </ButtonGroup>
  );
}
