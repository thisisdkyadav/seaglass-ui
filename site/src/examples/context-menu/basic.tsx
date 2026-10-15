import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from "seaglass";
import { RefreshCw, Bookmark, Code } from "lucide-react";

export default function Basic() {
  return (
    <ContextMenu>
      <ContextMenuTrigger
        style={{ display: "grid", placeItems: "center", width: "min(420px, 100%)", height: 150, borderRadius: 22, border: "2px dashed var(--sg-line)", color: "var(--sg-ink-muted)" }}
      >
        Right-click (or long-press) here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem icon={<RefreshCw />} shortcut="mod+r">Reload</ContextMenuItem>
        <ContextMenuItem icon={<Bookmark />} shortcut="mod+d">Bookmark</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem icon={<Code />}>Inspect</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
