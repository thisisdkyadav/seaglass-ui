// Every component page is generated from an entry here. Prop tables mirror the
// TypeScript interfaces in ../../../src/components — keep them in step.

export interface Prop { name: string; type: string; default?: string; description: string; required?: boolean }
export interface PropGroup { name: string; description?: string; props: Prop[] }
export interface ExampleRef { id: string; title: string; description?: string }
export interface Entry {
  slug: string;
  name: string;
  group: Group;
  summary: string;
  description?: string;
  imports: string;
  examples: ExampleRef[];
  api: PropGroup[];
  keyboard?: [string, string][];
  a11y?: string[];
  /** Radix primitive this wraps, linked from the page. */
  radix?: { name: string; url: string };
}

export const groups = ["Foundations", "Primitives", "Forms", "Overlays", "Navigation", "Data display", "Utilities"] as const;
export type Group = (typeof groups)[number];

const TONE = `"clear" | "periwinkle" | "aqua" | "sky" | "seafoam" | "mint" | "lilac" | "coral" | "rose" | "amber" | "sand" | "primary" | "success" | "warning" | "danger" | "info" | "neutral"`;
const tone = (d: string, description = "Sea-glass tint. Semantic names map onto tints."): Prop => ({ name: "tone", type: "Tone", default: d, description });
const SIZE = `"sm" | "md" | "lg"`;
const radix = (name: string, path: string) => ({ name, url: `https://www.radix-ui.com/primitives/docs/components/${path}` });
const rest = (el: string): Prop => ({ name: "...props", type: el, description: "Everything else is passed to the underlying element." });

export const toneType = TONE;

export const registry: Entry[] = [
  // ───────────────────────── Foundations
  {
    slug: "pebble", name: "Pebble", group: "Foundations",
    summary: "The material every surface is made of: a frosted, domed stone that casts a soft shadow.",
    description: "Pebble is the base of the library. Buttons, cards, badges and menus are all pebbles with different shapes. Use it directly for custom surfaces — swatches, logos, tiles, highlight blocks.",
    imports: `import { Pebble } from "seaglass";`,
    examples: [
      { id: "pebble/tones", title: "Tones", description: "Eleven sun-bleached tints plus a milky clear. Text automatically takes a very dark shade of the pebble's own hue." },
      { id: "pebble/depth", title: "Depth", description: "How far the pebble sits above the page. Shadow length scales with depth so everything appears to rest at the same height." },
      { id: "pebble/interactive", title: "Interactive", description: "Lifts on hover and sinks on press. Pair with asChild to make a link or button a pebble." },
      { id: "pebble/custom-tint", title: "Custom tint", description: "Any colour is one hue / saturation / lightness triple. Set --h, --s and --l and the body, rim, core, lip and shadow are all derived." },
    ],
    api: [{
      name: "Pebble", props: [
        tone(`"clear"`),
        { name: "depth", type: `"xs" | "sm" | "md" | "lg"`, default: `"lg"`, description: "Height above the page: shadow length and rim strength." },
        { name: "radius", type: `"sm" | "md" | "lg" | "xl" | "full" | string`, default: `"lg"`, description: "A radius token or any CSS length." },
        { name: "interactive", type: "boolean", default: "false", description: "Lift on hover, sink on press." },
        { name: "asChild", type: "boolean", default: "false", description: "Merge onto the single child element instead of rendering a div." },
        rest("HTMLAttributes<HTMLDivElement>"),
      ],
    }],
  },
  {
    slug: "theme", name: "Theme", group: "Foundations",
    summary: "Light paper, or a dim warm room lit by one lamp. Persisted, system-aware and toggleable.",
    imports: `import { ThemeProvider, useTheme } from "seaglass";`,
    examples: [{ id: "theme/toggle", title: "Theme switcher", description: "useTheme gives the setting, the resolved theme and a toggle. Try Shift+D anywhere on this page." }],
    api: [
      {
        name: "ThemeProvider", description: "Wrap your app once. It sets data-sg-theme on <html>.", props: [
          { name: "defaultTheme", type: `"light" | "dark" | "system"`, default: `"system"`, description: "Used until the user picks one." },
          { name: "theme", type: `"light" | "dark" | "system"`, description: "Controlled setting." },
          { name: "onThemeChange", type: "(t: ThemeSetting) => void", description: "Called when the setting changes." },
          { name: "storageKey", type: "string | false", default: `"sg-theme"`, description: "localStorage key that remembers the choice." },
          { name: "toggleHotkey", type: "string | false", default: `"shift+d"`, description: "Shortcut that flips light and dark." },
          { name: "target", type: "() => HTMLElement", default: "document.documentElement", description: "Element that receives data-sg-theme." },
        ],
      },
      {
        name: "useTheme()", description: "Read and change the theme from any component.", props: [
          { name: "theme", type: "ThemeSetting", description: "The user's setting, possibly \"system\"." },
          { name: "resolved", type: `"light" | "dark"`, description: "What is actually on screen." },
          { name: "setTheme", type: "(t: ThemeSetting) => void", description: "Change the setting." },
          { name: "toggle", type: "() => void", description: "Flip between light and dark." },
        ],
      },
    ],
    keyboard: [["Shift + D", "Toggle light / dark (configurable)"]],
  },

  // ───────────────────────── Primitives
  {
    slug: "button", name: "Button", group: "Primitives",
    summary: "A raised pebble that lifts on hover and sinks when pressed. Plus soft, ghost and link variants.",
    imports: `import { Button, IconButton, ButtonGroup } from "seaglass";`,
    examples: [
      { id: "button/variants", title: "Variants" },
      { id: "button/tones", title: "Tones", description: "Every tone works with every variant." },
      { id: "button/sizes", title: "Sizes" },
      { id: "button/icons-loading", title: "Icons and loading", description: "loading keeps the button's width, shows a spinner and blocks clicks." },
      { id: "button/icon-button", title: "Icon button", description: "A round or square pebble for a single icon. aria-label is required." },
      { id: "button/as-child", title: "As a link", description: "asChild renders the button styles onto your own element — an anchor or a router link." },
    ],
    api: [
      {
        name: "Button", props: [
          { name: "variant", type: `"pebble" | "soft" | "ghost" | "link"`, default: `"pebble"`, description: "pebble: raised stone · soft: flat tinted wash · ghost: no surface until hover · link: text only." },
          tone(`"clear"`),
          { name: "size", type: SIZE, default: `"md"`, description: "Height and padding." },
          { name: "icon", type: "ReactNode", description: "Icon before the label." },
          { name: "iconEnd", type: "ReactNode", description: "Icon after the label." },
          { name: "loading", type: "boolean", default: "false", description: "Spinner in place of the icon; keeps width; sets aria-busy and blocks clicks." },
          { name: "fullWidth", type: "boolean", default: "false", description: "Stretch to the container." },
          { name: "asChild", type: "boolean", default: "false", description: "Render as the child element." },
          rest("ButtonHTMLAttributes<HTMLButtonElement>"),
        ],
      },
      {
        name: "IconButton", props: [
          { name: "aria-label", type: "string", required: true, description: "Accessible name — there is no visible label." },
          { name: "shape", type: `"circle" | "square"`, default: `"circle"`, description: "Round or rounded square." },
          { name: "children", type: "ReactNode", required: true, description: "The icon." },
          { name: "variant · tone · size · loading · asChild", type: "—", description: "As on Button." },
        ],
      },
      { name: "ButtonGroup", props: [{ name: "gap", type: `"sm" | "md" | "lg"`, default: `"md"`, description: "Space between buttons." }] },
    ],
    keyboard: [["Enter / Space", "Activate"]],
    a11y: ["Native <button> with type=\"button\" by default.", "loading sets aria-busy and disables the button."],
  },
  {
    slug: "badge", name: "Badge", group: "Primitives",
    summary: "Small status labels and counts.",
    imports: `import { Badge, Count } from "seaglass";`,
    examples: [
      { id: "badge/variants", title: "Variants" },
      { id: "badge/count", title: "Count", description: "A numeric pill. max caps it, e.g. 99+." },
    ],
    api: [
      {
        name: "Badge", props: [
          { name: "variant", type: `"soft" | "pebble" | "outline" | "solid"`, default: `"soft"`, description: "soft: tinted wash · pebble: tiny raised stone · outline · solid: deep ink fill." },
          tone(`"neutral"`),
          { name: "size", type: `"sm" | "md"`, default: `"md"`, description: "" },
          { name: "dot", type: "boolean", default: "false", description: "A coloured dot before the label." },
          { name: "icon", type: "ReactNode", description: "Icon before the label." },
        ],
      },
      {
        name: "Count", props: [
          { name: "value", type: "number", required: true, description: "The number." },
          { name: "max", type: "number", default: "99", description: "Above this, shows \"max+\"." },
          tone(`"rose"`),
        ],
      },
    ],
  },
  {
    slug: "avatar", name: "Avatar", group: "Primitives",
    summary: "A picture, or initials on a pebble, with an optional presence dot.",
    imports: `import { Avatar, AvatarGroup } from "seaglass";`,
    examples: [
      { id: "avatar/sizes", title: "Sizes and status", description: "Without src, initials are shown on a tone picked stably from the name." },
      { id: "avatar/group", title: "Group", description: "Overlapping stack; anything past max collapses into +N." },
    ],
    api: [
      {
        name: "Avatar", props: [
          { name: "name", type: "string", required: true, description: "Initials fallback, alt text and default tone." },
          { name: "src", type: "string", description: "Image URL. Falls back to initials while loading or on error." },
          { name: "size", type: `"xs" | "sm" | "md" | "lg" | "xl"`, default: `"md"`, description: "" },
          tone("from name"),
          { name: "shape", type: `"circle" | "square"`, default: `"circle"`, description: "" },
          { name: "status", type: `"online" | "away" | "busy" | "offline"`, description: "Presence dot." },
          { name: "fallback", type: "ReactNode", description: "Shown instead of initials." },
        ],
      },
      { name: "AvatarGroup", props: [{ name: "max", type: "number", default: "4", description: "Show at most this many." }, { name: "size", type: "Avatar size", default: `"sm"`, description: "Applied to every child." }] },
    ],
    radix: radix("Avatar", "avatar"),
  },
  {
    slug: "card", name: "Card", group: "Primitives",
    summary: "A large pebble for grouping content, with a header, body and footer.",
    imports: `import { Card, CardHeader, CardBody, CardFooter } from "seaglass";`,
    examples: [
      { id: "card/basic", title: "Basic" },
      { id: "card/tones", title: "Tones and interactive", description: "interactive lifts on hover — use with asChild for cards that are links." },
    ],
    api: [
      {
        name: "Card", props: [
          tone(`"clear"`),
          { name: "depth", type: `"xs" | "sm" | "md" | "lg"`, default: `"lg"`, description: "" },
          { name: "padding", type: `"none" | "sm" | "md" | "lg"`, default: `"md"`, description: "Inner spacing." },
          { name: "interactive", type: "boolean", default: "false", description: "Lift on hover, sink on press." },
          { name: "asChild", type: "boolean", default: "false", description: "Render as the child element." },
        ],
      },
      {
        name: "CardHeader", props: [
          { name: "title", type: "ReactNode", description: "Rendered as a heading." },
          { name: "description", type: "ReactNode", description: "Muted line under the title." },
          { name: "icon", type: "ReactNode", description: "Shown before the title." },
          { name: "actions", type: "ReactNode", description: "Right-aligned buttons, a menu or a legend." },
        ],
      },
    ],
  },
  {
    slug: "kbd", name: "Kbd", group: "Primitives",
    summary: "Keyboard keys and combos, rendered with the right symbols for the platform.",
    imports: `import { Kbd } from "seaglass";`,
    examples: [{ id: "kbd/combos", title: "Keys and combos", description: "\"mod\" shows ⌘ on Apple devices and Ctrl elsewhere." }],
    api: [{ name: "Kbd", props: [{ name: "keys", type: "string", description: "A combo like \"mod+shift+p\". Or pass children for a single key." }] }],
  },
  {
    slug: "separator", name: "Separator", group: "Primitives",
    summary: "A hairline between content, optionally with a label.",
    imports: `import { Separator } from "seaglass";`,
    examples: [{ id: "separator/basic", title: "Horizontal, labelled and vertical" }],
    api: [{
      name: "Separator", props: [
        { name: "orientation", type: `"horizontal" | "vertical"`, default: `"horizontal"`, description: "" },
        { name: "label", type: "ReactNode", description: "Text in the middle of the line." },
        { name: "decorative", type: "boolean", default: "true", description: "When false, announced as a separator." },
      ],
    }],
    radix: radix("Separator", "separator"),
  },
  {
    slug: "skeleton", name: "Skeleton", group: "Primitives",
    summary: "Placeholder shapes that shimmer while content loads.",
    imports: `import { Skeleton } from "seaglass";`,
    examples: [{ id: "skeleton/basic", title: "Loading card" }],
    api: [{
      name: "Skeleton", props: [
        { name: "shape", type: `"block" | "text" | "circle"`, default: `"block"`, description: "" },
        { name: "width", type: "number | string", description: "" },
        { name: "height", type: "number | string", description: "" },
      ],
    }],
    a11y: ["Hidden from assistive tech. Mark the loading region with aria-busy."],
  },
  {
    slug: "progress", name: "Progress & Spinner", group: "Primitives",
    summary: "A sunken track filled with a pebble, and a spinner for indeterminate waits.",
    imports: `import { Progress, Spinner } from "seaglass";`,
    examples: [
      { id: "progress/basic", title: "Progress", description: "Leave value undefined for an indeterminate bar." },
      { id: "progress/spinner", title: "Spinner" },
    ],
    api: [
      {
        name: "Progress", props: [
          { name: "value", type: "number | null", description: "0–max. Undefined or null is indeterminate." },
          { name: "max", type: "number", default: "100", description: "" },
          tone(`"aqua"`),
          { name: "size", type: SIZE, default: `"md"`, description: "" },
          { name: "label", type: "ReactNode", description: "Label row above the bar." },
          { name: "showValue", type: "boolean", default: "false", description: "Show the value in the label row." },
          { name: "formatValue", type: "(value, max) => ReactNode", default: "percent", description: "" },
        ],
      },
      { name: "Spinner", props: [{ name: "size", type: "number", default: "18", description: "Pixels." }, { name: "label", type: "string", default: `"Loading"`, description: "Accessible name." }] },
    ],
    radix: radix("Progress", "progress"),
  },
  {
    slug: "empty-state", name: "Empty state", group: "Primitives",
    summary: "What to show when there is nothing to show.",
    imports: `import { EmptyState } from "seaglass";`,
    examples: [{ id: "empty-state/basic", title: "Basic" }],
    api: [{
      name: "EmptyState", props: [
        { name: "title", type: "ReactNode", required: true, description: "" },
        { name: "description", type: "ReactNode", description: "" },
        { name: "icon", type: "ReactNode", description: "Shown on a pebble." },
        { name: "actions", type: "ReactNode", description: "Buttons under the text." },
        tone(`"lilac"`),
      ],
    }],
  },

  // ───────────────────────── Forms
  {
    slug: "field", name: "Field & Input", group: "Forms",
    summary: "Sunken text fields with labels, hints and errors wired up for you.",
    description: "Field generates ids and connects the label, description and error to whatever control is inside it — Input, Textarea, Select, Combobox or a DatePicker.",
    imports: `import { Field, Input, Textarea } from "seaglass";`,
    examples: [
      { id: "field/basic", title: "Label, hint and error", description: "Passing error marks the control aria-invalid and links the message." },
      { id: "field/adornments", title: "Leading and trailing", description: "Icons, text or buttons inside the well." },
      { id: "field/textarea", title: "Textarea", description: "autoResize grows with the content." },
    ],
    api: [
      {
        name: "Field", props: [
          { name: "label", type: "ReactNode", description: "" },
          { name: "description", type: "ReactNode", description: "Hint under the control." },
          { name: "error", type: "ReactNode", description: "Error message. Its presence marks the control invalid." },
          { name: "required", type: "boolean", default: "false", description: "Adds a marker and the required attribute." },
          { name: "disabled", type: "boolean", default: "false", description: "Disables the control." },
          { name: "orientation", type: `"vertical" | "horizontal"`, default: `"vertical"`, description: "Label beside the control." },
          { name: "id", type: "string", description: "Override the generated control id." },
        ],
      },
      {
        name: "Input", props: [
          { name: "size", type: SIZE, default: `"md"`, description: "" },
          { name: "leading", type: "ReactNode", description: "Inside the well, before the value." },
          { name: "trailing", type: "ReactNode", description: "Inside the well, after the value." },
          { name: "invalid", type: "boolean", description: "Set automatically inside a Field with an error." },
          rest("InputHTMLAttributes<HTMLInputElement>"),
        ],
      },
      { name: "Textarea", props: [{ name: "autoResize", type: "boolean", default: "false", description: "Grow with the content. Cap it with a CSS max-height." }, { name: "invalid", type: "boolean", description: "" }] },
    ],
    a11y: ["Label, description and error are linked with htmlFor and aria-describedby.", "Use useField() to wire up a custom control."],
  },
  {
    slug: "checkbox", name: "Checkbox", group: "Forms",
    summary: "A small pebble that fills with a check. Supports indeterminate.",
    imports: `import { Checkbox } from "seaglass";`,
    examples: [{ id: "checkbox/basic", title: "Basic" }],
    api: [{
      name: "Checkbox", props: [
        { name: "checked", type: `boolean | "indeterminate"`, description: "Controlled state." },
        { name: "defaultChecked", type: "boolean", description: "" },
        { name: "onCheckedChange", type: "(checked) => void", description: "" },
        { name: "label", type: "ReactNode", description: "Clickable label to the right." },
        { name: "description", type: "ReactNode", description: "Muted line under the label." },
        tone(`"mint"`),
        { name: "disabled", type: "boolean", description: "" },
      ],
    }],
    keyboard: [["Space", "Toggle"]],
    radix: radix("Checkbox", "checkbox"),
  },
  {
    slug: "radio-group", name: "Radio group", group: "Forms",
    summary: "One choice from a few.",
    imports: `import { RadioGroup, Radio } from "seaglass";`,
    examples: [{ id: "radio-group/basic", title: "With descriptions" }, { id: "radio-group/horizontal", title: "Horizontal" }],
    api: [
      {
        name: "RadioGroup", props: [
          { name: "value · defaultValue · onValueChange", type: "string", description: "Selected value." },
          { name: "orientation", type: `"vertical" | "horizontal"`, default: `"vertical"`, description: "Also sets arrow-key direction." },
          tone(`"periwinkle"`),
          { name: "disabled", type: "boolean", description: "" },
        ],
      },
      { name: "Radio", props: [{ name: "value", type: "string", required: true, description: "" }, { name: "label", type: "ReactNode", description: "" }, { name: "description", type: "ReactNode", description: "" }, { name: "disabled", type: "boolean", description: "" }] },
    ],
    keyboard: [["Tab", "Move into / out of the group"], ["↑ ↓ ← →", "Move and select"]],
    radix: radix("Radio Group", "radio-group"),
  },
  {
    slug: "switch", name: "Switch", group: "Forms",
    summary: "An on/off toggle: a sunken track with a white chip.",
    imports: `import { Switch } from "seaglass";`,
    examples: [{ id: "switch/basic", title: "Basic" }],
    api: [{
      name: "Switch", props: [
        { name: "checked · defaultChecked · onCheckedChange", type: "boolean", description: "" },
        { name: "label", type: "ReactNode", description: "" },
        { name: "description", type: "ReactNode", description: "" },
        { name: "size", type: `"sm" | "md"`, default: `"md"`, description: "" },
        tone(`"mint"`),
        { name: "disabled", type: "boolean", description: "" },
      ],
    }],
    keyboard: [["Space / Enter", "Toggle"]],
    radix: radix("Switch", "switch"),
  },
  {
    slug: "slider", name: "Slider", group: "Forms",
    summary: "Pick a value or a range by dragging a pebble along a sunken track.",
    imports: `import { Slider } from "seaglass";`,
    examples: [{ id: "slider/basic", title: "Single value" }, { id: "slider/range", title: "Range", description: "Pass two values for two thumbs. Give each a name with thumbLabels." }],
    api: [{
      name: "Slider", props: [
        { name: "value · defaultValue · onValueChange", type: "number[]", description: "One number per thumb." },
        { name: "min · max · step", type: "number", default: "0 · 100 · 1", description: "" },
        { name: "thumbLabels", type: "string[]", description: "Accessible names for the thumbs." },
        tone(`"aqua"`),
        { name: "orientation", type: `"horizontal" | "vertical"`, default: `"horizontal"`, description: "" },
        { name: "disabled", type: "boolean", description: "" },
      ],
    }],
    keyboard: [["← →", "Step"], ["PgUp / PgDn", "Step × 10"], ["Home / End", "Min / max"]],
    radix: radix("Slider", "slider"),
  },
  {
    slug: "segmented-control", name: "Segmented control", group: "Forms",
    summary: "A row of mutually exclusive options. Separate pebbles, or one pebble with a white chip.",
    imports: `import { SegmentedControl } from "seaglass";`,
    examples: [
      { id: "segmented-control/separate", title: "Separate", description: "Each option is its own pebble; the selected one fills with colour." },
      { id: "segmented-control/joined", title: "Joined", description: "One pebble, with a white chip resting on the selection." },
    ],
    api: [{
      name: "SegmentedControl", props: [
        { name: "options", type: "{ value, label, icon?, disabled? }[]", required: true, description: "" },
        { name: "value · defaultValue · onValueChange", type: "string", description: "" },
        { name: "variant", type: `"separate" | "joined"`, default: `"separate"`, description: "" },
        tone(`"mint"` + " · joined: " + `"clear"`),
        { name: "size", type: SIZE, default: `"md"`, description: "" },
        { name: "showCheck", type: "boolean", default: "true", description: "Check mark on the selected pebble (separate variant)." },
        { name: "aria-label", type: "string", description: "Name for the group." },
      ],
    }],
    keyboard: [["↑ ↓ ← →", "Move and select"]],
    radix: radix("Toggle Group", "toggle-group"),
  },
  {
    slug: "select", name: "Select", group: "Forms",
    summary: "Choose one option from a list in a frosted popover.",
    imports: `import { Select, SelectItem, SelectSeparator } from "seaglass";`,
    examples: [{ id: "select/basic", title: "Basic" }, { id: "select/groups", title: "Groups, icons and descriptions" }],
    api: [{
      name: "Select", props: [
        { name: "options", type: "(SelectOption | { label, options })[]", description: "Flat options or labelled groups. Or pass <SelectItem> children." },
        { name: "value · defaultValue · onValueChange", type: "string", description: "" },
        { name: "placeholder", type: "ReactNode", description: "" },
        { name: "size", type: SIZE, default: `"md"`, description: "" },
        { name: "invalid", type: "boolean", description: "" },
        { name: "disabled", type: "boolean", description: "" },
        { name: "aria-label", type: "string", description: "Needed when not inside a Field." },
      ],
    }],
    keyboard: [["Space / Enter / ↓", "Open"], ["↑ ↓", "Move"], ["A–Z", "Jump to a matching option"], ["Esc", "Close"]],
    radix: radix("Select", "select"),
  },
  {
    slug: "combobox", name: "Combobox", group: "Forms",
    summary: "A searchable select, single or multiple, with optional create.",
    imports: `import { Combobox } from "seaglass";`,
    examples: [
      { id: "combobox/single", title: "Single", description: "Options can be grouped and carry icons, descriptions and extra keywords." },
      { id: "combobox/multiple", title: "Multiple", description: "Chosen values become chips; past maxChips they collapse into +N. onCreate offers to add what was typed." },
    ],
    api: [{
      name: "Combobox", props: [
        { name: "options", type: "{ value, label, icon?, description?, group?, keywords?, disabled? }[]", required: true, description: "" },
        { name: "multiple", type: "boolean", default: "false", description: "Value becomes string[]." },
        { name: "value · defaultValue · onValueChange", type: "string | null  ·  string[]", description: "" },
        { name: "placeholder", type: "string", default: `"Select…"`, description: "" },
        { name: "searchPlaceholder", type: "string", default: `"Search…"`, description: "" },
        { name: "empty", type: "ReactNode", default: `"No matches."`, description: "" },
        { name: "onCreate", type: "(query: string) => void", description: "Offer “Create …” when nothing matches." },
        { name: "maxChips", type: "number", default: "3", description: "Multiple only." },
        { name: "size · invalid · disabled · aria-label", type: "—", description: "As on Select." },
      ],
    }],
    keyboard: [["Enter / ↓", "Open"], ["A–Z", "Filter"], ["↑ ↓", "Move"], ["Enter", "Choose"], ["Esc", "Close"]],
  },
  {
    slug: "date-picker", name: "Date picker", group: "Forms",
    summary: "A calendar, a single-date picker and a range picker with presets.",
    imports: `import { Calendar, DatePicker, DateRangePicker } from "seaglass";`,
    examples: [
      { id: "date-picker/calendar", title: "Calendar" },
      { id: "date-picker/date-picker", title: "Date picker" },
      { id: "date-picker/range", title: "Range picker", description: "Two months side by side, with quick presets." },
    ],
    api: [
      {
        name: "Calendar", props: [
          { name: "mode", type: `"single" | "range"`, default: `"single"`, description: "" },
          { name: "value · defaultValue · onValueChange", type: "Date | null  ·  { from, to }", description: "" },
          { name: "month · defaultMonth · onMonthChange", type: "Date", description: "Month on show." },
          { name: "min · max", type: "Date", description: "" },
          { name: "isDisabled", type: "(d: Date) => boolean", description: "Disable individual days." },
          { name: "weekStartsOn", type: "0–6", default: "1", description: "0 is Sunday." },
          { name: "numberOfMonths", type: "1 | 2", default: "1", description: "" },
          { name: "locale", type: "string", description: "Any Intl locale." },
        ],
      },
      {
        name: "DatePicker", props: [
          { name: "value · defaultValue · onValueChange", type: "Date | null", description: "" },
          { name: "placeholder", type: "string", default: `"Pick a date"`, description: "" },
          { name: "format", type: "Intl.DateTimeFormatOptions", default: "{ dateStyle: \"medium\" }", description: "" },
          { name: "size · disabled · invalid", type: "—", description: "" },
          { name: "min · max · isDisabled · weekStartsOn · locale", type: "—", description: "Passed to Calendar." },
        ],
      },
      { name: "DateRangePicker", props: [{ name: "value · defaultValue · onValueChange", type: "{ from: Date | null; to: Date | null }", description: "" }, { name: "placeholder", type: "string", default: `"Pick dates"`, description: "" }, { name: "presets", type: "{ label, range: () => DateRange }[]", description: "Quick ranges beside the calendar." }] },
    ],
    keyboard: [["← → ↑ ↓", "Day / week"], ["PgUp / PgDn", "Month"], ["Shift + PgUp / Shift + PgDn", "Year"], ["Home / End", "Start / end of week"], ["Enter / Space", "Select"]],
  },

  // ───────────────────────── Overlays
  {
    slug: "tooltip", name: "Tooltip", group: "Overlays",
    summary: "A short label on hover or focus, with an optional shortcut.",
    imports: `import { Tooltip, TooltipProvider } from "seaglass";`,
    examples: [{ id: "tooltip/basic", title: "With shortcuts" }],
    api: [{
      name: "Tooltip", props: [
        { name: "content", type: "ReactNode", required: true, description: "" },
        { name: "shortcut", type: "string", description: "Combo shown after the text, e.g. \"mod+k\"." },
        { name: "side", type: `"top" | "right" | "bottom" | "left"`, default: `"top"`, description: "" },
        { name: "delayDuration", type: "number", default: "300", description: "Hover delay in ms." },
        { name: "disabled", type: "boolean", description: "Render the child only." },
      ],
    }, { name: "TooltipProvider", description: "Wrap your app once.", props: [{ name: "delayDuration", type: "number", default: "700", description: "Shared default; individual tooltips use 300 unless set." }] }],
    radix: radix("Tooltip", "tooltip"),
  },
  {
    slug: "popover", name: "Popover & Hover card", group: "Overlays",
    summary: "Floating frosted panels: click for a popover, hover for a preview card.",
    imports: `import { Popover, PopoverTrigger, PopoverContent, HoverCard, HoverCardTrigger, HoverCardContent } from "seaglass";`,
    examples: [{ id: "popover/basic", title: "Popover" }, { id: "popover/hover-card", title: "Hover card" }],
    api: [{
      name: "PopoverContent", props: [
        tone(`"clear"`),
        { name: "padding", type: `"none" | "sm" | "md"`, default: `"md"`, description: "" },
        { name: "side · align · sideOffset", type: "—", description: "Positioning, as in Radix." },
      ],
    }],
    keyboard: [["Esc", "Close"], ["Tab", "Moves through the content"]],
    radix: radix("Popover", "popover"),
  },
  {
    slug: "dropdown-menu", name: "Dropdown menu", group: "Overlays",
    summary: "Actions in a menu: icons, shortcuts, checkable items, radio groups and submenus.",
    imports: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "seaglass";`,
    examples: [{ id: "dropdown-menu/basic", title: "Actions and submenus" }, { id: "dropdown-menu/checkable", title: "Checkable and radio items" }],
    api: [{
      name: "DropdownMenuItem", description: "Also applies to CheckboxItem, RadioItem and SubTrigger.", props: [
        { name: "icon", type: "ReactNode", description: "" },
        { name: "shortcut", type: "string", description: "Shown on the right, e.g. \"mod+d\". Display only." },
        { name: "description", type: "ReactNode", description: "Muted second line." },
        { name: "tone", type: `"danger"`, description: "Destructive action." },
        { name: "inset", type: "boolean", description: "Align with items that have icons." },
        { name: "onSelect", type: "(e: Event) => void", description: "" },
      ],
    }],
    keyboard: [["Enter / Space / ↓", "Open"], ["↑ ↓", "Move"], ["→ / ←", "Open / close submenu"], ["A–Z", "Jump to item"], ["Esc", "Close"]],
    radix: radix("Dropdown Menu", "dropdown-menu"),
  },
  {
    slug: "context-menu", name: "Context menu", group: "Overlays",
    summary: "The same menu, opened with a right-click or long-press.",
    imports: `import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "seaglass";`,
    examples: [{ id: "context-menu/basic", title: "Right-click the area" }],
    api: [{ name: "ContextMenuItem", props: [{ name: "icon · shortcut · description · tone · inset", type: "—", description: "As on DropdownMenuItem." }] }],
    keyboard: [["Shift + F10", "Open"], ["↑ ↓", "Move"], ["Esc", "Close"]],
    radix: radix("Context Menu", "context-menu"),
  },
  {
    slug: "dialog", name: "Dialog", group: "Overlays",
    summary: "A modal pebble over a soft scrim.",
    imports: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter, DialogClose } from "seaglass";`,
    examples: [{ id: "dialog/basic", title: "Form in a dialog" }],
    api: [{
      name: "DialogContent", props: [
        { name: "size", type: `"sm" | "md" | "lg" | "xl" | "full"`, default: `"md"`, description: "" },
        tone(`"clear"`),
        { name: "hideClose", type: "boolean", default: "false", description: "Hide the × in the corner." },
      ],
    }],
    keyboard: [["Esc", "Close"], ["Tab", "Focus stays inside"]],
    a11y: ["Focus moves in on open and returns to the trigger on close.", "DialogTitle names the dialog; DialogDescription describes it."],
    radix: radix("Dialog", "dialog"),
  },
  {
    slug: "sheet", name: "Sheet", group: "Overlays",
    summary: "A dialog that slides in from an edge.",
    imports: `import { Sheet, SheetTrigger, SheetContent } from "seaglass";`,
    examples: [{ id: "sheet/sides", title: "Sides" }],
    api: [{ name: "SheetContent", props: [{ name: "side", type: `"left" | "right" | "top" | "bottom"`, default: `"right"`, description: "" }, { name: "size · tone · hideClose", type: "—", description: "As on DialogContent." }] }],
    keyboard: [["Esc", "Close"]],
    radix: radix("Dialog", "dialog"),
  },
  {
    slug: "alert-dialog", name: "Alert dialog", group: "Overlays",
    summary: "Confirm a destructive action. Waits for async confirms with a spinner.",
    imports: `import { AlertDialog } from "seaglass";`,
    examples: [{ id: "alert-dialog/basic", title: "Confirm a delete", description: "Return a promise from onConfirm and the dialog stays open, with a busy button, until it settles. If it rejects, the dialog stays open." }],
    api: [{
      name: "AlertDialog", props: [
        { name: "title", type: "ReactNode", required: true, description: "" },
        { name: "description", type: "ReactNode", description: "" },
        { name: "trigger", type: "ReactNode", description: "Element that opens it." },
        { name: "onConfirm", type: "() => void | Promise<void>", description: "" },
        { name: "confirmLabel", type: "ReactNode", default: `"Confirm"`, description: "" },
        { name: "cancelLabel", type: "ReactNode", default: `"Cancel"`, description: "" },
        { name: "tone", type: `"danger" | "primary"`, default: `"primary"`, description: "Colour of the confirm button." },
        { name: "icon", type: "ReactNode", description: "" },
        { name: "open · defaultOpen · onOpenChange", type: "boolean", description: "" },
      ],
    }],
    keyboard: [["Esc", "Cancel"], ["Tab", "Focus stays inside; Cancel starts focused"]],
    radix: radix("Alert Dialog", "alert-dialog"),
  },
  {
    slug: "toast", name: "Toast", group: "Overlays",
    summary: "Brief notifications, called from anywhere with toast().",
    imports: `import { Toaster, toast } from "seaglass";`,
    examples: [
      { id: "toast/kinds", title: "Kinds" },
      { id: "toast/action", title: "With an action" },
      { id: "toast/loading", title: "Loading → result", description: "toast.loading returns an id; toast.update swaps it for the result. toast.promise does both for you." },
    ],
    api: [
      { name: "Toaster", description: "Render once, near the root.", props: [{ name: "position", type: `"top-right" | "top-center" | "bottom-right" | "bottom-center" | "bottom-left"`, default: `"bottom-right"`, description: "" }, { name: "hotkey", type: "string[]", default: `["F8"]`, description: "Focuses the region." }] },
      {
        name: "toast(title, options?)", description: "Also toast.success · error · warning · info · loading, toast.update(id, …), toast.dismiss(id?) and toast.promise(p, { loading, success, error }).", props: [
          { name: "description", type: "ReactNode", description: "" },
          { name: "duration", type: "number", default: "5000 (loading: Infinity)", description: "Milliseconds." },
          { name: "action", type: "{ label, onClick, altText? }", description: "A button in the toast." },
          { name: "icon", type: "ReactNode", description: "Override the kind's icon." },
          { name: "id", type: "string", description: "Reuse to replace an existing toast." },
        ],
      },
    ],
    keyboard: [["F8", "Focus the toasts"], ["Esc", "Dismiss the focused toast"]],
    radix: radix("Toast", "toast"),
  },
  {
    slug: "command", name: "Command", group: "Overlays",
    summary: "Fuzzy-searchable command lists, inline or as a ⌘K palette.",
    imports: `import { Command, CommandInput, CommandList, CommandGroup, CommandItem, CommandPalette } from "seaglass";`,
    examples: [{ id: "command/inline", title: "Inline" }, { id: "command/palette", title: "Palette", description: "A dialog with the command list inside. Opens with ⌘K / Ctrl K by default." }],
    api: [
      {
        name: "CommandPalette", props: [
          { name: "open · onOpenChange", type: "boolean", required: true, description: "" },
          { name: "hotkey", type: "string | false", default: `"mod+k"`, description: "Toggles it." },
          { name: "placeholder", type: "string", default: `"Type a command or search…"`, description: "" },
          { name: "empty", type: "ReactNode", default: `"No results."`, description: "Shown when nothing matches." },
          { name: "footer", type: "ReactNode", description: "Defaults to navigation hints." },
          { name: "filter", type: "(value, search, keywords?) => number", description: "Custom ranking." },
        ],
      },
      { name: "CommandItem", props: [{ name: "icon", type: "ReactNode", description: "" }, { name: "shortcut", type: "string", description: "" }, { name: "description", type: "ReactNode", description: "" }, { name: "keywords", type: "string[]", description: "Extra search terms." }, { name: "onSelect", type: "(value) => void", description: "" }] },
    ],
    keyboard: [["⌘ K / Ctrl K", "Open the palette"], ["↑ ↓", "Move"], ["Enter", "Run"], ["Esc", "Close"]],
  },

  // ───────────────────────── Navigation
  {
    slug: "tabs", name: "Tabs", group: "Navigation",
    summary: "Switch between views. A pebble tray with a white chip, plain chips or an underline.",
    imports: `import { Tabs, TabsList, Tab, TabsContent } from "seaglass";`,
    examples: [{ id: "tabs/pebble", title: "Pebble" }, { id: "tabs/variants", title: "Chips and line" }],
    api: [
      { name: "Tabs", props: [{ name: "variant", type: `"pebble" | "chips" | "line"`, default: `"pebble"`, description: "" }, tone(`"clear"`), { name: "value · defaultValue · onValueChange", type: "string", description: "" }, { name: "activationMode", type: `"automatic" | "manual"`, default: `"automatic"`, description: "" }] },
      { name: "Tab", props: [{ name: "value", type: "string", required: true, description: "" }, { name: "icon", type: "ReactNode", description: "" }, { name: "count", type: "ReactNode", description: "A small count after the label." }, { name: "disabled", type: "boolean", description: "" }] },
    ],
    keyboard: [["← →", "Move between tabs"], ["Home / End", "First / last"]],
    radix: radix("Tabs", "tabs"),
  },
  {
    slug: "accordion", name: "Accordion & Collapsible", group: "Navigation",
    summary: "Fold content away. Joined in one pebble, or as separate stones.",
    imports: `import { Accordion, AccordionItem, Collapsible, CollapsibleTrigger, CollapsibleContent } from "seaglass";`,
    examples: [{ id: "accordion/joined", title: "Joined" }, { id: "accordion/separate", title: "Separate, multiple open" }, { id: "accordion/collapsible", title: "Collapsible" }],
    api: [
      { name: "Accordion", props: [{ name: "type", type: `"single" | "multiple"`, required: true, description: "" }, { name: "collapsible", type: "boolean", default: "false", description: "single only: allow closing the open item." }, { name: "variant", type: `"joined" | "separate"`, default: `"joined"`, description: "" }, tone(`"clear"`), { name: "value · defaultValue · onValueChange", type: "string | string[]", description: "" }] },
      { name: "AccordionItem", props: [{ name: "value", type: "string", required: true, description: "" }, { name: "title", type: "ReactNode", required: true, description: "" }, { name: "icon", type: "ReactNode", description: "" }, tone("from Accordion"), { name: "disabled", type: "boolean", description: "" }] },
    ],
    keyboard: [["Enter / Space", "Toggle"], ["↑ ↓", "Move between headers"], ["Home / End", "First / last"]],
    radix: radix("Accordion", "accordion"),
  },
  {
    slug: "breadcrumbs", name: "Breadcrumbs", group: "Navigation",
    summary: "Where you are, with long trails collapsed into a menu.",
    imports: `import { Breadcrumbs } from "seaglass";`,
    examples: [{ id: "breadcrumbs/basic", title: "Basic and collapsed" }],
    api: [{
      name: "Breadcrumbs", props: [
        { name: "items", type: "{ label, href?, onClick? }[]", required: true, description: "The last item is the current page." },
        { name: "maxItems", type: "number", default: "5", description: "Collapse the middle beyond this many." },
        { name: "separator", type: "ReactNode", description: "" },
        { name: "renderLink", type: "(crumb, children) => ReactNode", description: "Render links with your router." },
      ],
    }],
    a11y: ["A <nav aria-label=\"Breadcrumb\"> with an ordered list; the last item has aria-current=\"page\"."],
  },
  {
    slug: "pagination", name: "Pagination", group: "Navigation",
    summary: "Move through pages of results.",
    imports: `import { Pagination } from "seaglass";`,
    examples: [{ id: "pagination/basic", title: "Basic" }],
    api: [{ name: "Pagination", props: [{ name: "page", type: "number", required: true, description: "1-based." }, { name: "pageCount", type: "number", required: true, description: "" }, { name: "onPageChange", type: "(page: number) => void", required: true, description: "" }, { name: "siblings", type: "number", default: "1", description: "Pages either side of the current one." }] }],
  },
  {
    slug: "sidebar", name: "Sidebar", group: "Navigation",
    summary: "An app shell: collapsible to a rail, resizable, searchable, multi-level, and a drawer on phones.",
    description: "SidebarProvider lays out the shell and remembers its state. SidebarNav takes your sections as data and handles nested groups, keyboard navigation, rail flyouts and search. This very site is built with it.",
    imports: `import { SidebarProvider, Sidebar, SidebarHeader, SidebarSearch, SidebarNav, SidebarFooter, SidebarInset, SidebarTrigger } from "seaglass";`,
    examples: [{ id: "sidebar/shell", title: "App shell", description: "Contained here; in your app it fills the viewport." }],
    api: [
      {
        name: "SidebarProvider", props: [
          { name: "collapsed · defaultCollapsed · onCollapsedChange", type: "boolean", description: "Rail mode." },
          { name: "storageKey", type: "string | false", default: `"sg-sidebar"`, description: "Remember collapsed state, width and open groups." },
          { name: "hotkeys", type: "string[] | false", default: `["[", "mod+b"]`, description: "Toggle the rail." },
          { name: "searchHotkey", type: "string | false", default: `"/"`, description: "Focus the search." },
          { name: "mobileBreakpoint", type: "number", default: "900", description: "Below this width it becomes a drawer." },
          { name: "defaultWidth · minWidth · maxWidth", type: "number", default: "264 · 220 · 420", description: "Expanded width in px." },
          { name: "defaultOpen", type: "string[]", description: "Group ids open on first visit." },
        ],
      },
      { name: "Sidebar", props: [tone(`"clear"`), { name: "resizable", type: "boolean", default: "true", description: "Drag the edge; double-click to reset." }, { name: "aria-label", type: "string", default: `"Main navigation"`, description: "" }] },
      {
        name: "SidebarNav", props: [
          { name: "sections", type: "NavSection[]", required: true, description: "{ id, title?, items, collapsible? }" },
          { name: "activeId", type: "string", description: "The current item; its parents open automatically." },
          { name: "onNavigate", type: "(item: NavItem) => void", description: "A leaf was chosen." },
          { name: "renderLink", type: "(item, props) => ReactNode", description: "Use your router's link. Spread props onto it." },
        ],
      },
      {
        name: "NavItem", props: [
          { name: "id · label", type: "string", required: true, description: "" },
          { name: "icon", type: "ReactNode", description: "" },
          { name: "href", type: "string", description: "" },
          { name: "badge · badgeTone", type: "ReactNode · Tone", description: "Count on the right." },
          { name: "tag", type: "string", description: "A small uppercase tag, e.g. \"new\"." },
          { name: "dot", type: "Tone", description: "A coloured dot instead of an icon." },
          { name: "children", type: "NavItem[]", description: "Nested items, any depth." },
          { name: "keywords", type: "string[]", description: "Extra search terms." },
        ],
      },
      { name: "SidebarButton", description: "Workspace switchers and account buttons that work in both modes.", props: [{ name: "media", type: "ReactNode", required: true, description: "Avatar or logo." }, { name: "title", type: "ReactNode", required: true, description: "" }, { name: "subtitle", type: "ReactNode", description: "" }, { name: "end", type: "ReactNode", description: "Trailing glyph." }, { name: "railLabel", type: "string", description: "Tooltip in rail mode." }] },
      { name: "useSidebar()", props: [{ name: "collapsed · setCollapsed · toggle", type: "—", description: "" }, { name: "isMobile · mobileOpen · setMobileOpen", type: "—", description: "" }] },
    ],
    keyboard: [["[ / ⌘ B / Ctrl B", "Collapse / expand"], ["/", "Search the nav"], ["↑ ↓", "Move between items"], ["→ / ←", "Open / close a group"], ["Home / End", "First / last item"]],
    a11y: ["Nav items are a tree of links and buttons with aria-expanded and aria-current.", "On phones the sidebar is a modal drawer with a focus trap."],
  },

  // ───────────────────────── Data display
  {
    slug: "table", name: "Table", group: "Data display",
    summary: "Styled table parts for when you want full control of the markup.",
    imports: `import { Table, THead, TBody, TR, TH, TD } from "seaglass";`,
    examples: [{ id: "table/basic", title: "Basic" }],
    api: [{ name: "Table", props: [{ name: "density", type: `"compact" | "normal" | "relaxed"`, default: `"normal"`, description: "Row height." }, { name: "stickyHeader", type: "boolean", default: "false", description: "" }] }, { name: "TH · TD", props: [{ name: "align", type: `"left" | "right" | "center"`, description: "" }] }],
  },
  {
    slug: "data-table", name: "Data table", group: "Data display",
    summary: "Sorting, search, selection, bulk actions and pagination, from columns and rows.",
    imports: `import { DataTable, type Column } from "seaglass";`,
    examples: [{ id: "data-table/full", title: "Orders", description: "Select rows to see bulk actions. Click headers to sort." }],
    api: [
      {
        name: "DataTable<T>", props: [
          { name: "data", type: "T[]", required: true, description: "" },
          { name: "columns", type: "Column<T>[]", required: true, description: "" },
          { name: "getRowId", type: "(row: T) => string", required: true, description: "" },
          { name: "pageSize", type: "number", default: "10", description: "0 shows everything." },
          { name: "selectable", type: "boolean", default: "false", description: "Checkboxes and select-all." },
          { name: "selected · onSelectedChange", type: "string[]", description: "Controlled selection." },
          { name: "sort · defaultSort · onSortChange", type: "{ id, dir } | null", description: "" },
          { name: "searchable · searchPlaceholder", type: "boolean · string", description: "Search box in the toolbar." },
          { name: "toolbar", type: "ReactNode", description: "Extra controls in the toolbar." },
          { name: "bulkActions", type: "(ids, clear) => ReactNode", description: "Replaces the toolbar while rows are selected." },
          { name: "onRowClick", type: "(row: T) => void", description: "" },
          { name: "empty", type: "ReactNode", description: "" },
          { name: "density", type: `"compact" | "normal" | "relaxed"`, description: "" },
        ],
      },
      {
        name: "Column<T>", props: [
          { name: "id · header", type: "string · ReactNode", required: true, description: "" },
          { name: "accessor", type: "(row) => string | number | Date | null", description: "Used to sort and search." },
          { name: "cell", type: "(row) => ReactNode", description: "How to draw it. Defaults to the accessor value." },
          { name: "sortable", type: "boolean", description: "" },
          { name: "searchable", type: "boolean", default: "true", description: "Include in the search." },
          { name: "align · width", type: "—", description: "" },
        ],
      },
    ],
    a11y: ["Sortable headers are buttons and set aria-sort.", "Row checkboxes are named after the row."],
  },
  {
    slug: "stat", name: "Stat & Sparkline", group: "Data display",
    summary: "A headline number with its change and a tiny trend line.",
    imports: `import { Stat, Sparkline } from "seaglass";`,
    examples: [{ id: "stat/basic", title: "Stats", description: "The arrow follows the delta's sign; trend says whether that's good (mint) or bad (coral)." }, { id: "stat/sparkline", title: "Sparkline" }],
    api: [
      { name: "Stat", props: [{ name: "label · value", type: "ReactNode", required: true, description: "" }, { name: "delta", type: "ReactNode", description: "e.g. \"+12.5%\"." }, { name: "trend", type: `"up" | "down"`, default: "from delta", description: "Good or bad news." }, { name: "data", type: "number[]", description: "Sparkline values." }, { name: "icon", type: "ReactNode", description: "" }, tone(`"periwinkle"`)] },
      { name: "Sparkline", props: [{ name: "data", type: "number[]", required: true, description: "" }, { name: "width · height", type: "number", default: "96 · 34", description: "" }, { name: "area", type: "boolean", default: "false", description: "Fill under the line." }, { name: "strokeWidth", type: "number", default: "2.4", description: "" }] },
    ],
  },
  {
    slug: "bar-chart", name: "Bar chart", group: "Data display",
    summary: "Every bar is its own small pebble.",
    imports: `import { BarChart } from "seaglass";`,
    examples: [{ id: "bar-chart/basic", title: "Weekly revenue" }],
    api: [{ name: "BarChart", props: [{ name: "data", type: "{ label, value }[]", required: true, description: "" }, { name: "height", type: "number", default: "170", description: "" }, tone(`"amber"`), { name: "highlight", type: `"max" | number`, default: `"max"`, description: "Bar drawn in a deeper tint." }, { name: "format", type: "(v: number) => string", description: "Tooltip and label format." }] }],
    a11y: ["Rendered as a list with each bar's label and value for screen readers."],
  },

  // ───────────────────────── Utilities
  {
    slug: "hooks", name: "Hooks", group: "Utilities",
    summary: "The hooks the components use, exported for your own code.",
    imports: `import { useHotkeys, useControllableState, useMediaQuery, usePersistedState } from "seaglass";`,
    examples: [{ id: "hooks/hotkeys", title: "useHotkeys" }],
    api: [
      {
        name: "useHotkeys(combo, handler, options?)", description: "Combos like \"mod+k\", \"shift+d\", \"[\" or \"?\". mod is ⌘ on Apple and Ctrl elsewhere. Ignored while typing unless enableInInputs.", props: [
          { name: "enableInInputs", type: "boolean", default: "false", description: "Fire inside inputs and contenteditable." },
          { name: "enabled", type: "boolean", default: "true", description: "" },
          { name: "preventDefault", type: "boolean", default: "true", description: "" },
        ],
      },
      { name: "useControllableState({ value, defaultValue, onChange })", description: "Build components that work controlled or uncontrolled. Returns [value, setValue].", props: [] },
      { name: "useMediaQuery(query)", description: "Live boolean for a CSS media query.", props: [] },
      { name: "usePersistedState(key, initial)", description: "useState backed by localStorage. Pass key undefined to keep it in memory.", props: [] },
      { name: "formatHotkey(combo) · matchHotkey(event, combo) · isMac", description: "The parsing and display helpers Kbd and Tooltip use.", props: [] },
    ],
  },
];

export const bySlug = new Map(registry.map((e) => [e.slug, e]));
