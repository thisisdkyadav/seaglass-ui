# Card

A large pebble for grouping content, with a header, body and footer.

```tsx
import { Card, CardHeader, CardBody, CardFooter } from "seaglass-ui";
```

## Card props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tone` | `Tone` | `"clear"` | Sea-glass tint. Semantic names map onto tints. |
| `depth` | `"xs" \| "sm" \| "md" \| "lg"` | `"lg"` |  |
| `padding` | `"none" \| "sm" \| "md" \| "lg"` | `"md"` | Inner spacing. |
| `interactive` | `boolean` | `false` | Lift on hover, sink on press. |
| `asChild` | `boolean` | `false` | Render as the child element. |

## CardHeader props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` |  | Rendered as a heading. |
| `description` | `ReactNode` |  | Muted line under the title. |
| `icon` | `ReactNode` |  | Shown before the title. |
| `actions` | `ReactNode` |  | Right-aligned buttons, a menu or a legend. |
| `titleAs` | `"h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "div"` | `"h3"` | Heading level that fits your page outline. |

## Examples

### Basic

```tsx
import { Card, CardHeader, CardBody, CardFooter, Button, Badge } from "seaglass-ui";
import { Droplet } from "lucide-react";

export default function Basic() {
  return (
    <Card style={{ width: "min(420px, 100%)" }}>
      <CardHeader
        icon={<Droplet />}
        title="Tidepool"
        description="Studio workspace · 5 members"
        actions={<Badge tone="mint" dot>Active</Badge>}
      />
      <CardBody>
        Every surface is a pebble of frosted sea glass. Cards are just the biggest ones.
      </CardBody>
      <CardFooter>
        <Button tone="clear">Settings</Button>
        <Button tone="primary">Open</Button>
      </CardFooter>
    </Card>
  );
}
```

Rendered HTML:

```html
<div data-tone="clear" data-depth="lg" data-padding="md" class="sg-card sg-pebble" style="width:min(420px, 100%)">
<div class="sg-card-header">
<span class="sg-card-icon" aria-hidden="true">
<svg class="lucide lucide-droplet" aria-hidden="true">…</svg>
</span>
<div class="sg-card-titles">
<h3 class="sg-card-title">Tidepool</h3>
<p class="sg-card-description">Studio workspace · 5 members</p>
</div>
<div class="sg-card-actions">
<span data-tone="mint" data-variant="soft" data-size="md" class="sg-badge">
<span class="sg-badge-dot" aria-hidden="true">
</span>Active</span>
</div>
</div>
<div class="sg-card-body">Every surface is a pebble of frosted sea glass. Cards are just the biggest ones.</div>
<div class="sg-card-footer">
<button type="button" data-tone="clear" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble">
<span class="sg-button-label">Settings</span>
</button>
<button type="button" data-tone="primary" data-depth="md" data-interactive="" data-variant="pebble" data-size="md" class="sg-button sg-pebble">
<span class="sg-button-label">Open</span>
</button>
</div>
</div>
```

### Tones and interactive

interactive lifts on hover — use with asChild for cards that are links.

```tsx
import { Card, CardHeader } from "seaglass-ui";
import { Leaf, Sparkles, SunMedium } from "lucide-react";

export default function Tones() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 24, width: "100%" }}>
      <Card tone="seafoam" padding="sm" interactive tabIndex={0}><CardHeader icon={<Leaf />} title="Seafoam" description="Interactive" /></Card>
      <Card tone="lilac" padding="sm" interactive tabIndex={0}><CardHeader icon={<Sparkles />} title="Lilac" description="Interactive" /></Card>
      <Card tone="amber" padding="sm" interactive tabIndex={0}><CardHeader icon={<SunMedium />} title="Amber" description="Interactive" /></Card>
    </div>
  );
}
```

Rendered HTML:

```html
<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(190px, 1fr));gap:24px;width:100%">
<div data-tone="seafoam" data-depth="lg" data-padding="sm" data-interactive="" class="sg-card sg-pebble" tabindex="0">
<div class="sg-card-header">
<span class="sg-card-icon" aria-hidden="true">
<svg class="lucide lucide-leaf" aria-hidden="true">…</svg>
</span>
<div class="sg-card-titles">
<h3 class="sg-card-title">Seafoam</h3>
<p class="sg-card-description">Interactive</p>
</div>
</div>
</div>
<div data-tone="lilac" data-depth="lg" data-padding="sm" data-interactive="" class="sg-card sg-pebble" tabindex="0">
<div class="sg-card-header">
<span class="sg-card-icon" aria-hidden="true">
<svg class="lucide lucide-sparkles" aria-hidden="true">…</svg>
</span>
<div class="sg-card-titles">
<h3 class="sg-card-title">Lilac</h3>
<p class="sg-card-description">Interactive</p>
</div>
</div>
</div>
<div data-tone="amber" data-depth="lg" data-padding="sm" data-interactive="" class="sg-card sg-pebble" tabindex="0">
<div class="sg-card-header">
<span class="sg-card-icon" aria-hidden="true">
<svg class="lucide lucide-sun-medium" aria-hidden="true">…</svg>
</span>
<div class="sg-card-titles">
<h3 class="sg-card-title">Amber</h3>
<p class="sg-card-description">Interactive</p>
</div>
</div>
</div>
</div>
```
