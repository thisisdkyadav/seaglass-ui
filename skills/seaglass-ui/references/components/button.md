# Button

A raised pebble that lifts on hover and sinks when pressed. Plus soft, ghost and link variants.

```tsx
import { Button, IconButton, ButtonGroup } from "seaglass-ui";
```

## Button props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"pebble" \| "soft" \| "ghost" \| "link"` | `"pebble"` | pebble: raised stone · soft: flat tinted wash · ghost: no surface until hover · link: text only. |
| `tone` | `Tone` | `"clear"` | Sea-glass tint. Semantic names map onto tints. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Height and padding. |
| `icon` | `ReactNode` |  | Icon before the label. |
| `iconEnd` | `ReactNode` |  | Icon after the label. |
| `loading` | `boolean` | `false` | Spinner in place of the icon; keeps width; sets aria-busy and blocks clicks. |
| `fullWidth` | `boolean` | `false` | Stretch to the container. |
| `asChild` | `boolean` | `false` | Render as the child element. |
| `...props` | `ButtonHTMLAttributes<HTMLButtonElement>` |  | Everything else is passed to the underlying element. |

## IconButton props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `aria-label` (required) | `string` |  | Accessible name — there is no visible label. |
| `shape` | `"circle" \| "square"` | `"circle"` | Round or rounded square. |
| `children` (required) | `ReactNode` |  | The icon. |
| `variant · tone · size · loading · asChild` | `—` |  | As on Button. |

## ButtonGroup props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `gap` | `"sm" \| "md" \| "lg"` | `"md"` | Space between buttons. |

## Keyboard

- **Enter / Space** — Activate

## Accessibility

- Native <button> with type="button" by default.
- loading sets aria-busy and disables the button.

## Examples

### Variants

```tsx
import { Button, ButtonGroup } from "seaglass-ui";

export default function Variants() {
  return (
    <ButtonGroup>
      <Button tone="primary">Pebble</Button>
      <Button variant="soft" tone="primary">Soft</Button>
      <Button variant="ghost" tone="clear">Ghost</Button>
      <Button variant="link" tone="primary">Link</Button>
    </ButtonGroup>
  );
}
```

Rendered HTML:

```html
<div role="group" data-gap="md" class="sg-button-group">
<button type="button" data-tone="primary" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble">
<span class="sg-button-label">Pebble</span>
</button>
<button type="button" data-tone="primary" data-variant="soft" data-size="md" class="sg-button">
<span class="sg-button-label">Soft</span>
</button>
<button type="button" data-tone="clear" data-variant="ghost" data-size="md" class="sg-button">
<span class="sg-button-label">Ghost</span>
</button>
<button type="button" data-tone="primary" data-variant="link" data-size="md" class="sg-button">
<span class="sg-button-label">Link</span>
</button>
</div>
```

### Tones

Every tone works with every variant.

```tsx
import { Button, ButtonGroup } from "seaglass-ui";

export default function Tones() {
  return (
    <ButtonGroup>
      <Button tone="clear">Clear</Button>
      <Button tone="primary">Primary</Button>
      <Button tone="success">Success</Button>
      <Button tone="warning">Warning</Button>
      <Button tone="danger">Danger</Button>
      <Button tone="lilac">Lilac</Button>
      <Button tone="aqua">Aqua</Button>
    </ButtonGroup>
  );
}
```

Rendered HTML:

```html
<div role="group" data-gap="md" class="sg-button-group">
<button type="button" data-tone="clear" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble">
<span class="sg-button-label">Clear</span>
</button>
<button type="button" data-tone="primary" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble">
<span class="sg-button-label">Primary</span>
</button>
<button type="button" data-tone="success" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble">
<span class="sg-button-label">Success</span>
</button>
<button type="button" data-tone="warning" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble">
<span class="sg-button-label">Warning</span>
</button>
<button type="button" data-tone="danger" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble">
<span class="sg-button-label">Danger</span>
</button>
<button type="button" data-tone="lilac" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble">
<span class="sg-button-label">Lilac</span>
</button>
<button type="button" data-tone="aqua" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble">
<span class="sg-button-label">Aqua</span>
</button>
</div>
```

### Sizes

```tsx
import { Button, ButtonGroup } from "seaglass-ui";

export default function Sizes() {
  return (
    <ButtonGroup>
      <Button size="sm" tone="aqua">Small</Button>
      <Button size="md" tone="aqua">Medium</Button>
      <Button size="lg" tone="aqua">Large</Button>
    </ButtonGroup>
  );
}
```

Rendered HTML:

```html
<div role="group" data-gap="md" class="sg-button-group">
<button type="button" data-tone="aqua" data-depth="sm" data-interactive="" data-variant="pebble" data-size="sm" class="sg-button sg-pebble">
<span class="sg-button-label">Small</span>
</button>
<button type="button" data-tone="aqua" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble">
<span class="sg-button-label">Medium</span>
</button>
<button type="button" data-tone="aqua" data-depth="md" data-interactive="" data-variant="pebble" data-size="lg" class="sg-button sg-pebble">
<span class="sg-button-label">Large</span>
</button>
</div>
```

### Icons and loading

loading keeps the button's width, shows a spinner and blocks clicks.

```tsx
import { useState } from "react";
import { Button, ButtonGroup } from "seaglass-ui";
import { Plus, ArrowRight, Trash2 } from "lucide-react";

export default function IconsAndLoading() {
  const [saving, setSaving] = useState(false);
  const save = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };
  return (
    <ButtonGroup>
      <Button tone="primary" icon={<Plus />}>Create</Button>
      <Button tone="mint" iconEnd={<ArrowRight />}>Continue</Button>
      <Button tone="danger" icon={<Trash2 />}>Delete</Button>
      <Button tone="lilac" loading={saving} onClick={save}>Save changes</Button>
      <Button disabled>Disabled</Button>
    </ButtonGroup>
  );
}
```

Rendered HTML:

```html
<div role="group" data-gap="md" class="sg-button-group">
<button type="button" data-tone="primary" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble">
<span class="sg-button-icon" aria-hidden="true">
<svg class="lucide lucide-plus" aria-hidden="true">…</svg>
</span>
<span class="sg-button-label">Create</span>
</button>
<button type="button" data-tone="mint" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble">
<span class="sg-button-label">Continue</span>
<span class="sg-button-icon" aria-hidden="true">
<svg class="lucide lucide-arrow-right" aria-hidden="true">…</svg>
</span>
</button>
<button type="button" data-tone="danger" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble">
<span class="sg-button-icon" aria-hidden="true">
<svg class="lucide lucide-trash2 lucide-trash-2" aria-hidden="true">…</svg>
</span>
<span class="sg-button-label">Delete</span>
</button>
<button type="button" data-tone="lilac" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble">
<span class="sg-button-label">Save changes</span>
</button>
<button type="button" data-tone="clear" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" disabled="" data-disabled="" class="sg-button sg-pebble">
<span class="sg-button-label">Disabled</span>
</button>
</div>
```

### Icon button

A round or square pebble for a single icon. aria-label is required.

```tsx
import { IconButton, ButtonGroup, Tooltip } from "seaglass-ui";
import { Pencil, Share2, Bookmark, Heart, MoreHorizontal } from "lucide-react";

export default function IconButtons() {
  return (
    <ButtonGroup>
      <Tooltip content="Edit" shortcut="e">
        <IconButton aria-label="Edit" tone="clear" shape="circle"><Pencil /></IconButton>
      </Tooltip>
      <IconButton aria-label="Share" tone="periwinkle"><Share2 /></IconButton>
      <IconButton aria-label="Bookmark" tone="seafoam" shape="circle"><Bookmark /></IconButton>
      <IconButton aria-label="Like" tone="coral"><Heart /></IconButton>
      <IconButton aria-label="More" variant="ghost" tone="clear" shape="circle"><MoreHorizontal /></IconButton>
    </ButtonGroup>
  );
}
```

Rendered HTML:

```html
<div role="group" data-gap="md" class="sg-button-group">
<button type="button" data-tone="clear" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble sg-icon-button" data-shape="circle" aria-label="Edit" data-state="closed">
<span class="sg-button-label">
<svg class="lucide lucide-pencil" aria-hidden="true">…</svg>
</span>
</button>
<button type="button" data-tone="periwinkle" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble sg-icon-button" data-shape="circle" aria-label="Share">
<span class="sg-button-label">
<svg class="lucide lucide-share2 lucide-share-2" aria-hidden="true">…</svg>
</span>
</button>
<button type="button" data-tone="seafoam" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble sg-icon-button" data-shape="circle" aria-label="Bookmark">
<span class="sg-button-label">
<svg class="lucide lucide-bookmark" aria-hidden="true">…</svg>
</span>
</button>
<button type="button" data-tone="coral" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble sg-icon-button" data-shape="circle" aria-label="Like">
<span class="sg-button-label">
<svg class="lucide lucide-heart" aria-hidden="true">…</svg>
</span>
</button>
<button type="button" data-tone="clear" data-variant="ghost" data-size="md" class="sg-button sg-icon-button" data-shape="circle" aria-label="More">
<span class="sg-button-label">
<svg class="lucide lucide-ellipsis" aria-hidden="true">…</svg>
</span>
</button>
</div>
```

### As a link

asChild renders the button styles onto your own element — an anchor or a router link.

```tsx
import { Button } from "seaglass-ui";
import { ArrowRight } from "lucide-react";

// asChild renders your own element (a router link, an <a>) with button styles.
export default function AsChild() {
  return (
    <Button asChild tone="primary" iconEnd={<ArrowRight />}>
      <a href="#installation">Read the docs</a>
    </Button>
  );
}
```

Rendered HTML:

```html
<a href="#installation" data-tone="primary" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble">Read the docs</a>
```
