import { useState } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent, Button } from "seaglass-ui";
import { ChevronDown } from "lucide-react";

export default function CollapsibleExample() {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen} style={{ width: "min(420px, 100%)" }}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" tone="clear" iconEnd={<ChevronDown style={{ rotate: open ? "180deg" : "0deg", transition: "rotate .3s" }} />}>
          Advanced options
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p style={{ margin: "12px 0 0", color: "var(--sg-ink-muted)" }}>
          Collapsible animates its height using the measured size of its content.
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
}
