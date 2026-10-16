// Behaviour of Alert, Toggle, ToggleGroup, NumberInput, ScrollArea, typography and layout.
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import {
  Alert, Toggle, ToggleGroup, ToggleGroupItem, NumberInput, Field, ScrollArea, Text, Heading, Link, Stack, Grid,
  ThemeProvider, Calendar, DirectionProvider, useDirection, Tooltip, Button,
} from "../src";

describe("Alert", () => {
  it("renders title, message and tone icon; dismiss calls back", async () => {
    const onDismiss = vi.fn();
    const { container } = render(<Alert tone="danger" title="Failed" onDismiss={onDismiss}>Try again</Alert>);
    expect(screen.getByText("Failed")).toBeInTheDocument();
    expect(screen.getByText("Try again")).toBeInTheDocument();
    expect(container.querySelector(".sg-alert-icon svg")).not.toBeNull();
    expect(container.firstElementChild).not.toHaveAttribute("role");
    await userEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });
  it("icon={false} hides the icon and role passes through", () => {
    const { container } = render(<Alert icon={false} role="status">Saved</Alert>);
    expect(container.querySelector(".sg-alert-icon")).toBeNull();
    expect(screen.getByRole("status")).toHaveTextContent("Saved");
  });
});

describe("Toggle", () => {
  it("toggles aria-pressed with click and Space", async () => {
    const u = userEvent.setup();
    render(<Toggle>Pin</Toggle>);
    const t = screen.getByRole("button", { name: "Pin" });
    expect(t).toHaveAttribute("aria-pressed", "false");
    await u.click(t);
    expect(t).toHaveAttribute("aria-pressed", "true");
    await u.keyboard(" ");
    expect(t).toHaveAttribute("aria-pressed", "false");
  });
  it("ToggleGroup multiple keeps several pressed; arrows move focus", async () => {
    const u = userEvent.setup();
    const onChange = vi.fn();
    render(
      <ToggleGroup type="multiple" aria-label="Style" onValueChange={onChange}>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
        <ToggleGroupItem value="i">I</ToggleGroupItem>
      </ToggleGroup>,
    );
    await u.click(screen.getByRole("button", { name: "B" }));
    await u.keyboard("{ArrowRight}");
    expect(screen.getByRole("button", { name: "I" })).toHaveFocus();
    await u.keyboard(" ");
    expect(onChange).toHaveBeenLastCalledWith(["b", "i"]);
  });
});

describe("NumberInput", () => {
  function Controlled(props: { min?: number; max?: number; step?: number; initial?: number | null }) {
    const [v, setV] = useState<number | null>(props.initial ?? 5);
    return <><Field label="Qty"><NumberInput value={v} onValueChange={setV} min={props.min} max={props.max} step={props.step} locale="en-US" /></Field><output>{String(v)}</output></>;
  }
  it("is a labelled spinbutton with value attributes", () => {
    render(<Controlled min={0} max={10} />);
    const sb = screen.getByRole("spinbutton", { name: "Qty" });
    expect(sb).toHaveAttribute("aria-valuenow", "5");
    expect(sb).toHaveAttribute("aria-valuemin", "0");
    expect(sb).toHaveAttribute("aria-valuemax", "10");
  });
  it("arrows step, shift steps by ten, Home/End go to the bounds, all clamped", async () => {
    const u = userEvent.setup();
    render(<Controlled min={0} max={20} />);
    const sb = screen.getByRole("spinbutton");
    await u.click(sb);
    await u.keyboard("{ArrowUp}{ArrowUp}");
    expect(sb).toHaveAttribute("aria-valuenow", "7");
    await u.keyboard("{Shift>}{ArrowUp}{/Shift}");
    expect(sb).toHaveAttribute("aria-valuenow", "17");
    await u.keyboard("{Shift>}{ArrowUp}{/Shift}");
    expect(sb).toHaveAttribute("aria-valuenow", "20");
    await u.keyboard("{Home}");
    expect(sb).toHaveAttribute("aria-valuenow", "0");
    await u.keyboard("{End}");
    expect(sb).toHaveAttribute("aria-valuenow", "20");
  });
  it("parses typed text on blur, clamps and snaps to the step; empty gives null", async () => {
    const u = userEvent.setup();
    render(<Controlled min={0} max={100} step={0.5} />);
    const sb = screen.getByRole("spinbutton");
    await u.clear(sb); await u.type(sb, "1,234.26"); await u.tab();
    expect(screen.getByText("100")).toBeInTheDocument();
    await u.clear(sb); await u.type(sb, "12.26"); await u.keyboard("{Enter}");
    expect(sb).toHaveAttribute("aria-valuenow", "12.5");
    await u.clear(sb); await u.tab();
    expect(screen.getByText("null")).toBeInTheDocument();
  });
  it("steppers change the value and disable at the bounds", async () => {
    const u = userEvent.setup();
    render(<Controlled min={4} max={6} />);
    await u.click(screen.getByRole("button", { name: "Increase" }));
    expect(screen.getByRole("spinbutton")).toHaveAttribute("aria-valuenow", "6");
    expect(screen.getByRole("button", { name: "Increase" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Decrease" })).not.toHaveAttribute("tabindex", "0");
  });
  it("shows the formatted value when not focused and submits the raw number", () => {
    const { container } = render(<form><NumberInput aria-label="Price" name="price" defaultValue={1249.5} format={{ style: "currency", currency: "EUR" }} locale="en-IE" /></form>);
    expect(screen.getByRole("spinbutton")).toHaveValue("€1,249.50");
    expect(container.querySelector<HTMLInputElement>("input[type=hidden][name=price]")!.value).toBe("1249.5");
    fireEvent.focus(screen.getByRole("spinbutton"));
    expect(screen.getByRole("spinbutton")).toHaveValue("1249.5");
  });
});

describe("ScrollArea, typography and layout", () => {
  it("a labelled ScrollArea is a focusable region", () => {
    render(<ScrollArea aria-label="Log" maxHeight={100}><p>line</p></ScrollArea>);
    const region = screen.getByRole("region", { name: "Log" });
    expect(region).toHaveAttribute("tabindex", "0");
  });
  it("Heading level sets the element; size is independent", () => {
    render(<Heading level={4} size="3xl">Title</Heading>);
    const h = screen.getByRole("heading", { level: 4, name: "Title" });
    expect(h).toHaveAttribute("data-size", "3xl");
  });
  it("Text renders as the chosen element and clamps lines", () => {
    const { container } = render(<Text as="span" color="muted" truncate={2}>Hi</Text>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe("SPAN");
    expect(el.dataset.truncate).toBe("lines");
    expect(el.style.webkitLineClamp).toBe("2");
  });
  it("external links open safely in a new tab", () => {
    render(<Link href="https://example.com" external>Docs</Link>);
    const a = screen.getByRole("link", { name: "Docs" });
    expect(a).toHaveAttribute("target", "_blank");
    expect(a).toHaveAttribute("rel", "noopener noreferrer");
  });
  it("Stack and Grid map gaps to the spacing scale", () => {
    const { container } = render(<><Stack direction="row" gap={2} justify="between" /><Grid columns={3} gap="10px" /><Grid minColumnWidth={200} /></>);
    const [stack, grid, auto] = Array.from(container.children) as HTMLElement[];
    expect(stack.style.gap).toBe("var(--sg-space-2)");
    expect(stack.style.justifyContent).toBe("space-between");
    expect(grid.style.gridTemplateColumns).toBe("repeat(3, minmax(0, 1fr))");
    expect(grid.style.gap).toBe("10px");
    expect(auto.style.gridTemplateColumns).toContain("auto-fill");
  });
});

describe("right-to-left", () => {
  it("ThemeProvider dir sets the attribute; Calendar swaps ← and →", async () => {
    const u = userEvent.setup();
    render(
      <ThemeProvider dir="rtl" storageKey={false}>
        <Calendar defaultValue={new Date(2026, 4, 13)} locale="en-GB" />
      </ThemeProvider>,
    );
    expect(document.documentElement).toHaveAttribute("dir", "rtl");
    await u.click(screen.getByRole("button", { name: /13 May 2026/ }));
    await u.keyboard("{ArrowLeft}");
    expect(screen.getByRole("button", { name: /14 May 2026/ })).toHaveFocus();
    await u.keyboard("{ArrowRight}{ArrowRight}");
    expect(screen.getByRole("button", { name: /12 May 2026/ })).toHaveFocus();
    document.documentElement.removeAttribute("dir");
  });
  it("useDirection reads DirectionProvider", () => {
    function Show() { return <span>{useDirection()}</span>; }
    render(<><Show /><DirectionProvider dir="rtl"><Show /></DirectionProvider></>);
    expect(screen.getByText("ltr")).toBeInTheDocument();
    expect(screen.getByText("rtl")).toBeInTheDocument();
  });
});

describe("ThemeProvider", () => {
  it("provides tooltip timing, so Tooltip works without its own provider", () => {
    render(<ThemeProvider storageKey={false}><Tooltip content="Edit"><Button>Hover</Button></Tooltip></ThemeProvider>);
    expect(screen.getByRole("button", { name: "Hover" })).toBeInTheDocument();
  });
});
