import { Breadcrumbs } from "seaglass";

export default function Basic() {
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <Breadcrumbs items={[{ label: "Settings", href: "#" }, { label: "Billing" }]} />
      <Breadcrumbs
        maxItems={4}
        items={[
          { label: "Home", href: "#" },
          { label: "Catalogue", href: "#" },
          { label: "Kitchen", href: "#" },
          { label: "Mugs", href: "#" },
          { label: "Sea glass mug" },
        ]}
      />
    </div>
  );
}
