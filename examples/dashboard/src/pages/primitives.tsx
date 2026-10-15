import { useState } from "react";
import {
  Pebble, Card, CardHeader, CardFooter, Button, IconButton, ButtonGroup, Badge, Count, Avatar, AvatarGroup, Kbd, Separator,
  Skeleton, Progress, Spinner, EmptyState, Tooltip, type Tone,
} from "seaglass-ui";

const I = (name: string) => <span className="ms">{name}</span>;
const tones: Tone[] = ["clear", "periwinkle", "aqua", "sky", "seafoam", "mint", "lilac", "coral", "rose", "amber", "sand"];

export function Foundations() {
  return (
    <>
      <div className="pg-title"><div><h1>Foundations</h1><p>One material, eleven tints, one fixed light.</p></div></div>
      <section className="pg-section">
        <h2>Tones</h2>
        <div className="pg-swatches">
          {tones.map((t) => <Pebble key={t} tone={t} className="pg-swatch">{t}</Pebble>)}
        </div>
      </section>
      <section className="pg-section">
        <h2>Depth — shadow length scales with size</h2>
        <div className="pg-row">
          {(["lg", "md", "sm", "xs"] as const).map((d, i) => (
            <Pebble key={d} tone="periwinkle" depth={d} radius={["xl", "lg", "md", "sm"][i]} style={{ width: [180, 130, 90, 56][i], height: [110, 80, 56, 40][i], display: "grid", placeItems: "center", fontWeight: 600 }}>{d}</Pebble>
          ))}
        </div>
      </section>
      <section className="pg-section">
        <h2>Interactive pebbles</h2>
        <div className="pg-grid pg-cols-4">
          {(["seafoam", "lilac", "amber", "sky"] as Tone[]).map((t, i) => (
            <Card key={t} tone={t} interactive tabIndex={0} padding="md">
              <CardHeader icon={I(["eco", "auto_awesome", "wb_sunny", "cloud"][i])} title={["Seafoam", "Lilac", "Amber", "Sky"][i]} description="Hover lifts · press sinks" />
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}

export function Buttons() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(42);
  return (
    <>
      <div className="pg-title"><div><h1>Buttons &amp; badges</h1><p>Primitives: buttons, icon buttons, badges, avatars, keys, progress.</p></div></div>
      <div className="pg-grid pg-cols-2">
        <Card>
          <CardHeader title="Button" description="pebble · soft · ghost · link, in any tone and three sizes" />
          <div className="pg-stack">
            <ButtonGroup>
              <Button tone="primary" icon={I("add")}>Create</Button>
              <Button tone="clear">Cancel</Button>
              <Button tone="mint" iconEnd={I("arrow_forward")}>Continue</Button>
              <Button tone="danger" icon={I("delete")}>Delete</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="soft" tone="periwinkle">Soft</Button>
              <Button variant="ghost" tone="clear">Ghost</Button>
              <Button variant="link" tone="periwinkle">Link button</Button>
              <Button disabled>Disabled</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button size="sm" tone="aqua">Small</Button>
              <Button tone="aqua">Medium</Button>
              <Button size="lg" tone="aqua">Large</Button>
              <Button tone="lilac" loading={loading} onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1600); }}>Save changes</Button>
            </ButtonGroup>
          </div>
        </Card>
        <Card>
          <CardHeader title="Icon button" description="Circle or square; always labelled" />
          <ButtonGroup>
            {(["clear", "periwinkle", "seafoam", "coral", "amber"] as Tone[]).map((t, i) => (
              <Tooltip key={t} content={["Edit", "Share", "Bookmark", "Like", "Star"][i]} shortcut={["e", "mod+s", "b", "l", "s"][i]}>
                <IconButton aria-label={["Edit", "Share", "Bookmark", "Like", "Star"][i]} tone={t} shape={i % 2 ? "square" : "circle"}>{I(["edit", "share", "bookmark", "favorite", "star"][i])}</IconButton>
              </Tooltip>
            ))}
            <IconButton aria-label="More" variant="ghost" tone="clear" shape="circle">{I("more_horiz")}</IconButton>
          </ButtonGroup>
          <Separator label="Keys" />
          <div className="pg-row">
            <Kbd keys="mod+k" /> <Kbd keys="shift+d" /> <Kbd keys="[" /> <Kbd keys="mod+shift+p" /> <Kbd>Esc</Kbd>
          </div>
        </Card>
        <Card>
          <CardHeader title="Badge & count" />
          <div className="pg-row">
            <Badge tone="mint" dot>Paid</Badge>
            <Badge tone="amber" dot>Pending</Badge>
            <Badge tone="coral">Failed</Badge>
            <Badge tone="lilac" variant="pebble">Pebble</Badge>
            <Badge tone="periwinkle" variant="outline">Outline</Badge>
            <Badge tone="periwinkle" variant="solid">Solid</Badge>
            <Badge size="sm">Small</Badge>
            <Count tone="rose" value={12} />
            <Count tone="periwinkle" value={4} />
            <Count tone="clear" value={240} />
          </div>
        </Card>
        <Card>
          <CardHeader title="Avatar" />
          <div className="pg-row">
            <Avatar name="Ava Thompson" size="xl" status="online" />
            <Avatar name="Leo Martins" size="lg" status="away" />
            <Avatar name="Mia Chen" status="busy" />
            <Avatar name="Noah Patel" size="sm" shape="square" />
            <Avatar name="Isla Romero" size="xs" />
            <AvatarGroup max={4}>
              {["Kai Nakamura", "Zara Okafor", "Ethan Brooks", "Maya Singh", "Oscar Lindqvist", "Lena Fischer"].map((n) => <Avatar key={n} name={n} />)}
            </AvatarGroup>
          </div>
        </Card>
        <Card>
          <CardHeader title="Progress, spinner, skeleton" />
          <div className="pg-stack">
            <Progress value={progress} tone="periwinkle" label="Uploading assets" showValue />
            <Progress value={null} tone="aqua" size="sm" label="Syncing" />
            <div className="pg-row">
              <Button size="sm" variant="soft" tone="clear" onClick={() => setProgress((p) => Math.max(0, p - 10))}>−10</Button>
              <Button size="sm" variant="soft" tone="clear" onClick={() => setProgress((p) => Math.min(100, p + 10))}>+10</Button>
              <Spinner /> <Spinner size={28} />
            </div>
            <div className="pg-row" style={{ alignItems: "flex-start" }}>
              <Skeleton shape="circle" width={44} />
              <div style={{ flex: 1, display: "grid", gap: 8 }}><Skeleton shape="text" width="60%" /><Skeleton shape="text" /><Skeleton shape="text" width="80%" /></div>
            </div>
          </div>
        </Card>
        <Card>
          <EmptyState tone="seafoam" icon={I("inventory_2")} title="No products yet" description="Add your first product and it will show up in the catalogue."
            actions={<><Button tone="primary" icon={I("add")}>Add product</Button><Button tone="clear">Import CSV</Button></>} />
          <CardFooter><span className="pg-muted">EmptyState inside a Card</span></CardFooter>
        </Card>
      </div>
    </>
  );
}
