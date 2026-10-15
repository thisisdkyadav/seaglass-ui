import { SegmentedControl } from "seaglass-ui";
import { LayoutGrid, List, Map } from "lucide-react";

export default function Separate() {
  return (
    <SegmentedControl
      aria-label="View"
      defaultValue="grid"
      tone="periwinkle"
      options={[
        { value: "grid", label: "Grid", icon: <LayoutGrid size={18} /> },
        { value: "list", label: "List", icon: <List size={18} /> },
        { value: "map", label: "Map", icon: <Map size={18} /> },
      ]}
    />
  );
}
