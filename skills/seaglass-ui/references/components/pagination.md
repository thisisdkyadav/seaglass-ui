# Pagination

Move through pages of results.

```tsx
import { Pagination } from "seaglass-ui";
```

## Pagination props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `page` (required) | `number` |  | 1-based. |
| `pageCount` (required) | `number` |  |  |
| `onPageChange` (required) | `(page: number) => void` |  |  |
| `siblings` | `number` | `1` | Pages either side of the current one. |
| `aria-label` | `string` | `"Pagination"` | Name for the nav landmark. |

## Examples

### Basic

```tsx
import { useState } from "react";
import { Pagination } from "seaglass-ui";

export default function Basic() {
  const [page, setPage] = useState(4);
  return <Pagination page={page} pageCount={12} onPageChange={setPage} />;
}
```

Rendered HTML:

```html
<nav aria-label="Pagination" class="sg-pagination">
<button type="button" class="sg-page" aria-label="Previous page">
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M14.5 6l-6 6 6 6">
</path>
</svg>
</button>
<button type="button" class="sg-page">1</button>
<span class="sg-page-ellipsis">…</span>
<button type="button" class="sg-page">3</button>
<button type="button" class="sg-page sg-chip-surface" aria-current="page">4</button>
<button type="button" class="sg-page">5</button>
<span class="sg-page-ellipsis">…</span>
<button type="button" class="sg-page">12</button>
<button type="button" class="sg-page" aria-label="Next page">
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M9.5 6l6 6-6 6">
</path>
</svg>
</button>
</nav>
```
