# Avatar

A picture, or initials on a pebble, with an optional presence dot.

```tsx
import { Avatar, AvatarGroup } from "seaglass-ui";
```

Built on the Radix Avatar primitive (https://www.radix-ui.com/primitives/docs/components/avatar) — the same keyboard and ARIA behaviour.

## Avatar props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` (required) | `string` |  | Initials fallback, alt text and default tone. |
| `src` | `string` |  | Image URL. Falls back to initials while loading or on error. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` |  |
| `tone` | `Tone` | `from name` | Sea-glass tint. Semantic names map onto tints. |
| `shape` | `"circle" \| "square"` | `"circle"` |  |
| `status` | `"online" \| "away" \| "busy" \| "offline"` |  | Presence dot. |
| `fallback` | `ReactNode` |  | Shown instead of initials. |

## AvatarGroup props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `max` | `number` | `4` | Show at most this many. |
| `size` | `Avatar size` | `"sm"` | Applied to every child. |

## Examples

### Sizes and status

Without src, initials are shown on a tone picked stably from the name.

```tsx
import { Avatar } from "seaglass-ui";

export default function Sizes() {
  return (
    <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
      <Avatar name="Ava Thompson" size="xl" status="online" />
      <Avatar name="Leo Martins" size="lg" status="away" />
      <Avatar name="Mia Chen" status="busy" />
      <Avatar name="Noah Patel" size="sm" shape="square" />
      <Avatar name="Isla Romero" size="xs" status="offline" />
    </div>
  );
}
```

Rendered HTML:

```html
<div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap">
<span data-tone="coral" data-depth="md" data-size="xl" data-shape="circle" class="sg-avatar sg-pebble">
<span class="sg-avatar-status" data-status="online" role="img" aria-label="Online">
</span>
</span>
<span data-tone="sky" data-depth="sm" data-size="lg" data-shape="circle" class="sg-avatar sg-pebble">
<span class="sg-avatar-status" data-status="away" role="img" aria-label="Away">
</span>
</span>
<span data-tone="amber" data-depth="sm" data-size="md" data-shape="circle" class="sg-avatar sg-pebble">
<span class="sg-avatar-status" data-status="busy" role="img" aria-label="Busy">
</span>
</span>
<span data-tone="sky" data-depth="xs" data-size="sm" data-shape="square" class="sg-avatar sg-pebble">
</span>
<span data-tone="sand" data-depth="xs" data-size="xs" data-shape="circle" class="sg-avatar sg-pebble">
<span class="sg-avatar-status" data-status="offline" role="img" aria-label="Offline">
</span>
</span>
</div>
```

### Group

Overlapping stack; anything past max collapses into +N.

```tsx
import { Avatar, AvatarGroup } from "seaglass-ui";

const people = ["Kai Nakamura", "Zara Okafor", "Ethan Brooks", "Maya Singh", "Oscar Lindqvist", "Lena Fischer"];

export default function Group() {
  return (
    <AvatarGroup max={4}>
      {people.map((name) => <Avatar key={name} name={name} />)}
    </AvatarGroup>
  );
}
```

Rendered HTML:

```html
<div class="sg-avatar-group" data-size="sm">
<span data-tone="seafoam" data-depth="sm" data-size="md" data-shape="circle" class="sg-avatar sg-pebble">
</span>
<span data-tone="mint" data-depth="sm" data-size="md" data-shape="circle" class="sg-avatar sg-pebble">
</span>
<span data-tone="coral" data-depth="sm" data-size="md" data-shape="circle" class="sg-avatar sg-pebble">
</span>
<span data-tone="amber" data-depth="sm" data-size="md" data-shape="circle" class="sg-avatar sg-pebble">
</span>
<span class="sg-avatar sg-pebble sg-avatar-more" data-tone="clear" data-depth="xs" data-size="sm" data-shape="circle">
<span class="sg-avatar-fallback">+2</span>
</span>
</div>
```
