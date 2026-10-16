# Breadcrumbs

Where you are, with long trails collapsed into a menu.

```tsx
import { Breadcrumbs } from "seaglass-ui";
```

## Breadcrumbs props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` (required) | `{ label, href?, onClick? }[]` |  | The last item is the current page. |
| `maxItems` | `number` | `5` | Collapse the middle beyond this many. |
| `separator` | `ReactNode` |  |  |
| `renderLink` | `(crumb, children) => ReactNode` |  | Render links with your router. |
| `aria-label` | `string` | `"Breadcrumb"` | Give each trail a distinct name when a page has several. |

## Accessibility

- A <nav aria-label="Breadcrumb"> with an ordered list; the last item has aria-current="page".

## Examples

### Basic and collapsed

```tsx
import { Breadcrumbs } from "seaglass-ui";

export default function Basic() {
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <Breadcrumbs items={[{ label: "Settings", href: "#" }, { label: "Billing" }]} />
      <Breadcrumbs
        aria-label="Product location"
        maxItems={4}
        items={[
          { label: "Home", href: "#" },
          { label: "Catalogue", href: "#" },
          { label: "Kitchen", href: "#" },
          { label: "Mugs", href: "#" },
          { label: "Sea glass mug" },
        ]}
      />
    </div>
  );
}
```

Rendered HTML:

```html
<div style="display:grid;gap:18px">
<nav aria-label="Breadcrumb" class="sg-breadcrumbs">
<ol>
<li class="sg-crumb">
<a href="#">Settings</a>
</li>
<li class="sg-crumb-sep" aria-hidden="true">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M9.5 6l6 6-6 6">
</path>
</svg>
</li>
<li class="sg-crumb">
<span aria-current="page">Billing</span>
</li>
</ol>
</nav>
<nav aria-label="Product location" class="sg-breadcrumbs">
<ol>
<li class="sg-crumb">
<a href="#">Home</a>
</li>
<li class="sg-crumb-sep" aria-hidden="true">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M9.5 6l6 6-6 6">
</path>
</svg>
</li>
<li class="sg-crumb">
<span class="sg-crumb-ellipsis" role="img" aria-label="More pages">
<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<circle cx="5.5" cy="12" r="1.8">
</circle>
<circle cx="12" cy="12" r="1.8">
</circle>
<circle cx="18.5" cy="12" r="1.8">
</circle>
</svg>
</span>
</li>
<li class="sg-crumb-sep" aria-hidden="true">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M9.5 6l6 6-6 6">
</path>
</svg>
</li>
<li class="sg-crumb">
<a href="#">Mugs</a>
</li>
<li class="sg-crumb-sep" aria-hidden="true">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M9.5 6l6 6-6 6">
</path>
</svg>
</li>
<li class="sg-crumb">
<span aria-current="page">Sea glass mug</span>
</li>
</ol>
</nav>
</div>
```
