# Sheet

A dialog that slides in from an edge.

```tsx
import { Sheet, SheetTrigger, SheetContent } from "seaglass-ui";
```

Built on the Radix Dialog primitive (https://www.radix-ui.com/primitives/docs/components/dialog) — the same keyboard and ARIA behaviour.

## SheetContent props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `"left" \| "right" \| "top" \| "bottom"` | `"right"` |  |
| `size · tone · hideClose` | `—` |  | As on DialogContent. |

## Keyboard

- **Esc** — Close

## Examples

### Sides

```tsx
import { Sheet, SheetTrigger, SheetContent, DialogHeader, DialogBody, Button, ButtonGroup, Field, Input, Switch } from "seaglass-ui";

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
```

Rendered HTML:

```html
<div role="group" data-gap="md" class="sg-button-group">
<button type="button" data-tone="clear" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble" aria-haspopup="dialog" aria-expanded="false" data-state="closed">
<span class="sg-button-label">Left</span>
</button>
<button type="button" data-tone="clear" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble" aria-haspopup="dialog" aria-expanded="false" data-state="closed">
<span class="sg-button-label">Right</span>
</button>
<button type="button" data-tone="clear" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble" aria-haspopup="dialog" aria-expanded="false" data-state="closed">
<span class="sg-button-label">Top</span>
</button>
<button type="button" data-tone="clear" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble" aria-haspopup="dialog" aria-expanded="false" data-state="closed">
<span class="sg-button-label">Bottom</span>
</button>
</div>
```
