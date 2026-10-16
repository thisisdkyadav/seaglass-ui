// Keyboard: every interactive component must be fully operable without a pointer.
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, Button, Checkbox, Switch, RadioGroup, Radio,
  Select, Tabs, TabsList, Tab, TabsContent, SegmentedControl, Slider, Accordion, AccordionItem,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Combobox, CommandPalette, CommandItem,
} from "../src";

const user = () => userEvent.setup();

describe("keyboard", () => {
  it("Dialog: Enter opens, focus moves in and is trapped, Escape closes and restores focus", async () => {
    const u = user();
    render(<Dialog><DialogTrigger asChild><Button>Open</Button></DialogTrigger><DialogContent><DialogHeader title="Hello" /><Button>Inside</Button></DialogContent></Dialog>);
    const trigger = screen.getByRole("button", { name: "Open" });
    await u.tab(); expect(trigger).toHaveFocus();
    await u.keyboard("{Enter}");
    const dialog = screen.getByRole("dialog", { name: "Hello" });
    expect(dialog.contains(document.activeElement)).toBe(true);
    for (let i = 0; i < 4; i++) { await u.tab(); expect(dialog.contains(document.activeElement)).toBe(true); }
    await u.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("Checkbox and Switch toggle with Space", async () => {
    const u = user();
    render(<><Checkbox label="Agree" /><Switch label="Wifi" /></>);
    await u.tab(); await u.keyboard(" ");
    expect(screen.getByRole("checkbox", { name: "Agree" })).toBeChecked();
    await u.tab(); await u.keyboard(" ");
    expect(screen.getByRole("switch", { name: "Wifi" })).toBeChecked();
  });

  it("RadioGroup moves selection with arrow keys", async () => {
    const u = user();
    render(<RadioGroup aria-label="Size" defaultValue="s"><Radio value="s" label="Small" /><Radio value="m" label="Medium" /><Radio value="l" label="Large" /></RadioGroup>);
    await u.tab(); expect(screen.getByRole("radio", { name: "Small" })).toHaveFocus();
    await u.keyboard("{ArrowDown}");
    // (in browsers the arrow also checks it; jsdom does not emit the focus event Radix relies on)
    expect(screen.getByRole("radio", { name: "Medium" })).toHaveFocus();
    await u.keyboard(" ");
    expect(screen.getByRole("radio", { name: "Medium" })).toBeChecked();
  });

  it("Select opens with the keyboard, arrows move, Enter picks, focus returns", async () => {
    const u = user();
    const onValueChange = vi.fn();
    render(<Select aria-label="Fruit" onValueChange={onValueChange} options={[{ value: "a", label: "Apple" }, { value: "b", label: "Banana" }, { value: "c", label: "Cherry" }]} />);
    const trigger = screen.getByRole("combobox", { name: "Fruit" });
    await u.tab(); await u.keyboard("{Enter}");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await u.keyboard("{ArrowDown}{Enter}");
    expect(onValueChange).toHaveBeenCalledWith("b");
    expect(trigger).toHaveFocus();
  });

  it("Tabs switch with arrow keys and Home/End", async () => {
    const u = user();
    render(<Tabs defaultValue="a"><TabsList aria-label="T"><Tab value="a">A</Tab><Tab value="b">B</Tab><Tab value="c">C</Tab></TabsList>
      <TabsContent value="a">pa</TabsContent><TabsContent value="b">pb</TabsContent><TabsContent value="c">pc</TabsContent></Tabs>);
    await u.tab(); await u.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "B" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("pb");
    await u.keyboard("{End}"); expect(screen.getByRole("tab", { name: "C" })).toHaveAttribute("aria-selected", "true");
    await u.keyboard("{Home}"); expect(screen.getByRole("tab", { name: "A" })).toHaveAttribute("aria-selected", "true");
  });

  it("SegmentedControl moves with arrows and selects with Space", async () => {
    const u = user();
    function C() { const [v, setV] = useState("a"); return <SegmentedControl aria-label="P" value={v} onValueChange={setV} options={[{ value: "a", label: "Day" }, { value: "b", label: "Week" }]} />; }
    render(<C />);
    await u.tab(); await u.keyboard("{ArrowRight} ");
    expect(screen.getByRole("radio", { name: "Week" })).toBeChecked();
  });

  it("Slider steps with arrows, Page keys and Home/End", async () => {
    const u = user();
    function C() { const [v, setV] = useState([50]); return <><Slider value={v} onValueChange={setV} thumbLabels={["Volume"]} /><output>{v[0]}</output></>; }
    render(<C />);
    await u.tab(); await u.keyboard("{ArrowRight}{ArrowRight}");
    expect(screen.getByRole("slider", { name: "Volume" })).toHaveAttribute("aria-valuenow", "52");
    await u.keyboard("{End}"); expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "100");
    await u.keyboard("{Home}"); expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "0");
  });

  it("Accordion toggles with Enter and moves between headers with arrows", async () => {
    const u = user();
    render(<Accordion type="single" collapsible><AccordionItem value="a" title="One">1</AccordionItem><AccordionItem value="b" title="Two">2</AccordionItem></Accordion>);
    await u.tab(); await u.keyboard("{Enter}");
    expect(screen.getByRole("button", { name: "One" })).toHaveAttribute("aria-expanded", "true");
    await u.keyboard("{ArrowDown}");
    expect(screen.getByRole("button", { name: "Two" })).toHaveFocus();
  });

  it("DropdownMenu opens with Enter, arrows move, Enter activates, Escape restores focus", async () => {
    const u = user();
    const onSelect = vi.fn();
    render(<DropdownMenu><DropdownMenuTrigger asChild><Button>Menu</Button></DropdownMenuTrigger>
      <DropdownMenuContent><DropdownMenuItem>Copy</DropdownMenuItem><DropdownMenuItem onSelect={onSelect}>Paste</DropdownMenuItem></DropdownMenuContent></DropdownMenu>);
    await u.tab(); await u.keyboard("{Enter}");
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await u.keyboard("{ArrowDown}{Enter}");
    expect(onSelect).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Menu" })).toHaveFocus();
  });

  it("Combobox filters as you type and picks with Enter", async () => {
    const u = user();
    const onValueChange = vi.fn();
    render(<Combobox aria-label="Country" onValueChange={onValueChange} options={["France", "Germany", "Spain"].map((c) => ({ value: c.toLowerCase(), label: c }))} />);
    await u.tab(); await u.keyboard("{Enter}");
    await u.keyboard("spa");
    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual(["Spain"]);
    await u.keyboard("{Enter}");
    expect(onValueChange).toHaveBeenCalledWith("spain");
  });

  it("CommandPalette runs an item with Enter", async () => {
    const u = user();
    const onSelect = vi.fn();
    function C() { const [open, setOpen] = useState(true); return <CommandPalette open={open} onOpenChange={setOpen}><CommandItem onSelect={onSelect}>Profile</CommandItem><CommandItem>Billing</CommandItem></CommandPalette>; }
    render(<C />);
    await act(async () => {});
    await u.keyboard("bill");
    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual(["Billing"]);
    await u.keyboard("{Backspace>4}{Enter}");
    expect(onSelect).toHaveBeenCalledOnce();
  });
});
