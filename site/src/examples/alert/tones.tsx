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
