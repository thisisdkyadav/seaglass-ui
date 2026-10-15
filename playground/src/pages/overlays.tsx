import { useState } from "react";
import {
  Card, CardHeader, Button, ButtonGroup, Dialog, DialogTrigger, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogClose,
  Sheet, SheetTrigger, SheetContent, AlertDialog, Popover, PopoverTrigger, PopoverContent, HoverCard, HoverCardTrigger, HoverCardContent,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator,
  Tooltip, Field, Input, Switch, Avatar, Kbd, toast, CommandPalette, CommandGroup, CommandItem,
} from "seaglass-ui";

const I = (name: string) => <span className="ms">{name}</span>;

export function Overlays() {
  const [cols, setCols] = useState({ status: true, total: true, notes: false });
  const [sort, setSort] = useState("newest");
  const [palette, setPalette] = useState(false);
  return (
    <>
      <div className="pg-title"><div><h1>Overlays</h1><p>Radix behaviour — focus trapping, Esc, outside click, typeahead — in sea glass.</p></div></div>
      <div className="pg-grid pg-cols-2">
        <Card>
          <CardHeader title="Dialog & sheet" />
          <ButtonGroup>
            <Dialog>
              <DialogTrigger asChild><Button tone="primary" icon={I("edit")}>Edit profile</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader title="Edit profile" description="Changes show up on your public page." />
                <DialogBody>
                  <Field label="Name"><Input defaultValue="Ava Thompson" /></Field>
                  <Field label="Handle"><Input defaultValue="ava" leading="@" /></Field>
                  <Switch label="Show email publicly" />
                </DialogBody>
                <DialogFooter>
                  <DialogClose asChild><Button tone="clear">Cancel</Button></DialogClose>
                  <DialogClose asChild><Button tone="primary" onClick={() => toast.success("Profile saved")}>Save</Button></DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Sheet>
              <SheetTrigger asChild><Button tone="clear" icon={I("tune")}>Filters</Button></SheetTrigger>
              <SheetContent side="right">
                <DialogHeader title="Filters" description="Narrow down the orders list." />
                <DialogBody>
                  <Field label="Customer"><Input placeholder="Name or email" /></Field>
                  <Switch label="Only unpaid" />
                  <Switch label="Include archived" />
                </DialogBody>
              </SheetContent>
            </Sheet>
            <AlertDialog
              trigger={<Button tone="danger" icon={I("delete")}>Delete project</Button>}
              tone="danger"
              icon={I("warning")}
              title="Delete “Q4 launch”?"
              description="This removes the project, its 24 tasks and all files. It can't be undone."
              confirmLabel="Delete project"
              onConfirm={() => { toast.error("Project deleted"); }}
            />
          </ButtonGroup>
        </Card>

        <Card>
          <CardHeader title="Menus" description="Icons, shortcuts, checkbox and radio items, nested sub-menus. Right-click the box." />
          <ButtonGroup>
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button tone="clear" iconEnd={I("expand_more")}>Actions</Button></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem icon={I("content_copy")} shortcut="mod+c">Copy</DropdownMenuItem>
                <DropdownMenuItem icon={I("content_paste")} shortcut="mod+v">Paste</DropdownMenuItem>
                <DropdownMenuItem icon={I("drive_file_rename_outline")} description="Rename the selected file" shortcut="F2">Rename</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger icon={I("ios_share")}>Share</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem icon={I("link")}>Copy link</DropdownMenuItem>
                    <DropdownMenuItem icon={I("mail")}>Email</DropdownMenuItem>
                    <DropdownMenuItem icon={I("forum")}>Slack</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem icon={I("delete")} tone="danger" shortcut="mod+backspace">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button tone="clear" icon={I("view_column")}>View</Button></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Columns</DropdownMenuLabel>
                {(Object.keys(cols) as Array<keyof typeof cols>).map((k) => (
                  <DropdownMenuCheckboxItem key={k} checked={cols[k]} onCheckedChange={(v) => setCols((c) => ({ ...c, [k]: !!v }))} onSelect={(e) => e.preventDefault()}>
                    {k[0].toUpperCase() + k.slice(1)}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Sort</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                  <DropdownMenuRadioItem value="newest">Newest first</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="oldest">Oldest first</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="total">Highest total</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
          <ContextMenu>
            <ContextMenuTrigger className="pg-context">Right-click anywhere in here</ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem icon={I("refresh")} shortcut="mod+r">Reload</ContextMenuItem>
              <ContextMenuItem icon={I("bookmark")} shortcut="mod+d">Bookmark</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem icon={I("code")}>Inspect</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Card>

        <Card>
          <CardHeader title="Popover, hover card, tooltip" />
          <ButtonGroup>
            <Popover>
              <PopoverTrigger asChild><Button tone="aqua" icon={I("share")}>Share</Button></PopoverTrigger>
              <PopoverContent>
                <div className="pg-stack" style={{ width: 300 }}>
                  <b>Share this report</b>
                  <Field label="Invite by email"><Input placeholder="name@company.com" size="sm" /></Field>
                  <Button size="sm" tone="primary" fullWidth>Send invite</Button>
                </div>
              </PopoverContent>
            </Popover>
            <HoverCard>
              <HoverCardTrigger asChild><Button variant="link" tone="periwinkle">@mia.chen</Button></HoverCardTrigger>
              <HoverCardContent>
                <div className="pg-cell" style={{ width: 260 }}>
                  <Avatar name="Mia Chen" size="lg" status="online" />
                  <span><b>Mia Chen</b><small>Product designer · Lisbon</small></span>
                </div>
              </HoverCardContent>
            </HoverCard>
            <Tooltip content="Archive" shortcut="e"><Button tone="clear" icon={I("archive")}>Hover me</Button></Tooltip>
          </ButtonGroup>
        </Card>

        <Card>
          <CardHeader title="Toasts & command palette" description={<>Toasts stack bottom-right; <Kbd>F8</Kbd> focuses them.</>} />
          <ButtonGroup>
            <Button variant="soft" tone="mint" onClick={() => toast.success("Order shipped", { description: "#10482 is on its way." })}>Success</Button>
            <Button variant="soft" tone="coral" onClick={() => toast.error("Payment failed", { description: "The card was declined.", action: { label: "Retry", onClick: () => toast("Retrying…") } })}>Error</Button>
            <Button variant="soft" tone="amber" onClick={() => toast.warning("Low stock", { description: "Only 3 left of “Sea glass mug”." })}>Warning</Button>
            <Button variant="soft" tone="periwinkle" onClick={() => {
              const id = toast.loading("Exporting orders…");
              setTimeout(() => toast.update(id, { kind: "success", title: "Export ready", description: "orders.csv · 48 rows" }), 1800);
            }}>Loading → done</Button>
          </ButtonGroup>
          <Button tone="clear" icon={I("terminal")} onClick={() => setPalette(true)}>Open a palette <Kbd keys="mod+k" /></Button>
          <CommandPalette open={palette} onOpenChange={setPalette} hotkey={false}>
            <CommandGroup heading="Suggestions">
              <CommandItem icon={I("calendar_month")} onSelect={() => setPalette(false)}>Calendar</CommandItem>
              <CommandItem icon={I("mood")} onSelect={() => setPalette(false)}>Search emoji</CommandItem>
              <CommandItem icon={I("calculate")} shortcut="mod+=" onSelect={() => setPalette(false)}>Calculator</CommandItem>
            </CommandGroup>
          </CommandPalette>
        </Card>
      </div>
    </>
  );
}
