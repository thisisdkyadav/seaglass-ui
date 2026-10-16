# Accordion & Collapsible

Fold content away. Joined in one pebble, or as separate stones.

```tsx
import { Accordion, AccordionItem, Collapsible, CollapsibleTrigger, CollapsibleContent } from "seaglass-ui";
```

Built on the Radix Accordion primitive (https://www.radix-ui.com/primitives/docs/components/accordion) — the same keyboard and ARIA behaviour.

## Accordion props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` (required) | `"single" \| "multiple"` |  |  |
| `collapsible` | `boolean` | `false` | single only: allow closing the open item. |
| `variant` | `"joined" \| "separate"` | `"joined"` |  |
| `tone` | `Tone` | `"clear"` | Sea-glass tint. Semantic names map onto tints. |
| `value · defaultValue · onValueChange` | `string \| string[]` |  |  |

## AccordionItem props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `string` |  |  |
| `title` (required) | `ReactNode` |  |  |
| `icon` | `ReactNode` |  |  |
| `tone` | `Tone` | `from Accordion` | Sea-glass tint. Semantic names map onto tints. |
| `disabled` | `boolean` |  |  |

## Keyboard

- **Enter / Space** — Toggle
- **↑ ↓** — Move between headers
- **Home / End** — First / last

## Examples

### Joined

```tsx
import { Accordion, AccordionItem } from "seaglass-ui";
import { Waves, Palette, Code } from "lucide-react";

export default function Joined() {
  return (
    <Accordion type="single" collapsible defaultValue="a" style={{ width: "min(520px, 100%)" }}>
      <AccordionItem value="a" title="What is sea glass?" icon={<Waves />}>
        Frosted pebbles of glass, tumbled smooth by the sea. Here: a UI material.
      </AccordionItem>
      <AccordionItem value="b" title="Can I use my own colours?" icon={<Palette />}>
        Yes. Every tone is one hue / saturation / lightness triple — set --h, --s and --l on any pebble.
      </AccordionItem>
      <AccordionItem value="c" title="Does it work without React?" icon={<Code />}>
        The stylesheet does. Behaviour comes from Radix, so other frameworks need their own bindings.
      </AccordionItem>
    </Accordion>
  );
}
```

Rendered HTML:

```html
<div data-tone="clear" data-depth="lg" data-variant="joined" class="sg-accordion sg-pebble" style="width:min(520px, 100%)" data-orientation="vertical">
<div data-state="open" data-orientation="vertical" class="sg-accordion-item">
<h3 data-orientation="vertical" data-state="open" class="sg-accordion-header">
<button type="button" aria-controls="radix-id" aria-expanded="true" data-state="open" data-orientation="vertical" id="radix-id" class="sg-accordion-trigger" data-radix-collection-item="">
<span class="sg-accordion-icon" aria-hidden="true">
<svg class="lucide lucide-waves-horizontal" aria-hidden="true">…</svg>
</span>
<span class="sg-accordion-title">What is sea glass?</span>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="sg-accordion-chevron">
<path d="M6 9.5l6 6 6-6">
</path>
</svg>
</button>
</h3>
<div data-state="open" id="radix-id" role="region" aria-labelledby="radix-id" data-orientation="vertical" class="sg-accordion-content" style="--radix-accordion-content-height:var(--radix-collapsible-content-height);--radix-accordion-content-width:var(--radix-collapsible-content-width)">
<div class="sg-accordion-inner">Frosted pebbles of glass, tumbled smooth by the sea. Here: a UI material.</div>
</div>
</div>
<div data-state="closed" data-orientation="vertical" class="sg-accordion-item">
<h3 data-orientation="vertical" data-state="closed" class="sg-accordion-header">
<button type="button" aria-expanded="false" data-state="closed" data-orientation="vertical" id="radix-id" class="sg-accordion-trigger" data-radix-collection-item="">
<span class="sg-accordion-icon" aria-hidden="true">
<svg class="lucide lucide-palette" aria-hidden="true">…</svg>
</span>
<span class="sg-accordion-title">Can I use my own colours?</span>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="sg-accordion-chevron">
<path d="M6 9.5l6 6 6-6">
</path>
</svg>
</button>
</h3>
<div data-state="closed" id="radix-id" hidden="" role="region" aria-labelledby="radix-id" data-orientation="vertical" class="sg-accordion-content" style="--radix-accordion-content-height:var(--radix-collapsible-content-height);--radix-accordion-content-width:var(--radix-collapsible-content-width)">
</div>
</div>
<div data-state="closed" data-orientation="vertical" class="sg-accordion-item">
<h3 data-orientation="vertical" data-state="closed" class="sg-accordion-header">
<button type="button" aria-expanded="false" data-state="closed" data-orientation="vertical" id="radix-id" class="sg-accordion-trigger" data-radix-collection-item="">
<span class="sg-accordion-icon" aria-hidden="true">
<svg class="lucide lucide-code" aria-hidden="true">…</svg>
</span>
<span class="sg-accordion-title">Does it work without React?</span>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="sg-accordion-chevron">
<path d="M6 9.5l6 6 6-6">
</path>
</svg>
</button>
</h3>
<div data-state="closed" id="radix-id" hidden="" role="region" aria-labelledby="radix-id" data-orientation="vertical" class="sg-accordion-content" style="--radix-accordion-content-height:var(--radix-collapsible-content-height);--radix-accordion-content-width:var(--radix-collapsible-content-width)">
</div>
</div>
</div>
```

### Separate, multiple open

```tsx
import { Accordion, AccordionItem } from "seaglass-ui";

export default function Separate() {
  return (
    <Accordion type="multiple" variant="separate" tone="seafoam" style={{ width: "min(520px, 100%)" }}>
      <AccordionItem value="shipping" title="Shipping">Free over $50, otherwise $4.90.</AccordionItem>
      <AccordionItem value="returns" title="Returns">30 days, no questions asked.</AccordionItem>
      <AccordionItem value="warranty" title="Warranty">Two years on everything we make.</AccordionItem>
    </Accordion>
  );
}
```

Rendered HTML:

```html
<div data-tone="seafoam" data-variant="separate" class="sg-accordion" style="width:min(520px, 100%)" data-orientation="vertical">
<div data-state="closed" data-orientation="vertical" data-tone="seafoam" data-depth="md" class="sg-accordion-item sg-pebble">
<h3 data-orientation="vertical" data-state="closed" class="sg-accordion-header">
<button type="button" aria-expanded="false" data-state="closed" data-orientation="vertical" id="radix-id" class="sg-accordion-trigger" data-radix-collection-item="">
<span class="sg-accordion-title">Shipping</span>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="sg-accordion-chevron">
<path d="M6 9.5l6 6 6-6">
</path>
</svg>
</button>
</h3>
<div data-state="closed" id="radix-id" hidden="" role="region" aria-labelledby="radix-id" data-orientation="vertical" class="sg-accordion-content" style="--radix-accordion-content-height:var(--radix-collapsible-content-height);--radix-accordion-content-width:var(--radix-collapsible-content-width)">
</div>
</div>
<div data-state="closed" data-orientation="vertical" data-tone="seafoam" data-depth="md" class="sg-accordion-item sg-pebble">
<h3 data-orientation="vertical" data-state="closed" class="sg-accordion-header">
<button type="button" aria-expanded="false" data-state="closed" data-orientation="vertical" id="radix-id" class="sg-accordion-trigger" data-radix-collection-item="">
<span class="sg-accordion-title">Returns</span>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="sg-accordion-chevron">
<path d="M6 9.5l6 6 6-6">
</path>
</svg>
</button>
</h3>
<div data-state="closed" id="radix-id" hidden="" role="region" aria-labelledby="radix-id" data-orientation="vertical" class="sg-accordion-content" style="--radix-accordion-content-height:var(--radix-collapsible-content-height);--radix-accordion-content-width:var(--radix-collapsible-content-width)">
</div>
</div>
<div data-state="closed" data-orientation="vertical" data-tone="seafoam" data-depth="md" class="sg-accordion-item sg-pebble">
<h3 data-orientation="vertical" data-state="closed" class="sg-accordion-header">
<button type="button" aria-expanded="false" data-state="closed" data-orientation="vertical" id="radix-id" class="sg-accordion-trigger" data-radix-collection-item="">
<span class="sg-accordion-title">Warranty</span>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="sg-accordion-chevron">
<path d="M6 9.5l6 6 6-6">
</path>
</svg>
</button>
</h3>
<div data-state="closed" id="radix-id" hidden="" role="region" aria-labelledby="radix-id" data-orientation="vertical" class="sg-accordion-content" style="--radix-accordion-content-height:var(--radix-collapsible-content-height);--radix-accordion-content-width:var(--radix-collapsible-content-width)">
</div>
</div>
</div>
```

### Collapsible

```tsx
import { useState } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent, Button } from "seaglass-ui";
import { ChevronDown } from "lucide-react";

export default function CollapsibleExample() {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen} style={{ width: "min(420px, 100%)" }}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" tone="clear" iconEnd={<ChevronDown style={{ rotate: open ? "180deg" : "0deg", transition: "rotate .3s" }} />}>
          Advanced options
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p style={{ margin: "12px 0 0", color: "var(--sg-ink-muted)" }}>
          Collapsible animates its height using the measured size of its content.
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
}
```

Rendered HTML:

```html
<div data-state="closed" style="width:min(420px, 100%)">
<button type="button" data-tone="clear" data-variant="ghost" data-size="md" class="sg-button" aria-expanded="false" data-state="closed">
<span class="sg-button-label">Advanced options</span>
<span class="sg-button-icon" aria-hidden="true">
<svg class="lucide lucide-chevron-down" aria-hidden="true">…</svg>
</span>
</button>
<div data-state="closed" id="radix-id" hidden="" class="sg-collapsible-content">
</div>
</div>
```
