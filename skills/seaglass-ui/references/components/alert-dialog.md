# Alert dialog

Confirm a destructive action. Waits for async confirms with a spinner.

```tsx
import { AlertDialog } from "seaglass-ui";
```

Built on the Radix Alert Dialog primitive (https://www.radix-ui.com/primitives/docs/components/alert-dialog) — the same keyboard and ARIA behaviour.

## AlertDialog props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` (required) | `ReactNode` |  |  |
| `description` | `ReactNode` |  |  |
| `trigger` | `ReactNode` |  | Element that opens it. |
| `onConfirm` | `() => void \| Promise<void>` |  |  |
| `confirmLabel` | `ReactNode` | `"Confirm"` |  |
| `cancelLabel` | `ReactNode` | `"Cancel"` |  |
| `tone` | `"danger" \| "primary"` | `"primary"` | Colour of the confirm button. |
| `icon` | `ReactNode` |  |  |
| `open · defaultOpen · onOpenChange` | `boolean` |  |  |

## Keyboard

- **Esc** — Cancel
- **Tab** — Focus stays inside; Cancel starts focused

## Examples

### Confirm a delete

Return a promise from onConfirm and the dialog stays open, with a busy button, until it settles. If it rejects, the dialog stays open.

```tsx
import { AlertDialog, Button, toast } from "seaglass-ui";
import { Trash2, TriangleAlert } from "lucide-react";

export default function Basic() {
  return (
    <AlertDialog
      trigger={<Button tone="danger" icon={<Trash2 />}>Delete project</Button>}
      tone="danger"
      icon={<TriangleAlert />}
      title="Delete “Q4 launch”?"
      description="This removes the project, its 24 tasks and all files. It can't be undone."
      confirmLabel="Delete project"
      onConfirm={async () => {
        await new Promise((r) => setTimeout(r, 600)); // the confirm button waits for a promise
        toast.error("Project deleted");
      }}
    />
  );
}
```

Rendered HTML:

```html
<button type="button" data-tone="danger" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble" aria-haspopup="dialog" aria-expanded="false" data-state="closed">
<span class="sg-button-icon" aria-hidden="true">
<svg class="lucide lucide-trash2 lucide-trash-2" aria-hidden="true">…</svg>
</span>
<span class="sg-button-label">Delete project</span>
</button>
```
