import { useState } from "react";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, Button,
} from "seaglass-ui";
import { Columns3 } from "lucide-react";

export default function Checkable() {
  const [columns, setColumns] = useState({ status: true, total: true, notes: false });
  const [sort, setSort] = useState("newest");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button tone="clear" icon={<Columns3 />}>View</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Columns</DropdownMenuLabel>
        {(Object.keys(columns) as Array<keyof typeof columns>).map((key) => (
          <DropdownMenuCheckboxItem
            key={key}
            checked={columns[key]}
            onCheckedChange={(v) => setColumns((c) => ({ ...c, [key]: v === true }))}
            onSelect={(e) => e.preventDefault()}
          >
            {key[0].toUpperCase() + key.slice(1)}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
          <DropdownMenuRadioItem value="newest">Newest first</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="oldest">Oldest first</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="total">Highest total</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
