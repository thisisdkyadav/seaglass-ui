import { useState } from "react";
import { CommandPalette, CommandGroup, CommandItem, Button, Kbd, toast } from "seaglass-ui";
import { FileText, Moon, UserPlus, Terminal } from "lucide-react";

// CommandPalette opens with mod+k by default. This demo sets hotkey={false}
// because the docs site already uses mod+k for its own search.
export default function Palette() {
  const [open, setOpen] = useState(false);
  const run = (label: string) => { setOpen(false); toast(label); };
  return (
    <>
      <Button tone="clear" icon={<Terminal />} onClick={() => setOpen(true)}>
        Open palette <Kbd keys="mod+k" />
      </Button>
      <CommandPalette open={open} onOpenChange={setOpen} hotkey={false}>
        <CommandGroup heading="Pages">
          <CommandItem icon={<FileText />} onSelect={() => run("Opened Introduction")}>Introduction</CommandItem>
          <CommandItem icon={<FileText />} onSelect={() => run("Opened Theming")}>Theming</CommandItem>
        </CommandGroup>
        <CommandGroup heading="Actions">
          <CommandItem icon={<Moon />} shortcut="shift+d" onSelect={() => run("Toggled theme")}>Toggle dark mode</CommandItem>
          <CommandItem icon={<UserPlus />} description="Send an invite by email" onSelect={() => run("Invite sent")}>Invite teammate</CommandItem>
        </CommandGroup>
      </CommandPalette>
    </>
  );
}
