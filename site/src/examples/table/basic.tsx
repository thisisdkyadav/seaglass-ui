import { Table, TR, TH, TD, Badge } from "seaglass";

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
