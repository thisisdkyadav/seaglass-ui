# Toast

Brief notifications, called from anywhere with toast().

```tsx
import { Toaster, toast } from "seaglass-ui";
```

Built on the Radix Toast primitive (https://www.radix-ui.com/primitives/docs/components/toast) — the same keyboard and ARIA behaviour.

## Toaster props

Render once, near the root.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `position` | `"top-right" \| "top-center" \| "bottom-right" \| "bottom-center" \| "bottom-left"` | `"bottom-right"` |  |
| `hotkey` | `string[]` | `["F8"]` | Focuses the region. |

## toast(title, options?) props

Also toast.success · error · warning · info · loading, toast.update(id, …), toast.dismiss(id?) and toast.promise(p, { loading, success, error }).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `description` | `ReactNode` |  |  |
| `duration` | `number` | `5000 (loading: Infinity)` | Milliseconds. |
| `action` | `{ label, onClick, altText? }` |  | A button in the toast. |
| `icon` | `ReactNode` |  | Override the kind's icon. |
| `id` | `string` |  | Reuse to replace an existing toast. |

## Keyboard

- **F8** — Focus the toasts
- **Esc** — Dismiss the focused toast

## Examples

### Kinds

```tsx
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
```

Rendered HTML:

```html
<div role="group" data-gap="md" class="sg-button-group">
<button type="button" data-tone="clear" data-variant="soft" data-size="md" class="sg-button">
<span class="sg-button-label">Default</span>
</button>
<button type="button" data-tone="mint" data-variant="soft" data-size="md" class="sg-button">
<span class="sg-button-label">Success</span>
</button>
<button type="button" data-tone="coral" data-variant="soft" data-size="md" class="sg-button">
<span class="sg-button-label">Error</span>
</button>
<button type="button" data-tone="amber" data-variant="soft" data-size="md" class="sg-button">
<span class="sg-button-label">Warning</span>
</button>
<button type="button" data-tone="aqua" data-variant="soft" data-size="md" class="sg-button">
<span class="sg-button-label">Info</span>
</button>
</div>
```

### With an action

```tsx
import { Button, toast } from "seaglass-ui";

export default function Action() {
  return (
    <Button
      tone="clear"
      onClick={() =>
        toast("Conversation archived", {
          action: { label: "Undo", onClick: () => toast.success("Restored") },
        })
      }
    >
      Archive with undo
    </Button>
  );
}
```

Rendered HTML:

```html
<button type="button" data-tone="clear" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble">
<span class="sg-button-label">Archive with undo</span>
</button>
```

### Loading → result

toast.loading returns an id; toast.update swaps it for the result. toast.promise does both for you.

```tsx
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
```

Rendered HTML:

```html
<button type="button" data-tone="periwinkle" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble">
<span class="sg-button-label">Export orders</span>
</button>
```
