import { useState } from "react";
import { Field, Input } from "seaglass";
import { Mail } from "lucide-react";

// Field wires the label, description and error to its control (ids, aria-describedby, aria-invalid).
export default function Basic() {
  const [email, setEmail] = useState("ava@tidepool");
  const error = email && !/^\S+@\S+\.\S+$/.test(email) ? "Enter a full email address, like ava@tidepool.co" : undefined;
  return (
    <div style={{ width: "min(400px, 100%)" }}>
      <Field label="Email" description="We'll send receipts here." error={error} required>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} leading={<Mail size={18} />} />
      </Field>
    </div>
  );
}
