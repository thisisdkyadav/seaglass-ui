# Popover & Hover card

Floating frosted panels: click for a popover, hover for a preview card.

```tsx
import { Popover, PopoverTrigger, PopoverContent, HoverCard, HoverCardTrigger, HoverCardContent } from "seaglass-ui";
```

Built on the Radix Popover primitive (https://www.radix-ui.com/primitives/docs/components/popover) — the same keyboard and ARIA behaviour.

## PopoverContent props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tone` | `Tone` | `"clear"` | Sea-glass tint. Semantic names map onto tints. |
| `padding` | `"none" \| "sm" \| "md"` | `"md"` |  |
| `side · align · sideOffset` | `—` |  | Positioning, as in Radix. |
| `aria-label · aria-labelledby` | `string` |  | Name the dialog. Point aria-labelledby at a heading inside it. |

## Keyboard

- **Esc** — Close
- **Tab** — Moves through the content

## Accessibility

- PopoverContent has role="dialog", so give it a name with aria-label or aria-labelledby.

## Examples

### Popover

```tsx
import { Popover, PopoverTrigger, PopoverContent, Button, Field, Input } from "seaglass-ui";
import { Share2 } from "lucide-react";

export default function Basic() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button tone="aqua" icon={<Share2 />}>Share</Button>
      </PopoverTrigger>
      <PopoverContent aria-labelledby="share-title">
        <div style={{ display: "grid", gap: 14, width: 280 }}>
          <b id="share-title">Share this report</b>
          <Field label="Invite by email">
            <Input size="sm" placeholder="name@company.com" />
          </Field>
          <Button size="sm" tone="primary" fullWidth>Send invite</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

Rendered HTML:

```html
<button type="button" data-tone="aqua" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble" aria-haspopup="dialog" aria-expanded="false" data-state="closed">
<span class="sg-button-icon" aria-hidden="true">
<svg class="lucide lucide-share2 lucide-share-2" aria-hidden="true">…</svg>
</span>
<span class="sg-button-label">Share</span>
</button>
```

### Hover card

```tsx
import { HoverCard, HoverCardTrigger, HoverCardContent, Avatar, Button } from "seaglass-ui";

export default function HoverCardExample() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" tone="periwinkle">@mia.chen</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div style={{ display: "flex", gap: 14, alignItems: "center", width: 250 }}>
          <Avatar name="Mia Chen" size="lg" status="online" />
          <div>
            <b>Mia Chen</b>
            <div style={{ opacity: 0.7, fontSize: ".9rem" }}>Product designer · Lisbon</div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
```

Rendered HTML:

```html
<button type="button" data-tone="periwinkle" data-variant="link" data-size="md" class="sg-button" data-state="closed">
<span class="sg-button-label">@mia.chen</span>
</button>
```
