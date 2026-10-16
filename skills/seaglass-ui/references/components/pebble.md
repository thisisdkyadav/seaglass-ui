# Pebble

The material every surface is made of: a frosted, domed stone that casts a soft shadow.

Pebble is the base of the library. Buttons, cards, badges and menus are all pebbles with different shapes. Use it directly for custom surfaces — swatches, logos, tiles, highlight blocks.

```tsx
import { Pebble } from "seaglass-ui";
```

## Pebble props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tone` | `Tone` | `"clear"` | Sea-glass tint. Semantic names map onto tints. |
| `depth` | `"xs" \| "sm" \| "md" \| "lg"` | `"lg"` | Height above the page: shadow length and rim strength. |
| `radius` | `"sm" \| "md" \| "lg" \| "xl" \| "full" \| string` | `"lg"` | A radius token or any CSS length. |
| `interactive` | `boolean` | `false` | Lift on hover, sink on press. |
| `asChild` | `boolean` | `false` | Merge onto the single child element instead of rendering a div. |
| `...props` | `HTMLAttributes<HTMLDivElement>` |  | Everything else is passed to the underlying element. |

## Examples

### Tones

Eleven sun-bleached tints plus a milky clear. Text automatically takes a very dark shade of the pebble's own hue.

```tsx
import { Pebble } from "seaglass-ui";

const tones = ["clear", "periwinkle", "aqua", "sky", "seafoam", "mint", "lilac", "coral", "rose", "amber", "sand"] as const;

export default function Tones() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 22, width: "100%" }}>
      {tones.map((tone) => (
        <Pebble key={tone} tone={tone} style={{ height: 80, display: "grid", alignItems: "end", padding: "10px 14px", fontWeight: 600 }}>
          {tone}
        </Pebble>
      ))}
    </div>
  );
}
```

Rendered HTML:

```html
<div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(110px, 1fr));gap:22px;width:100%">
<div data-tone="clear" data-depth="lg" class="sg-pebble" style="height:80px;display:grid;align-items:end;padding:10px 14px;font-weight:600">clear</div>
<div data-tone="periwinkle" data-depth="lg" class="sg-pebble" style="height:80px;display:grid;align-items:end;padding:10px 14px;font-weight:600">periwinkle</div>
<div data-tone="aqua" data-depth="lg" class="sg-pebble" style="height:80px;display:grid;align-items:end;padding:10px 14px;font-weight:600">aqua</div>
<div data-tone="sky" data-depth="lg" class="sg-pebble" style="height:80px;display:grid;align-items:end;padding:10px 14px;font-weight:600">sky</div>
<div data-tone="seafoam" data-depth="lg" class="sg-pebble" style="height:80px;display:grid;align-items:end;padding:10px 14px;font-weight:600">seafoam</div>
<div data-tone="mint" data-depth="lg" class="sg-pebble" style="height:80px;display:grid;align-items:end;padding:10px 14px;font-weight:600">mint</div>
<div data-tone="lilac" data-depth="lg" class="sg-pebble" style="height:80px;display:grid;align-items:end;padding:10px 14px;font-weight:600">lilac</div>
<div data-tone="coral" data-depth="lg" class="sg-pebble" style="height:80px;display:grid;align-items:end;padding:10px 14px;font-weight:600">coral</div>
<div data-tone="rose" data-depth="lg" class="sg-pebble" style="height:80px;display:grid;align-items:end;padding:10px 14px;font-weight:600">rose</div>
<div data-tone="amber" data-depth="lg" class="sg-pebble" style="height:80px;display:grid;align-items:end;padding:10px 14px;font-weight:600">amber</div>
<div data-tone="sand" data-depth="lg" class="sg-pebble" style="height:80px;display:grid;align-items:end;padding:10px 14px;font-weight:600">sand</div>
</div>
```

### Depth

How far the pebble sits above the page. Shadow length scales with depth so everything appears to rest at the same height.

```tsx
import { Pebble } from "seaglass-ui";

export default function Depth() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
      <Pebble tone="periwinkle" depth="lg" radius="xl" style={{ width: 170, height: 104 }} />
      <Pebble tone="periwinkle" depth="md" radius="lg" style={{ width: 120, height: 76 }} />
      <Pebble tone="periwinkle" depth="sm" radius="md" style={{ width: 84, height: 54 }} />
      <Pebble tone="periwinkle" depth="xs" radius="sm" style={{ width: 52, height: 38 }} />
    </div>
  );
}
```

Rendered HTML:

```html
<div style="display:flex;align-items:center;gap:28px;flex-wrap:wrap">
<div data-tone="periwinkle" data-depth="lg" class="sg-pebble" style="width:170px;height:104px;--sg-r:var(--sg-radius-xl)">
</div>
<div data-tone="periwinkle" data-depth="md" class="sg-pebble" style="width:120px;height:76px;--sg-r:var(--sg-radius-lg)">
</div>
<div data-tone="periwinkle" data-depth="sm" class="sg-pebble" style="width:84px;height:54px;--sg-r:var(--sg-radius-md)">
</div>
<div data-tone="periwinkle" data-depth="xs" class="sg-pebble" style="width:52px;height:38px;--sg-r:var(--sg-radius-sm)">
</div>
</div>
```

### Interactive

Lifts on hover and sinks on press. Pair with asChild to make a link or button a pebble.

```tsx
import { Pebble } from "seaglass-ui";

export default function Interactive() {
  return (
    <Pebble asChild tone="seafoam" interactive>
      <button style={{ padding: "22px 30px", font: "inherit", fontWeight: 600 }}>
        Hover lifts · press sinks
      </button>
    </Pebble>
  );
}
```

Rendered HTML:

```html
<button style="padding:22px 30px;font:inherit;font-weight:600" data-tone="seafoam" data-depth="lg" data-interactive="" class="sg-pebble">Hover lifts · press sinks</button>
```

### Custom tint

Any colour is one hue / saturation / lightness triple. Set --h, --s and --l and the body, rim, core, lip and shadow are all derived.

```tsx
import { Pebble } from "seaglass-ui";

// Any colour is one hue / saturation / lightness triple.
// Body, rim, core, lip, shadow and text are all derived from it.
export default function CustomTint() {
  return (
    <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
      <Pebble style={{ "--h": 172, "--s": "45%", "--l": "80%", padding: "20px 26px", fontWeight: 600 } as React.CSSProperties}>
        Bottle green
      </Pebble>
      <Pebble style={{ "--h": 256, "--s": "60%", "--l": "86%", padding: "20px 26px", fontWeight: 600 } as React.CSSProperties}>
        Lavender
      </Pebble>
    </div>
  );
}
```

Rendered HTML:

```html
<div style="display:flex;gap:22px;flex-wrap:wrap">
<div data-tone="clear" data-depth="lg" class="sg-pebble" style="--h:172;--s:45%;--l:80%;padding:20px 26px;font-weight:600">Bottle green</div>
<div data-tone="clear" data-depth="lg" class="sg-pebble" style="--h:256;--s:60%;--l:86%;padding:20px 26px;font-weight:600">Lavender</div>
</div>
```
