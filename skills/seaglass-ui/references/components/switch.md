# Switch

An on/off toggle: a sunken track with a white chip.

```tsx
import { Switch } from "seaglass-ui";
```

Built on the Radix Switch primitive (https://www.radix-ui.com/primitives/docs/components/switch) — the same keyboard and ARIA behaviour.

## Switch props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked · defaultChecked · onCheckedChange` | `boolean` |  |  |
| `label` | `ReactNode` |  |  |
| `description` | `ReactNode` |  |  |
| `size` | `"sm" \| "md"` | `"md"` |  |
| `tone` | `Tone` | `"mint"` | Sea-glass tint. Semantic names map onto tints. |
| `disabled` | `boolean` |  |  |

## Keyboard

- **Space / Enter** — Toggle

## Examples

### Basic

```tsx
import { Switch } from "seaglass-ui";

export default function Basic() {
  return (
    <div style={{ display: "grid", gap: 18, width: "min(400px, 100%)" }}>
      <Switch label="Vacation mode" description="Pause all orders while you're away." />
      <Switch label="Two-factor authentication" defaultChecked tone="periwinkle" />
      <Switch label="Compact" size="sm" defaultChecked />
    </div>
  );
}
```

Rendered HTML:

```html
<div style="display:grid;gap:18px;width:min(400px, 100%)">
<label class="sg-choice sg-choice-switch">
<span class="sg-choice-text">
<span class="sg-choice-label">Vacation mode</span>
<span class="sg-choice-description">Pause all orders while you&#x27;re away.</span>
</span>
<button type="button" role="switch" aria-checked="false" data-state="unchecked" value="on" data-tone="mint" data-size="md" class="sg-switch">
<span data-state="unchecked" class="sg-switch-thumb">
</span>
</button>
<input type="checkbox" aria-hidden="true" tabindex="-1" style="position:absolute;pointer-events:none;opacity:0;margin:0;transform:translateX(-100%)" value="on"/>
</label>
<label class="sg-choice sg-choice-switch">
<span class="sg-choice-text">
<span class="sg-choice-label">Two-factor authentication</span>
</span>
<button type="button" role="switch" aria-checked="true" data-state="checked" value="on" data-tone="periwinkle" data-size="md" class="sg-switch">
<span data-state="checked" class="sg-switch-thumb">
</span>
</button>
<input type="checkbox" aria-hidden="true" tabindex="-1" style="position:absolute;pointer-events:none;opacity:0;margin:0;transform:translateX(-100%)" checked="" value="on"/>
</label>
<label class="sg-choice sg-choice-switch">
<span class="sg-choice-text">
<span class="sg-choice-label">Compact</span>
</span>
<button type="button" role="switch" aria-checked="true" data-state="checked" value="on" data-tone="mint" data-size="sm" class="sg-switch">
<span data-state="checked" class="sg-switch-thumb">
</span>
</button>
<input type="checkbox" aria-hidden="true" tabindex="-1" style="position:absolute;pointer-events:none;opacity:0;margin:0;transform:translateX(-100%)" checked="" value="on"/>
</label>
</div>
```
