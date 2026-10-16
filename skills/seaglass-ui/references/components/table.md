# Table

Styled table parts for when you want full control of the markup.

```tsx
import { Table, THead, TBody, TR, TH, TD } from "seaglass-ui";
```

## Table props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `density` | `"compact" \| "normal" \| "relaxed"` | `"normal"` | Row height. |
| `stickyHeader` | `boolean` | `false` |  |

## TH · TD props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `"left" \| "right" \| "center"` |  |  |

## Examples

### Basic

```tsx
import { Table, TR, TH, TD, Badge } from "seaglass-ui";

const invoices = [
  { id: "INV-001", status: "Paid", method: "Card", amount: 250 },
  { id: "INV-002", status: "Pending", method: "Bank transfer", amount: 150 },
  { id: "INV-003", status: "Paid", method: "Card", amount: 350 },
  { id: "INV-004", status: "Failed", method: "Card", amount: 450 },
];
const tone = { Paid: "mint", Pending: "amber", Failed: "coral" } as const;

export default function Basic() {
  return (
    <div style={{ width: "100%" }}>
      <Table>
        <thead>
          <TR><TH>Invoice</TH><TH>Status</TH><TH>Method</TH><TH align="right">Amount</TH></TR>
        </thead>
        <tbody>
          {invoices.map((i) => (
            <TR key={i.id}>
              <TD><b>{i.id}</b></TD>
              <TD><Badge size="sm" dot tone={tone[i.status as keyof typeof tone]}>{i.status}</Badge></TD>
              <TD>{i.method}</TD>
              <TD align="right">${i.amount.toFixed(2)}</TD>
            </TR>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
```

Rendered HTML:

```html
<div style="width:100%">
<div class="sg-table-wrap">
<table data-density="normal" class="sg-table">
<thead>
<tr>
<th>Invoice</th>
<th>Status</th>
<th>Method</th>
<th data-align="right">Amount</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<b>INV-001</b>
</td>
<td>
<span data-tone="mint" data-variant="soft" data-size="sm" class="sg-badge">
<span class="sg-badge-dot" aria-hidden="true">
</span>Paid</span>
</td>
<td>Card</td>
<td data-align="right">$250.00</td>
</tr>
<tr>
<td>
<b>INV-002</b>
</td>
<td>
<span data-tone="amber" data-variant="soft" data-size="sm" class="sg-badge">
<span class="sg-badge-dot" aria-hidden="true">
</span>Pending</span>
</td>
<td>Bank transfer</td>
<td data-align="right">$150.00</td>
</tr>
<tr>
<td>
<b>INV-003</b>
</td>
<td>
<span data-tone="mint" data-variant="soft" data-size="sm" class="sg-badge">
<span class="sg-badge-dot" aria-hidden="true">
</span>Paid</span>
</td>
<td>Card</td>
<td data-align="right">$350.00</td>
</tr>
<tr>
<td>
<b>INV-004</b>
</td>
<td>
<span data-tone="coral" data-variant="soft" data-size="sm" class="sg-badge">
<span class="sg-badge-dot" aria-hidden="true">
</span>Failed</span>
</td>
<td>Card</td>
<td data-align="right">$450.00</td>
</tr>
</tbody>
</table>
</div>
</div>
```
