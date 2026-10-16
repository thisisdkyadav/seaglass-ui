# Alert

An inline message about the page or a section: info, success, warning or an error.

```tsx
import { Alert } from "seaglass-ui";
```

## Alert props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tone` | `Tone` | `"info"` | Sea-glass tint. Semantic names map onto tints. |
| `variant` | `"soft" \| "pebble"` | `"soft"` |  |
| `title` | `ReactNode` |  |  |
| `children` | `ReactNode` |  | The message. |
| `icon` | `ReactNode \| false` |  | Replaces the tone's icon. false hides it. |
| `actions` | `ReactNode` |  | Buttons under the message. |
| `onDismiss` | `() => void` |  | Shows a close button. |
| `dismissLabel` | `string` | `"Dismiss"` |  |
| `...props` | `HTMLAttributes<HTMLDivElement>` |  | Everything else is passed to the underlying element. |

## Accessibility

- Static by default, so it is not announced on page load.
- When you insert an alert in response to something the user did, add role="alert" (urgent) or role="status" (polite) so screen readers announce it. For short-lived messages, use toast instead.

## Examples

### Tones

Each tone picks a matching icon.

```tsx
import { Alert } from "seaglass-ui";

export default function Tones() {
  return (
    <div style={{ display: "grid", gap: 12, width: "min(560px, 100%)" }}>
      <Alert title="A new version is available">Reload to get the latest features.</Alert>
      <Alert tone="success" title="Payment received">Invoice #1043 was paid on 14 October.</Alert>
      <Alert tone="warning" title="Your trial ends in 3 days">Add a payment method to keep your projects.</Alert>
      <Alert tone="danger" title="Couldn't save changes">The server didn't respond. Your edits are kept locally.</Alert>
    </div>
  );
}
```

Rendered HTML:

```html
<div style="display:grid;gap:12px;width:min(560px, 100%)">
<div data-tone="info" data-variant="soft" class="sg-alert">
<span class="sg-alert-icon" aria-hidden="true">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<circle cx="12" cy="12" r="8.5">
</circle>
<path d="M12 11v5.5M12 7.8v.1">
</path>
</svg>
</span>
<div class="sg-alert-body">
<p class="sg-alert-title">A new version is available</p>
<div class="sg-alert-description">Reload to get the latest features.</div>
</div>
</div>
<div data-tone="success" data-variant="soft" class="sg-alert">
<span class="sg-alert-icon" aria-hidden="true">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<circle cx="12" cy="12" r="8.5">
</circle>
<path d="M8 12.3l2.8 2.8L16.2 9.6">
</path>
</svg>
</span>
<div class="sg-alert-body">
<p class="sg-alert-title">Payment received</p>
<div class="sg-alert-description">Invoice #1043 was paid on 14 October.</div>
</div>
</div>
<div data-tone="warning" data-variant="soft" class="sg-alert">
<span class="sg-alert-icon" aria-hidden="true">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M12 4l9 15.5H3L12 4z">
</path>
<path d="M12 10v4.5M12 17.2v.1">
</path>
</svg>
</span>
<div class="sg-alert-body">
<p class="sg-alert-title">Your trial ends in 3 days</p>
<div class="sg-alert-description">Add a payment method to keep your projects.</div>
</div>
</div>
<div data-tone="danger" data-variant="soft" class="sg-alert">
<span class="sg-alert-icon" aria-hidden="true">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M12 4l9 15.5H3L12 4z">
</path>
<path d="M12 10v4.5M12 17.2v.1">
</path>
</svg>
</span>
<div class="sg-alert-body">
<p class="sg-alert-title">Couldn&#x27;t save changes</p>
<div class="sg-alert-description">The server didn&#x27;t respond. Your edits are kept locally.</div>
</div>
</div>
</div>
```

### Actions and dismiss

A raised pebble with buttons and a close button.

```tsx
import { useState } from "react";
import { Alert, Button } from "seaglass-ui";

export default function Actions() {
  const [open, setOpen] = useState(true);
  if (!open) return <Button onClick={() => setOpen(true)}>Show the alert again</Button>;
  return (
    <Alert
      tone="lilac"
      variant="pebble"
      title="Invite your team"
      onDismiss={() => setOpen(false)}
      actions={<><Button size="sm" tone="lilac">Send invites</Button><Button size="sm" variant="ghost">Later</Button></>}
      style={{ width: "min(560px, 100%)" }}
    >
      Projects are more fun together. Invite up to 5 people for free.
    </Alert>
  );
}
```

Rendered HTML:

```html
<div data-tone="lilac" data-variant="pebble" data-depth="sm" class="sg-alert sg-pebble" style="width:min(560px, 100%)">
<span class="sg-alert-icon" aria-hidden="true">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<circle cx="12" cy="12" r="8.5">
</circle>
<path d="M12 11v5.5M12 7.8v.1">
</path>
</svg>
</span>
<div class="sg-alert-body">
<p class="sg-alert-title">Invite your team</p>
<div class="sg-alert-description">Projects are more fun together. Invite up to 5 people for free.</div>
<div class="sg-alert-actions">
<button type="button" data-tone="lilac" data-depth="sm" data-interactive="" data-variant="pebble" data-size="sm" class="sg-button sg-pebble">
<span class="sg-button-label">Send invites</span>
</button>
<button type="button" data-tone="clear" data-variant="ghost" data-size="sm" class="sg-button">
<span class="sg-button-label">Later</span>
</button>
</div>
</div>
<button type="button" class="sg-alert-close" aria-label="Dismiss">
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M6.5 6.5l11 11M17.5 6.5l-11 11">
</path>
</svg>
</button>
</div>
```
