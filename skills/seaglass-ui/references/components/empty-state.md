# Empty state

What to show when there is nothing to show.

```tsx
import { EmptyState } from "seaglass-ui";
```

## EmptyState props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` (required) | `ReactNode` |  |  |
| `description` | `ReactNode` |  |  |
| `icon` | `ReactNode` |  | Shown on a pebble. |
| `actions` | `ReactNode` |  | Buttons under the text. |
| `tone` | `Tone` | `"lilac"` | Sea-glass tint. Semantic names map onto tints. |

## Examples

### Basic

```tsx
import { EmptyState, Button } from "seaglass-ui";
import { Package, Plus } from "lucide-react";

export default function Basic() {
  return (
    <EmptyState
      tone="seafoam"
      icon={<Package />}
      title="No products yet"
      description="Add your first product and it will show up in the catalogue."
      actions={
        <>
          <Button tone="primary" icon={<Plus />}>Add product</Button>
          <Button tone="clear">Import CSV</Button>
        </>
      }
    />
  );
}
```

Rendered HTML:

```html
<div class="sg-empty">
<span class="sg-pebble sg-empty-icon" data-tone="seafoam" data-depth="md">
<svg class="lucide lucide-package" aria-hidden="true">…</svg>
</span>
<h3 class="sg-empty-title">No products yet</h3>
<p class="sg-empty-description">Add your first product and it will show up in the catalogue.</p>
<div class="sg-empty-actions">
<button type="button" data-tone="primary" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble">
<span class="sg-button-icon" aria-hidden="true">
<svg class="lucide lucide-plus" aria-hidden="true">…</svg>
</span>
<span class="sg-button-label">Add product</span>
</button>
<button type="button" data-tone="clear" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble">
<span class="sg-button-label">Import CSV</span>
</button>
</div>
</div>
```
