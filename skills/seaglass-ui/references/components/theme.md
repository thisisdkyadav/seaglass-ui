# Theme

Light paper, or a dim warm room lit by one lamp. Persisted, system-aware and toggleable.

```tsx
import { ThemeProvider, useTheme } from "seaglass-ui";
```

## ThemeProvider props

Wrap your app once. It sets data-sg-theme on <html>.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultTheme` | `"light" \| "dark" \| "system"` | `"system"` | Used until the user picks one. |
| `theme` | `"light" \| "dark" \| "system"` |  | Controlled setting. |
| `onThemeChange` | `(t: ThemeSetting) => void` |  | Called when the setting changes. |
| `storageKey` | `string \| false` | `"sg-theme"` | localStorage key that remembers the choice. |
| `toggleHotkey` | `string \| false` | `"shift+d"` | Shortcut that flips light and dark. |
| `target` | `() => HTMLElement` | `document.documentElement` | Element that receives data-sg-theme. |

## useTheme() props

Read and change the theme from any component.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `theme` | `ThemeSetting` |  | The user's setting, possibly "system". |
| `resolved` | `"light" \| "dark"` |  | What is actually on screen. |
| `setTheme` | `(t: ThemeSetting) => void` |  | Change the setting. |
| `toggle` | `() => void` |  | Flip between light and dark. |

## Keyboard

- **Shift + D** — Toggle light / dark (configurable)

## Examples

### Theme switcher

useTheme gives the setting, the resolved theme and a toggle. Try Shift+D anywhere on this page.

```tsx
import { SegmentedControl, useTheme, type ThemeSetting } from "seaglass-ui";
import { Sun, Moon, Monitor } from "lucide-react";

// Wrap your app once in <ThemeProvider>. Shift+D toggles anywhere.
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <SegmentedControl
      aria-label="Theme"
      variant="joined"
      value={theme}
      onValueChange={(v) => setTheme(v as ThemeSetting)}
      options={[
        { value: "light", label: "Light", icon: <Sun size={16} /> },
        { value: "dark", label: "Dark", icon: <Moon size={16} /> },
        { value: "system", label: "System", icon: <Monitor size={16} /> },
      ]}
    />
  );
}
```

Rendered HTML:

```html
<div dir="ltr" role="radiogroup" data-tone="clear" data-variant="joined" data-size="md" data-depth="md" class="sg-segmented sg-pebble" aria-label="Theme" tabindex="-1" style="outline:none">
<button type="button" data-state="on" role="radio" aria-checked="true" class="sg-segment sg-chip-surface" tabindex="-1" data-radix-collection-item="">
<svg class="lucide lucide-sun" aria-hidden="true">…</svg>
<span>Light</span>
</button>
<button type="button" data-state="off" role="radio" aria-checked="false" class="sg-segment" tabindex="-1" data-radix-collection-item="">
<svg class="lucide lucide-moon" aria-hidden="true">…</svg>
<span>Dark</span>
</button>
<button type="button" data-state="off" role="radio" aria-checked="false" class="sg-segment" tabindex="-1" data-radix-collection-item="">
<svg class="lucide lucide-monitor" aria-hidden="true">…</svg>
<span>System</span>
</button>
</div>
```
