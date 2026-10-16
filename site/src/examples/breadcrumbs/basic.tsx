import { Breadcrumbs } from "seaglass-ui";

export default function Basic() {
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <Breadcrumbs items={[{ label: "Settings", href: "#" }, { label: "Billing" }]} />
      <Breadcrumbs
        aria-label="Product location"
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
