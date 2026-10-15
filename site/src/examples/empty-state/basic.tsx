import { EmptyState, Button } from "seaglass";
import { Package, Plus } from "lucide-react";

export default function Basic() {
  return (
    <EmptyState
      tone="seafoam"
      icon={<Package />}
      title="No products yet"
      description="Add your first product and it will show up in the catalogue."
      actions={
        <>
          <Button tone="primary" icon={<Plus />}>Add product</Button>
          <Button tone="clear">Import CSV</Button>
        </>
      }
    />
  );
}
