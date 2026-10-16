# Slider

Pick a value or a range by dragging a pebble along a sunken track.

```tsx
import { Slider } from "seaglass-ui";
```

Built on the Radix Slider primitive (https://www.radix-ui.com/primitives/docs/components/slider) — the same keyboard and ARIA behaviour.

## Slider props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value · defaultValue · onValueChange` | `number[]` |  | One number per thumb. |
| `min · max · step` | `number` | `0 · 100 · 1` |  |
| `aria-label · aria-labelledby` | `string` |  | Names a single-thumb slider. |
| `thumbLabels` | `string[]` |  | Accessible names for the thumbs. Use these for ranges. |
| `tone` | `Tone` | `"aqua"` | Sea-glass tint. Semantic names map onto tints. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |  |
| `disabled` | `boolean` |  |  |

## Keyboard

- **← →** — Step
- **PgUp / PgDn** — Step × 10
- **Home / End** — Min / max

## Examples

### Single value

```tsx
import { useState } from "react";
import { Field, Slider } from "seaglass-ui";

export default function Basic() {
  const [volume, setVolume] = useState([60]);
  return (
    <div style={{ width: "min(400px, 100%)" }}>
      <Field label={`Volume · ${volume[0]}%`}>
        <Slider value={volume} onValueChange={setVolume} tone="lilac" thumbLabels={["Volume"]} />
      </Field>
    </div>
  );
}
```

Rendered HTML:

```html
<div style="width:min(400px, 100%)">
<div class="sg-field" data-orientation="vertical">
<label class="sg-label sg-field-label" for="sg-field-id">Volume · 60%</label>
<div class="sg-field-control">
<span dir="ltr" data-orientation="horizontal" aria-disabled="false" data-tone="lilac" class="sg-slider" style="--radix-slider-thumb-transform:translateX(-50%)">
<span data-orientation="horizontal" class="sg-slider-track sg-well">
<span data-orientation="horizontal" class="sg-slider-range" style="left:0%;right:40%">
</span>
</span>
<span style="transform:var(--radix-slider-thumb-transform);position:absolute;left:calc(0% + 0px)">
<span role="slider" aria-label="Volume" aria-valuemin="0" aria-valuemax="100" aria-orientation="horizontal" data-orientation="horizontal" tabindex="0" class="sg-slider-thumb sg-pebble" data-tone="clear" data-depth="xs" style="display:none" data-radix-collection-item="">
</span>
</span>
<input style="display:none"/>
</span>
</div>
</div>
</div>
```

### Range

Pass two values for two thumbs. Give each a name with thumbLabels.

```tsx
import { useState } from "react";
import { Field, Slider } from "seaglass-ui";

export default function Range() {
  const [price, setPrice] = useState([20, 80]);
  return (
    <div style={{ width: "min(400px, 100%)" }}>
      <Field label={`Price · $${price[0]} – $${price[1]}`}>
        <Slider value={price} onValueChange={setPrice} min={0} max={200} step={5} minStepsBetweenThumbs={2} thumbLabels={["Minimum price", "Maximum price"]} />
      </Field>
    </div>
  );
}
```

Rendered HTML:

```html
<div style="width:min(400px, 100%)">
<div class="sg-field" data-orientation="vertical">
<label class="sg-label sg-field-label" for="sg-field-id">Price · $20 – $80</label>
<div class="sg-field-control">
<span dir="ltr" data-orientation="horizontal" aria-disabled="false" data-tone="aqua" class="sg-slider" style="--radix-slider-thumb-transform:translateX(-50%)">
<span data-orientation="horizontal" class="sg-slider-track sg-well">
<span data-orientation="horizontal" class="sg-slider-range" style="left:10%;right:60%">
</span>
</span>
<span style="transform:var(--radix-slider-thumb-transform);position:absolute;left:calc(0% + 0px)">
<span role="slider" aria-label="Minimum price" aria-valuemin="0" aria-valuemax="200" aria-orientation="horizontal" data-orientation="horizontal" tabindex="0" class="sg-slider-thumb sg-pebble" data-tone="clear" data-depth="xs" style="display:none" data-radix-collection-item="">
</span>
</span>
<input style="display:none"/>
<span style="transform:var(--radix-slider-thumb-transform);position:absolute;left:calc(0% + 0px)">
<span role="slider" aria-label="Maximum price" aria-valuemin="0" aria-valuemax="200" aria-orientation="horizontal" data-orientation="horizontal" tabindex="0" class="sg-slider-thumb sg-pebble" data-tone="clear" data-depth="xs" style="display:none" data-radix-collection-item="">
</span>
</span>
<input style="display:none"/>
</span>
</div>
</div>
</div>
```
