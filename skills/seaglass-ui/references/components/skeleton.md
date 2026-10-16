# Skeleton

Placeholder shapes that shimmer while content loads.

```tsx
import { Skeleton } from "seaglass-ui";
```

## Skeleton props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `shape` | `"block" \| "text" \| "circle"` | `"block"` |  |
| `width` | `number \| string` |  |  |
| `height` | `number \| string` |  |  |

## Accessibility

- Hidden from assistive tech. Mark the loading region with aria-busy.

## Examples

### Loading card

```tsx
import { Skeleton } from "seaglass-ui";

export default function Basic() {
  return (
    <div style={{ display: "flex", gap: 16, width: "min(420px, 100%)" }}>
      <Skeleton shape="circle" width={48} />
      <div style={{ flex: 1, display: "grid", gap: 10 }}>
        <Skeleton shape="text" width="55%" />
        <Skeleton shape="text" />
        <Skeleton shape="text" width="80%" />
      </div>
    </div>
  );
}
```

Rendered HTML:

```html
<div style="display:flex;gap:16px;width:min(420px, 100%)">
<div aria-hidden="true" data-shape="circle" class="sg-skeleton" style="width:48px">
</div>
<div style="flex:1;display:grid;gap:10px">
<div aria-hidden="true" data-shape="text" class="sg-skeleton" style="width:55%">
</div>
<div aria-hidden="true" data-shape="text" class="sg-skeleton">
</div>
<div aria-hidden="true" data-shape="text" class="sg-skeleton" style="width:80%">
</div>
</div>
</div>
```
