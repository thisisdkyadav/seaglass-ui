# Tooltip

A short label on hover or focus, with an optional shortcut.

```tsx
import { Tooltip, TooltipProvider } from "seaglass-ui";
```

Built on the Radix Tooltip primitive (https://www.radix-ui.com/primitives/docs/components/tooltip) — the same keyboard and ARIA behaviour.

## Tooltip props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `content` (required) | `ReactNode` |  |  |
| `shortcut` | `string` |  | Combo shown after the text, e.g. "mod+k". |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"top"` |  |
| `delayDuration` | `number` | `300` | Hover delay in ms. |
| `disabled` | `boolean` |  | Render the child only. |

## TooltipProvider props

Wrap your app once.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `delayDuration` | `number` | `700` | Shared default; individual tooltips use 300 unless set. |

## Examples

### With shortcuts

```tsx
import { Tooltip, IconButton, ButtonGroup } from "seaglass-ui";
import { Archive, Bell, Trash2 } from "lucide-react";

export default function Basic() {
  return (
    <ButtonGroup>
      <Tooltip content="Archive" shortcut="e">
        <IconButton aria-label="Archive" tone="clear" shape="circle"><Archive /></IconButton>
      </Tooltip>
      <Tooltip content="Notifications" side="bottom">
        <IconButton aria-label="Notifications" tone="clear" shape="circle"><Bell /></IconButton>
      </Tooltip>
      <Tooltip content="Delete" shortcut="mod+backspace" side="right">
        <IconButton aria-label="Delete" tone="coral" shape="circle"><Trash2 /></IconButton>
      </Tooltip>
    </ButtonGroup>
  );
}
```

Rendered HTML:

```html
<div role="group" data-gap="md" class="sg-button-group">
<button type="button" data-tone="clear" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble sg-icon-button" data-shape="circle" aria-label="Archive" data-state="closed">
<span class="sg-button-label">
<svg class="lucide lucide-archive" aria-hidden="true">…</svg>
</span>
</button>
<button type="button" data-tone="clear" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble sg-icon-button" data-shape="circle" aria-label="Notifications" data-state="closed">
<span class="sg-button-label">
<svg class="lucide lucide-bell" aria-hidden="true">…</svg>
</span>
</button>
<button type="button" data-tone="coral" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble sg-icon-button" data-shape="circle" aria-label="Delete" data-state="closed">
<span class="sg-button-label">
<svg class="lucide lucide-trash2 lucide-trash-2" aria-hidden="true">…</svg>
</span>
</button>
</div>
```
