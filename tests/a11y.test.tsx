// Accessibility: every docs example, plus every overlay in its open state, must pass axe.
// jsdom has no layout, so colour contrast is checked separately (scripts/contrast.mjs).
import { render, screen, act, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import type { ComponentType, ReactNode } from "react";
import { ThemeProvider, TooltipProvider, Toaster } from "../src";

const examples = import.meta.glob<{ default: ComponentType }>("../site/src/examples/*/*.tsx", { eager: true });

function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={0}>
        <div>{children}</div>
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}

async function violations(node: Element = document.body) {
  const { violations } = await axe.run(node, {
    rules: {
      "color-contrast": { enabled: false }, // needs real layout and computed styles
      region: { enabled: false },            // examples are fragments, not full pages
    },
  });
  return violations.map((v) => `${v.id}: ${v.help}\n  ${v.nodes.map((n) => n.target.join(" ")).join("\n  ")}`);
}

afterEach(() => { cleanup(); localStorage.clear(); });

describe("axe: docs examples", () => {
  for (const [path, mod] of Object.entries(examples)) {
    const name = path.replace("../site/src/examples/", "").replace(".tsx", "");
    it(name, async () => {
      const Example = mod.default;
      render(<Providers><Example /></Providers>);
      await act(async () => {});
      expect(await violations()).toEqual([]);
    });
  }
});

const open = async (name: string, trigger: RegExp, how: "click" | "contextmenu" | "focus" = "click") => {
  const Example = examples[`../site/src/examples/${name}.tsx`].default;
  render(<Providers><Example /></Providers>);
  const user = userEvent.setup();
  const el = screen.getAllByText(trigger)[0].closest("button, [role=combobox], [data-radix-context-menu-trigger], div")!;
  if (how === "contextmenu") await act(async () => { el.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true, clientX: 10, clientY: 10 })); });
  else if (how === "focus") await act(async () => { await user.tab(); });
  else await user.click(el as HTMLElement);
  await act(async () => {});
};

describe("axe: open overlays", () => {
  it("dialog", async () => { await open("dialog/basic", /edit profile/i); expect(screen.getByRole("dialog")).toBeInTheDocument(); expect(await violations()).toEqual([]); });
  it("alert dialog", async () => { await open("alert-dialog/basic", /delete/i); expect(screen.getByRole("alertdialog")).toBeInTheDocument(); expect(await violations()).toEqual([]); });
  it("sheet", async () => { await open("sheet/sides", /right/i); expect(screen.getByRole("dialog")).toBeInTheDocument(); expect(await violations()).toEqual([]); });
  it("dropdown menu", async () => { await open("dropdown-menu/basic", /actions/i); expect(screen.getByRole("menu")).toBeInTheDocument(); expect(await violations()).toEqual([]); });
  it("select", async () => { await open("select/basic", /choose a currency/i); expect(screen.getByRole("listbox")).toBeInTheDocument(); expect(await violations()).toEqual([]); });
  it("combobox", async () => { await open("combobox/single", /portugal/i); expect(screen.getByRole("listbox")).toBeInTheDocument(); expect(await violations()).toEqual([]); });
  it("popover", async () => { await open("popover/basic", /.+/); expect(document.querySelector(".sg-popover")).toBeInTheDocument(); expect(await violations()).toEqual([]); });
  it("date picker", async () => { await open("date-picker/date-picker", /pick a date/i); expect(document.querySelector(".sg-calendar")).toBeInTheDocument(); expect(await violations()).toEqual([]); });
  it("command palette", async () => { await open("command/palette", /open|search|command/i); expect(screen.getByRole("dialog")).toBeInTheDocument(); expect(await violations()).toEqual([]); });
});
