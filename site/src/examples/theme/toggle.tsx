import { SegmentedControl, useTheme, type ThemeSetting } from "seaglass";
import { Sun, Moon, Monitor } from "lucide-react";

// Wrap your app once in <ThemeProvider>. Shift+D toggles anywhere.
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <SegmentedControl
      aria-label="Theme"
      variant="joined"
      value={theme}
      onValueChange={(v) => setTheme(v as ThemeSetting)}
      options={[
        { value: "light", label: "Light", icon: <Sun size={16} /> },
        { value: "dark", label: "Dark", icon: <Moon size={16} /> },
        { value: "system", label: "System", icon: <Monitor size={16} /> },
      ]}
    />
  );
}
