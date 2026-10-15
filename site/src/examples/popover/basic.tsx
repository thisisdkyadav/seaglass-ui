import { Popover, PopoverTrigger, PopoverContent, Button, Field, Input } from "seaglass-ui";
import { Share2 } from "lucide-react";

export default function Basic() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button tone="aqua" icon={<Share2 />}>Share</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div style={{ display: "grid", gap: 14, width: 280 }}>
          <b>Share this report</b>
          <Field label="Invite by email">
            <Input size="sm" placeholder="name@company.com" />
          </Field>
          <Button size="sm" tone="primary" fullWidth>Send invite</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
