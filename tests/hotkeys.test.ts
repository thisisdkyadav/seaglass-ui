import { matchHotkey, formatHotkey } from "../src/hooks/use-hotkeys";

const ev = (key: string, mods: Partial<KeyboardEvent> = {}) => new KeyboardEvent("keydown", { key, ...mods });

describe("matchHotkey", () => {
  it("matches plain keys and ignores modifiers it does not ask for", () => {
    expect(matchHotkey(ev("["), "[")).toBe(true);
    expect(matchHotkey(ev("[", { ctrlKey: true }), "[")).toBe(false);
  });
  it("treats mod as Ctrl off Mac", () => {
    expect(matchHotkey(ev("k", { ctrlKey: true }), "mod+k")).toBe(true);
    expect(matchHotkey(ev("k"), "mod+k")).toBe(false);
  });
  it("needs shift when asked", () => {
    expect(matchHotkey(ev("D", { shiftKey: true }), "shift+d")).toBe(true);
    expect(matchHotkey(ev("d"), "shift+d")).toBe(false);
  });
  it("formats combos for display", () => {
    expect(formatHotkey("mod+shift+p")).toEqual(expect.arrayContaining(["P"]));
  });
});
