# Text, Heading & Link

Body text, headings and links on the type scale.

Heading separates the element (level) from the look (size), so the page outline stays correct whatever the design calls for. All three text colours meet WCAG AA contrast in both themes.

```tsx
import { Text, Heading, Link } from "seaglass-ui";
```

## Text props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `"p" \| "span" \| "div" \| "label" \| "strong" \| "em" \| "small"` | `"p"` |  |
| `size` | `"2xs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"` |  | Inherits when unset. |
| `color` | `"default" \| "muted" \| "faint"` | `"default"` |  |
| `weight` | `"regular" \| "medium" \| "strong" \| "bold"` |  |  |
| `align` | `"start" \| "center" \| "end"` |  | Logical, so it flips in right-to-left layouts. |
| `truncate` | `boolean \| number` |  | true: one line with an ellipsis. A number clamps to that many lines. |
| `numeric` | `boolean` |  | Tabular digits. |
| `asChild` | `boolean` |  |  |

## Heading props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `2` | The element, h1–h6. |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl"` |  | The look. Defaults to one that matches the level. |
| `align · asChild` | `—` |  |  |

## Link props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tone` | `Tone` | `"primary"` | Sea-glass tint. Semantic names map onto tints. |
| `underline` | `"always" \| "hover" \| "none"` | `"always"` | Keep "always" inside prose, so links don't rely on colour alone. |
| `external` | `boolean` |  | Opens in a new tab with rel="noopener noreferrer". |
| `asChild` | `boolean` |  | Render your router's link: <Link asChild><RouterLink to="/" /></Link> |
| `...props` | `AnchorHTMLAttributes` |  | Everything else is passed to the underlying element. |

## Examples

### The type scale

```tsx
import { Heading, Link, Text } from "seaglass-ui";

export default function Scale() {
  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 560 }}>
      <Heading level={2} size="3xl">Tide tables</Heading>
      <Heading level={3}>Low water at 06:42</Heading>
      <Text>
        Body text sits at 14px with a 1.5 line height. Read the <Link href="#scale">full forecast</Link> for
        the rest of the week.
      </Text>
      <Text size="sm" color="muted">Muted text for secondary details.</Text>
      <Text size="xs" color="faint">Updated 4 minutes ago · faint, and still 4.5:1 contrast</Text>
      <Text truncate style={{ maxWidth: 280 }}>A very long line that does not fit gets an ellipsis at the end.</Text>
      <Text numeric weight="strong">1,204.50 · 98.10 · 12.00</Text>
    </div>
  );
}
```

Rendered HTML:

```html
<div style="display:grid;gap:10px;max-width:560px">
<h2 class="sg-heading" data-size="3xl">Tide tables</h2>
<h3 class="sg-heading" data-size="xl">Low water at 06:42</h3>
<p class="sg-text">Body text sits at 14px with a 1.5 line height. Read the <a data-tone="primary" data-underline="always" class="sg-link" href="#scale">full forecast</a> for the rest of the week.</p>
<p class="sg-text" data-size="sm" data-color="muted">Muted text for secondary details.</p>
<p class="sg-text" data-size="xs" data-color="faint">Updated 4 minutes ago · faint, and still 4.5:1 contrast</p>
<p class="sg-text" data-truncate="" style="max-width:280px">A very long line that does not fit gets an ellipsis at the end.</p>
<p class="sg-text" data-weight="strong" data-numeric="">1,204.50 · 98.10 · 12.00</p>
</div>
```
