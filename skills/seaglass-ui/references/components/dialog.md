# Dialog

A modal pebble over a soft scrim.

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter, DialogClose } from "seaglass-ui";
```

Built on the Radix Dialog primitive (https://www.radix-ui.com/primitives/docs/components/dialog) — the same keyboard and ARIA behaviour.

## DialogContent props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` |  |
| `tone` | `Tone` | `"clear"` | Sea-glass tint. Semantic names map onto tints. |
| `hideClose` | `boolean` | `false` | Hide the × in the corner. |

## Keyboard

- **Esc** — Close
- **Tab** — Focus stays inside

## Accessibility

- Focus moves in on open and returns to the trigger on close.
- DialogTitle names the dialog; DialogDescription describes it.

## Examples

### Form in a dialog

```tsx
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogClose,
  Button, Field, Input, Switch, toast,
} from "seaglass-ui";
import { Pencil } from "lucide-react";

export default function Basic() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button tone="primary" icon={<Pencil />}>Edit profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title="Edit profile" description="Changes show up on your public page." />
        <DialogBody>
          <Field label="Name"><Input defaultValue="Ava Thompson" /></Field>
          <Field label="Handle"><Input defaultValue="ava" leading="@" /></Field>
          <Switch label="Show email publicly" />
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild><Button tone="clear">Cancel</Button></DialogClose>
          <DialogClose asChild><Button tone="primary" onClick={() => toast.success("Profile saved")}>Save</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

Rendered HTML:

```html
<button type="button" data-tone="primary" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble" aria-haspopup="dialog" aria-expanded="false" data-state="closed">
<span class="sg-button-icon" aria-hidden="true">
<svg class="lucide lucide-pencil" aria-hidden="true">…</svg>
</span>
<span class="sg-button-label">Edit profile</span>
</button>
```
