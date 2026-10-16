# Toggle & Toggle group

Buttons that stay pressed, alone or in a group: bold, alignment, filters.

```tsx
import { Toggle, ToggleGroup, ToggleGroupItem } from "seaglass-ui";
```

Built on the Radix Toggle Group primitive (https://www.radix-ui.com/primitives/docs/components/toggle-group) — the same keyboard and ARIA behaviour.

## Toggle props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `pressed · defaultPressed · onPressedChange` | `boolean` |  |  |
| `variant` | `"ghost" \| "soft"` | `"ghost"` |  |
| `tone` | `Tone` | `"clear"` | Sea-glass tint. Semantic names map onto tints. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |  |
| `icon` | `ReactNode` |  | Pass aria-label too when there is no text. |

## ToggleGroup props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` (required) | `"single" \| "multiple"` |  |  |
| `value · defaultValue · onValueChange` | `string \| string[]` |  | string for single, string[] for multiple. |
| `layout` | `"joined" \| "separate"` | `"joined"` |  |
| `variant · tone · size` | `—` |  | Applied to every item. |
| `aria-label` | `string` |  | Name the group. |

## ToggleGroupItem props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `string` |  |  |
| `icon · disabled` | `—` |  |  |

## Keyboard

- **Space / Enter** — Press or release
- **← → (group)** — Move between items

## Accessibility

- Toggle sets aria-pressed. A single ToggleGroup uses radio semantics; a multiple one uses aria-pressed buttons.

## Examples

### Toggle

```tsx
import { useState } from "react";
import { Toggle } from "seaglass-ui";
import { Bold, Pin, Star } from "lucide-react";

export default function Basic() {
  const [pinned, setPinned] = useState(true);
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Toggle aria-label="Bold" icon={<Bold />} />
      <Toggle pressed={pinned} onPressedChange={setPinned} icon={<Pin />}>{pinned ? "Pinned" : "Pin"}</Toggle>
      <Toggle variant="soft" tone="amber" icon={<Star />} defaultPressed>Starred</Toggle>
    </div>
  );
}
```

Rendered HTML:

```html
<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
<button type="button" aria-pressed="false" data-state="off" data-tone="clear" data-size="md" data-variant="ghost" class="sg-toggle sg-toggle-icon-only" aria-label="Bold">
<span class="sg-toggle-icon" aria-hidden="true">
<svg class="lucide lucide-bold" aria-hidden="true">…</svg>
</span>
</button>
<button type="button" aria-pressed="true" data-state="on" data-tone="clear" data-size="md" data-variant="ghost" class="sg-toggle">
<span class="sg-toggle-icon" aria-hidden="true">
<svg class="lucide lucide-pin" aria-hidden="true">…</svg>
</span>Pinned</button>
<button type="button" aria-pressed="true" data-state="on" data-tone="amber" data-size="md" data-variant="soft" class="sg-toggle">
<span class="sg-toggle-icon" aria-hidden="true">
<svg class="lucide lucide-star" aria-hidden="true">…</svg>
</span>Starred</button>
</div>
```

### Toggle group

multiple for independent options, single for one-of. A joined group sits in a well.

```tsx
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "seaglass-ui";
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from "lucide-react";

export default function Group() {
  const [align, setAlign] = useState("left");
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
      <ToggleGroup type="multiple" aria-label="Text style" defaultValue={["bold"]}>
        <ToggleGroupItem value="bold" aria-label="Bold" icon={<Bold />} />
        <ToggleGroupItem value="italic" aria-label="Italic" icon={<Italic />} />
        <ToggleGroupItem value="underline" aria-label="Underline" icon={<Underline />} />
      </ToggleGroup>
      <ToggleGroup type="single" aria-label="Alignment" value={align} onValueChange={(v) => v && setAlign(v)}>
        <ToggleGroupItem value="left" aria-label="Align left" icon={<AlignLeft />} />
        <ToggleGroupItem value="center" aria-label="Align centre" icon={<AlignCenter />} />
        <ToggleGroupItem value="right" aria-label="Align right" icon={<AlignRight />} />
      </ToggleGroup>
      <ToggleGroup type="multiple" layout="separate" variant="soft" tone="aqua" aria-label="Days" defaultValue={["mon", "wed"]}>
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => <ToggleGroupItem key={d} value={d.toLowerCase()}>{d}</ToggleGroupItem>)}
      </ToggleGroup>
    </div>
  );
}
```

Rendered HTML:

```html
<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">
<div dir="ltr" role="toolbar" data-tone="clear" data-size="md" data-variant="ghost" data-layout="joined" class="sg-toggle-group sg-well" aria-label="Text style" tabindex="-1" style="outline:none">
<button type="button" aria-pressed="true" data-state="on" class="sg-toggle sg-toggle-icon-only" aria-label="Bold" tabindex="-1" data-radix-collection-item="">
<span class="sg-toggle-icon" aria-hidden="true">
<svg class="lucide lucide-bold" aria-hidden="true">…</svg>
</span>
</button>
<button type="button" aria-pressed="false" data-state="off" class="sg-toggle sg-toggle-icon-only" aria-label="Italic" tabindex="-1" data-radix-collection-item="">
<span class="sg-toggle-icon" aria-hidden="true">
<svg class="lucide lucide-italic" aria-hidden="true">…</svg>
</span>
</button>
<button type="button" aria-pressed="false" data-state="off" class="sg-toggle sg-toggle-icon-only" aria-label="Underline" tabindex="-1" data-radix-collection-item="">
<span class="sg-toggle-icon" aria-hidden="true">
<svg class="lucide lucide-underline" aria-hidden="true">…</svg>
</span>
</button>
</div>
<div dir="ltr" role="radiogroup" data-tone="clear" data-size="md" data-variant="ghost" data-layout="joined" class="sg-toggle-group sg-well" aria-label="Alignment" tabindex="-1" style="outline:none">
<button type="button" data-state="on" role="radio" aria-checked="true" class="sg-toggle sg-toggle-icon-only" aria-label="Align left" tabindex="-1" data-radix-collection-item="">
<span class="sg-toggle-icon" aria-hidden="true">
<svg class="lucide lucide-text-align-start" aria-hidden="true">…</svg>
</span>
</button>
<button type="button" data-state="off" role="radio" aria-checked="false" class="sg-toggle sg-toggle-icon-only" aria-label="Align centre" tabindex="-1" data-radix-collection-item="">
<span class="sg-toggle-icon" aria-hidden="true">
<svg class="lucide lucide-text-align-center" aria-hidden="true">…</svg>
</span>
</button>
<button type="button" data-state="off" role="radio" aria-checked="false" class="sg-toggle sg-toggle-icon-only" aria-label="Align right" tabindex="-1" data-radix-collection-item="">
<span class="sg-toggle-icon" aria-hidden="true">
<svg class="lucide lucide-text-align-end" aria-hidden="true">…</svg>
</span>
</button>
</div>
<div dir="ltr" role="toolbar" data-tone="aqua" data-size="md" data-variant="soft" data-layout="separate" class="sg-toggle-group" aria-label="Days" tabindex="-1" style="outline:none">
<button type="button" aria-pressed="true" data-state="on" class="sg-toggle" tabindex="-1" data-radix-collection-item="">Mon</button>
<button type="button" aria-pressed="false" data-state="off" class="sg-toggle" tabindex="-1" data-radix-collection-item="">Tue</button>
<button type="button" aria-pressed="true" data-state="on" class="sg-toggle" tabindex="-1" data-radix-collection-item="">Wed</button>
<button type="button" aria-pressed="false" data-state="off" class="sg-toggle" tabindex="-1" data-radix-collection-item="">Thu</button>
<button type="button" aria-pressed="false" data-state="off" class="sg-toggle" tabindex="-1" data-radix-collection-item="">Fri</button>
</div>
</div>
```
