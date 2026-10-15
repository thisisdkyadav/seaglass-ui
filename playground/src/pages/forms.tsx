import { useState } from "react";
import {
  Card, CardHeader, CardFooter, Field, Input, Textarea, Select, Combobox, DatePicker, DateRangePicker, Checkbox, RadioGroup, Radio,
  Switch, Slider, SegmentedControl, Button, toast,
} from "seaglass-ui";
import { countries } from "../data";

const I = (name: string) => <span className="ms">{name}</span>;

export function Forms() {
  const [email, setEmail] = useState("ava@tidepool");
  const [tags, setTags] = useState(["design", "launch"]);
  const [tagOptions, setTagOptions] = useState(["design", "launch", "marketing", "research", "urgent", "q4"].map((t) => ({ value: t, label: t })));
  const [price, setPrice] = useState([20, 80]);
  const emailError = email && !/^\S+@\S+\.\S+$/.test(email) ? "Enter a full email address, like ava@tidepool.co" : undefined;

  return (
    <>
      <div className="pg-title"><div><h1>Forms</h1><p>Fields wire up labels, descriptions and errors for you. Inputs are sunk into the page.</p></div></div>
      <div className="pg-grid pg-cols-2">
        <Card>
          <CardHeader title="Text inputs" />
          <div className="pg-stack">
            <Field label="Full name" required><Input placeholder="Ava Thompson" leading={I("person")} /></Field>
            <Field label="Email" description="We'll send receipts here." error={emailError}>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} leading={I("mail")} />
            </Field>
            <Field label="Store URL"><Input defaultValue="tidepool" leading={<span className="pg-muted">https://</span>} trailing={<span className="pg-muted">.shop</span>} /></Field>
            <Field label="Bio" description="Grows as you type."><Textarea autoResize placeholder="A few words about you…" /></Field>
            <Field label="Disabled" disabled><Input value="Read only value" readOnly /></Field>
          </div>
        </Card>
        <Card>
          <CardHeader title="Pickers" />
          <div className="pg-stack">
            <Field label="Plan">
              <Select placeholder="Choose a plan" defaultValue="pro" options={[
                { label: "Monthly", options: [{ value: "starter", label: "Starter", description: "$9 / month" }, { value: "pro", label: "Pro", description: "$29 / month" }] },
                { label: "Yearly", options: [{ value: "team", label: "Team", description: "$290 / year" }, { value: "ent", label: "Enterprise", disabled: true }] },
              ]} />
            </Field>
            <Field label="Country" description="Type to filter — grouped, keyboard friendly.">
              <Combobox options={countries} placeholder="Select a country" defaultValue="portugal" />
            </Field>
            <Field label="Tags" description="Multi-select; type a new one to create it.">
              <Combobox multiple options={tagOptions} value={tags} onValueChange={setTags}
                onCreate={(q) => { setTagOptions((o) => [...o, { value: q, label: q }]); setTags((t) => [...t, q]); }} />
            </Field>
            <div className="pg-grid pg-cols-2" style={{ gap: 18 }}>
              <Field label="Ship date"><DatePicker placeholder="Pick a date" /></Field>
              <Field label="Campaign"><DateRangePicker /></Field>
            </div>
          </div>
        </Card>
        <Card>
          <CardHeader title="Choices" />
          <div className="pg-stack">
            <Checkbox label="Email me about new orders" description="At most one email per hour." defaultChecked />
            <Checkbox label="Weekly summary" tone="periwinkle" />
            <Checkbox label="Indeterminate" checked="indeterminate" tone="amber" />
            <RadioGroup defaultValue="card" aria-label="Payment method">
              <Radio value="card" label="Card" description="Visa, Mastercard, Amex" />
              <Radio value="bank" label="Bank transfer" />
              <Radio value="crypto" label="Crypto" disabled />
            </RadioGroup>
            <Switch label="Vacation mode" description="Pause all orders while you're away." />
            <Switch label="Two-factor auth" defaultChecked tone="periwinkle" />
          </div>
        </Card>
        <Card>
          <CardHeader title="Ranges & segments" />
          <div className="pg-stack">
            <Field label={`Price range · $${price[0]} – $${price[1]}`}>
              <Slider value={price} onValueChange={setPrice} min={0} max={200} step={5} thumbLabels={["Minimum price", "Maximum price"]} />
            </Field>
            <Field label="Volume"><Slider defaultValue={[60]} tone="lilac" thumbLabels={["Volume"]} /></Field>
            <Field label="View">
              <SegmentedControl aria-label="View" defaultValue="grid" tone="periwinkle" options={[
                { value: "grid", label: "Grid", icon: I("grid_view") }, { value: "list", label: "List", icon: I("view_list") }, { value: "map", label: "Map", icon: I("map") },
              ]} />
            </Field>
            <Field label="Density">
              <SegmentedControl aria-label="Density" variant="joined" defaultValue="normal" options={[{ value: "compact", label: "Compact" }, { value: "normal", label: "Normal" }, { value: "relaxed", label: "Relaxed" }]} />
            </Field>
          </div>
          <CardFooter>
            <Button tone="clear">Reset</Button>
            <Button tone="primary" onClick={() => toast.success("Saved", { description: "Your preferences are up to date." })}>Save</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
