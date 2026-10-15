import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, Button,
} from "seaglass";
import { ChevronDown, Copy, ClipboardPaste, PenLine, Share, Link, Mail, Trash2 } from "lucide-react";

export default function Basic() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button tone="clear" iconEnd={<ChevronDown />}>Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem icon={<Copy />} shortcut="mod+c">Copy</DropdownMenuItem>
        <DropdownMenuItem icon={<ClipboardPaste />} shortcut="mod+v">Paste</DropdownMenuItem>
        <DropdownMenuItem icon={<PenLine />} description="Rename the selected file" shortcut="F2">Rename</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger icon={<Share />}>Share</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem icon={<Link />}>Copy link</DropdownMenuItem>
            <DropdownMenuItem icon={<Mail />}>Email</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<Trash2 />} tone="danger" shortcut="mod+backspace">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
