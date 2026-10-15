import { render, screen, within, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import {
  Button, AlertDialog, Field, Input, DataTable, Calendar, SidebarProvider, Sidebar, SidebarNav, SidebarSearch, SidebarInset, useSidebar,
  type Column, type NavSection,
} from "../src";

describe("Button", () => {
  it("renders a pebble button and fires clicks", async () => {
    const onClick = vi.fn();
    render(<Button tone="primary" onClick={onClick}>Save</Button>);
    const b = screen.getByRole("button", { name: "Save" });
    expect(b).toHaveClass("sg-button", "sg-pebble");
    expect(b).toHaveAttribute("data-tone", "primary");
    await userEvent.click(b);
    expect(onClick).toHaveBeenCalledOnce();
  });
  it("is busy and inert while loading", async () => {
    const onClick = vi.fn();
    render(<Button loading onClick={onClick}>Save</Button>);
    const b = screen.getByRole("button", { name: /save/i });
    expect(b).toHaveAttribute("aria-busy", "true");
    await userEvent.click(b);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("Field", () => {
  it("wires label, description and error to the control", () => {
    render(<Field label="Email" description="For receipts" error="Required"><Input /></Field>);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription(/For receipts/);
    expect(input).toHaveAccessibleDescription(/Required/);
  });
});

interface Row { id: string; name: string; total: number }
const rows: Row[] = [{ id: "a", name: "Mia", total: 30 }, { id: "b", name: "Ava", total: 10 }, { id: "c", name: "Leo", total: 20 }];
const cols: Column<Row>[] = [
  { id: "name", header: "Name", accessor: (r) => r.name, sortable: true },
  { id: "total", header: "Total", accessor: (r) => r.total, sortable: true },
];
const names = () => screen.getAllByRole("row").slice(1).map((r) => within(r).getAllByRole("cell").at(-2)!.textContent);

describe("DataTable", () => {
  it("sorts ascending, descending, then off", async () => {
    render(<DataTable aria-label="t" data={rows} columns={cols} getRowId={(r) => r.id} selectable />);
    const sortBtn = screen.getByRole("button", { name: /name/i });
    await userEvent.click(sortBtn);
    expect(names()).toEqual(["Ava", "Leo", "Mia"]);
    await userEvent.click(sortBtn);
    expect(names()).toEqual(["Mia", "Leo", "Ava"]);
    await userEvent.click(sortBtn);
    expect(names()).toEqual(["Mia", "Ava", "Leo"]);
  });
  it("selects all, shows bulk actions and an indeterminate header", async () => {
    render(<DataTable aria-label="t" data={rows} columns={cols} getRowId={(r) => r.id} selectable bulkActions={(ids) => <span>bulk {ids.length}</span>} />);
    const boxes = screen.getAllByRole("checkbox");
    await userEvent.click(boxes[1]);
    expect(screen.getByText("bulk 1")).toBeInTheDocument();
    expect(screen.getAllByRole("checkbox")[0]).toHaveAttribute("data-state", "indeterminate");
    await userEvent.click(screen.getAllByRole("checkbox")[0]);
    expect(screen.getByText("bulk 3")).toBeInTheDocument();
  });
  it("filters with search", async () => {
    render(<DataTable aria-label="t" data={rows} columns={cols} getRowId={(r) => r.id} searchable />);
    await userEvent.type(screen.getByLabelText("Search table"), "le");
    expect(names()).toEqual(["Leo"]);
  });
});

describe("Calendar", () => {
  it("moves focus with arrows and selects with Enter", async () => {
    const onChange = vi.fn();
    render(<Calendar defaultValue={new Date(2026, 9, 15)} onValueChange={onChange} />);
    const day15 = screen.getByRole("button", { name: /15 October 2026|October 15, 2026/ });
    act(() => day15.focus());
    await userEvent.keyboard("{ArrowRight}{ArrowDown}{Enter}");
    expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 9, 23));
  });
  it("pages months with PageDown", async () => {
    render(<Calendar defaultValue={new Date(2026, 9, 15)} />);
    act(() => screen.getByRole("button", { name: /15 October 2026|October 15, 2026/ }).focus());
    await userEvent.keyboard("{PageDown}");
    expect(screen.getByText("November 2026")).toBeInTheDocument();
    expect(document.activeElement).toHaveAccessibleName(/15 November 2026|November 15, 2026/);
  });
});

const sections: NavSection[] = [
  { id: "s", items: [
    { id: "home", label: "Home", href: "#/home" },
    { id: "sales", label: "Sales", children: [{ id: "orders", label: "Orders", href: "#/orders" }, { id: "invoices", label: "Invoices", href: "#/inv" }] },
  ] },
];
function Probe() { const s = useSidebar(); return <span data-testid="state">{s.collapsed ? "rail" : "open"}</span>; }
function Shell({ onNav }: { onNav?: (id: string) => void }) {
  const [active, setActive] = useState("home");
  return (
    <SidebarProvider storageKey={false}>
      <Sidebar><SidebarSearch /><SidebarNav sections={sections} activeId={active} onNavigate={(i) => { setActive(i.id); onNav?.(i.id); }} /></Sidebar>
      <SidebarInset><Probe /></SidebarInset>
    </SidebarProvider>
  );
}

describe("Sidebar", () => {
  it("collapses to a rail with [ and expands again", async () => {
    render(<Shell />);
    expect(screen.getByTestId("state")).toHaveTextContent("open");
    await userEvent.keyboard("[[");
    expect(screen.getByTestId("state")).toHaveTextContent("rail");
    await userEvent.keyboard("[[");
    expect(screen.getByTestId("state")).toHaveTextContent("open");
  });
  it("keeps groups shut when the active page is elsewhere", () => {
    render(<Shell />);
    expect(screen.getByRole("button", { name: /sales/i })).toHaveAttribute("aria-expanded", "false");
  });
  it("filters with / and jumps to the first match on Enter", async () => {
    const onNav = vi.fn();
    render(<Shell onNav={onNav} />);
    await userEvent.keyboard("/");
    expect(screen.getByLabelText("Filter navigation")).toHaveFocus();
    await userEvent.keyboard("invo");
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
    expect(screen.getByText("Invoices")).toBeInTheDocument();
    await userEvent.keyboard("{Enter}");
    expect(onNav).toHaveBeenCalledWith("invoices");
  });
});

describe("AlertDialog", () => {
  const setup = (onConfirm: () => Promise<void>) =>
    render(<AlertDialog trigger={<Button>Delete</Button>} title="Delete it?" confirmLabel="Delete forever" onConfirm={onConfirm} />);

  it("stays open and busy until an async confirm resolves", async () => {
    let resolve!: () => void;
    setup(() => new Promise<void>((r) => { resolve = r; }));
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    await userEvent.click(screen.getByRole("button", { name: "Delete forever" }));
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Delete forever/ })).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
    await act(async () => resolve());
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("stays open when the confirm rejects", async () => {
    let reject!: () => void;
    setup(() => new Promise<void>((_, r) => { reject = () => r(new Error("nope")); }));
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    await userEvent.click(screen.getByRole("button", { name: "Delete forever" }));
    await act(async () => reject());
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete forever" })).not.toHaveAttribute("aria-busy");
  });
});
