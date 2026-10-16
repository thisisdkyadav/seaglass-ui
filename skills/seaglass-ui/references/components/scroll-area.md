# Scroll area

A scroll container with slim glass scrollbars that keep native scrolling.

```tsx
import { ScrollArea } from "seaglass-ui";
```

Built on the Radix Scroll Area primitive (https://www.radix-ui.com/primitives/docs/components/scroll-area) — the same keyboard and ARIA behaviour.

## ScrollArea props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `"vertical" \| "horizontal" \| "both"` | `"vertical"` | Which scrollbars to draw. |
| `maxHeight` | `number \| string` |  | Max height of the viewport. |
| `type` | `"hover" \| "scroll" \| "auto" \| "always"` | `"hover"` | When the scrollbars show. |
| `aria-label` | `string` |  | Makes the viewport a named region that keyboard users can focus and scroll. |

## Keyboard

- **↑ ↓ ← →** — Scroll (when the viewport is focused)
- **PgUp / PgDn · Home / End** — Scroll by a page, to the start or end

## Accessibility

- Scrolling stays native: wheel, touch, keyboard and screen readers work as usual.
- If the content has nothing focusable inside, pass aria-label so keyboard users can reach and scroll it.

## Examples

### Vertical

```tsx
import { ScrollArea, Separator } from "seaglass-ui";

const tags = Array.from({ length: 40 }, (_, i) => `v1.${40 - i}.0`);

export default function Basic() {
  return (
    <ScrollArea aria-label="Releases" maxHeight={220} className="sg-well" style={{ width: 220, borderRadius: 14 }}>
      <div style={{ padding: "12px 16px" }}>
        <h4 style={{ margin: "0 0 8px", fontSize: 13 }}>Releases</h4>
        {tags.map((t, i) => (
          <div key={t}>
            <div style={{ fontSize: 13, padding: "6px 0" }}>{t}</div>
            {i < tags.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
```

Rendered HTML:

```html
<div dir="ltr" class="sg-scroll-area sg-well" style="position:relative;--radix-scroll-area-corner-width:0px;--radix-scroll-area-corner-height:0px;width:220px;border-radius:14px">
<style>[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}</style>
<div data-radix-scroll-area-viewport="" class="sg-scroll-viewport" style="overflow-x:hidden;overflow-y:hidden;max-height:220px" role="region" aria-label="Releases" tabindex="0">
<div style="min-width:100%;display:table">
<div style="padding:12px 16px">
<h4 style="margin:0 0 8px;font-size:13px">Releases</h4>
<div>
<div style="font-size:13px;padding:6px 0">v1.40.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.39.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.38.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.37.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.36.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.35.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.34.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.33.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.32.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.31.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.30.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.29.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.28.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.27.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.26.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.25.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.24.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.23.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.22.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.21.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.20.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.19.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.18.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.17.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.16.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.15.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.14.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.13.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.12.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.11.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.10.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.9.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.8.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.7.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.6.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.5.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.4.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.3.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.2.0</div>
<div data-orientation="horizontal" role="separator" class="sg-separator">
</div>
</div>
<div>
<div style="font-size:13px;padding:6px 0">v1.1.0</div>
</div>
</div>
</div>
</div>
</div>
```

### Horizontal

```tsx
import { Pebble, ScrollArea } from "seaglass-ui";

const tones = ["periwinkle", "aqua", "sky", "seafoam", "mint", "lilac", "coral", "rose", "amber", "sand"] as const;

export default function Horizontal() {
  return (
    <ScrollArea orientation="horizontal" aria-label="Tints" style={{ width: "min(460px, 100%)" }}>
      <div style={{ display: "flex", gap: 14, padding: "6px 6px 18px" }}>
        {tones.map((t) => (
          <Pebble key={t} tone={t} depth="sm" style={{ flex: "none", width: 110, height: 80, display: "grid", placeItems: "end start", padding: 10, fontSize: 13, fontWeight: 600 }}>{t}</Pebble>
        ))}
      </div>
    </ScrollArea>
  );
}
```

Rendered HTML:

```html
<div dir="ltr" class="sg-scroll-area" style="position:relative;--radix-scroll-area-corner-width:0px;--radix-scroll-area-corner-height:0px;width:min(460px, 100%)">
<style>[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}</style>
<div data-radix-scroll-area-viewport="" class="sg-scroll-viewport" style="overflow-x:hidden;overflow-y:hidden" role="region" aria-label="Tints" tabindex="0">
<div style="min-width:100%;display:table">
<div style="display:flex;gap:14px;padding:6px 6px 18px">
<div data-tone="periwinkle" data-depth="sm" class="sg-pebble" style="flex:none;width:110px;height:80px;display:grid;place-items:end start;padding:10px;font-size:13px;font-weight:600">periwinkle</div>
<div data-tone="aqua" data-depth="sm" class="sg-pebble" style="flex:none;width:110px;height:80px;display:grid;place-items:end start;padding:10px;font-size:13px;font-weight:600">aqua</div>
<div data-tone="sky" data-depth="sm" class="sg-pebble" style="flex:none;width:110px;height:80px;display:grid;place-items:end start;padding:10px;font-size:13px;font-weight:600">sky</div>
<div data-tone="seafoam" data-depth="sm" class="sg-pebble" style="flex:none;width:110px;height:80px;display:grid;place-items:end start;padding:10px;font-size:13px;font-weight:600">seafoam</div>
<div data-tone="mint" data-depth="sm" class="sg-pebble" style="flex:none;width:110px;height:80px;display:grid;place-items:end start;padding:10px;font-size:13px;font-weight:600">mint</div>
<div data-tone="lilac" data-depth="sm" class="sg-pebble" style="flex:none;width:110px;height:80px;display:grid;place-items:end start;padding:10px;font-size:13px;font-weight:600">lilac</div>
<div data-tone="coral" data-depth="sm" class="sg-pebble" style="flex:none;width:110px;height:80px;display:grid;place-items:end start;padding:10px;font-size:13px;font-weight:600">coral</div>
<div data-tone="rose" data-depth="sm" class="sg-pebble" style="flex:none;width:110px;height:80px;display:grid;place-items:end start;padding:10px;font-size:13px;font-weight:600">rose</div>
<div data-tone="amber" data-depth="sm" class="sg-pebble" style="flex:none;width:110px;height:80px;display:grid;place-items:end start;padding:10px;font-size:13px;font-weight:600">amber</div>
<div data-tone="sand" data-depth="sm" class="sg-pebble" style="flex:none;width:110px;height:80px;display:grid;place-items:end start;padding:10px;font-size:13px;font-weight:600">sand</div>
</div>
</div>
</div>
</div>
```
