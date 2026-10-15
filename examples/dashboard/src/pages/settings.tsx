import {
  Card, CardHeader, CardFooter, Tabs, TabsList, Tab, TabsContent, Field, Input, Select, Switch, Button, Avatar, Badge, Progress, Separator, toast,
} from "seaglass-ui";
import { team } from "../data";

const I = (name: string) => <span className="ms">{name}</span>;

export function Settings() {
  return (
    <>
      <div className="pg-title"><div><h1>Settings</h1><p>Manage your workspace.</p></div></div>
      <Tabs defaultValue="general">
        <TabsList>
          <Tab value="general" icon={I("tune")}>General</Tab>
          <Tab value="team" icon={I("group")} count={team.length}>Team</Tab>
          <Tab value="billing" icon={I("credit_card")}>Billing</Tab>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader title="Workspace" description="Shown on invoices and emails." />
            <div className="pg-grid pg-cols-2" style={{ gap: 18 }}>
              <Field label="Name"><Input defaultValue="Tidepool" /></Field>
              <Field label="Currency"><Select defaultValue="usd" options={[{ value: "usd", label: "US dollar" }, { value: "eur", label: "Euro" }, { value: "gbp", label: "Pound sterling" }]} /></Field>
            </div>
            <Separator />
            <Switch label="Order notifications" description="Email me when an order is placed." defaultChecked />
            <Switch label="Low stock alerts" description="Warn when a product drops below 5 units." />
            <CardFooter><Button tone="primary" onClick={() => toast.success("Settings saved")}>Save changes</Button></CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="team">
          <Card>
            <CardHeader title="Members" actions={<Button size="sm" tone="primary" icon={I("person_add")}>Invite</Button>} />
            <ul className="pg-feed">
              {team.map((t) => (
                <li key={t.name} style={{ alignItems: "center" }}>
                  <Avatar name={t.name} status={t.status} />
                  <div style={{ flex: 1 }}><p><b>{t.name}</b></p><small>{t.name.split(" ")[0].toLowerCase()}@tidepool.co</small></div>
                  <Badge tone={t.role === "Owner" ? "periwinkle" : "clear"}>{t.role}</Badge>
                </li>
              ))}
            </ul>
          </Card>
        </TabsContent>
        <TabsContent value="billing">
          <Card tone="periwinkle">
            <CardHeader title="Pro plan" description="$29 / month · renews 1 Nov 2026" actions={<Button tone="clear" size="sm">Change plan</Button>} />
            <Progress value={7} max={10} tone="periwinkle" label="Seats" showValue formatValue={(v, m) => `${v} of ${m}`} />
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
