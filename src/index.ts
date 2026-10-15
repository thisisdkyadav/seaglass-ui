/* Sea Glass — React components. Import the styles once:  import "seaglass/styles.css"; */

// foundation
export { ThemeProvider, useTheme, type ThemeProviderProps, type ThemeSetting } from "./components/theme";
export { Pebble, type PebbleProps } from "./components/pebble";
export type { Tone, Depth, Size } from "./lib/types";
export { toneFor } from "./lib/types";
export { cx } from "./lib/cx";

// hooks
export { useHotkeys, formatHotkey, matchHotkey, isMac, type HotkeyOptions } from "./hooks/use-hotkeys";
export { useControllableState } from "./hooks/use-controllable-state";
export { useMediaQuery } from "./hooks/use-media-query";
export { usePersistedState } from "./hooks/use-persisted-state";

// primitives
export { Button, IconButton, ButtonGroup, type ButtonProps, type IconButtonProps, type ButtonGroupProps } from "./components/button";
export { Badge, Count, type BadgeProps, type CountProps } from "./components/badge";
export { Avatar, AvatarGroup, initials, type AvatarProps, type AvatarGroupProps } from "./components/avatar";
export { Card, CardHeader, CardBody, CardFooter, type CardProps, type CardHeaderProps } from "./components/card";
export { Spinner, type SpinnerProps } from "./components/spinner";
export { Kbd, Separator, Skeleton, Progress, EmptyState, VisuallyHidden, type KbdProps, type SeparatorProps, type SkeletonProps, type ProgressProps, type EmptyStateProps } from "./components/misc";

// forms
export { Field, Label, Input, Textarea, useField, type FieldProps, type InputProps, type TextareaProps } from "./components/field";
export { Checkbox, RadioGroup, Radio, Switch, type CheckboxProps, type RadioGroupProps, type RadioProps, type SwitchProps } from "./components/checkbox";
export { Slider, type SliderProps } from "./components/slider";
export { SegmentedControl, type SegmentedControlProps, type SegmentedOption } from "./components/segmented-control";
export { Select, SelectItem, SelectSeparator, type SelectProps, type SelectOption, type SelectGroup } from "./components/select";
export { Combobox, type ComboboxProps, type ComboboxOption } from "./components/combobox";
export { Calendar, DatePicker, DateRangePicker, type CalendarProps, type DatePickerProps, type DateRangePickerProps, type DateRange } from "./components/calendar";

// overlays
export { Tooltip, TooltipProvider, type TooltipProps } from "./components/tooltip";
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverClose, HoverCard, HoverCardTrigger, HoverCardContent, type PopoverContentProps } from "./components/popover";
export * from "./components/menu";
export {
  Dialog, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter,
  Sheet, SheetTrigger, SheetClose, SheetContent, AlertDialog,
  type DialogContentProps, type SheetContentProps, type AlertDialogProps,
} from "./components/dialog";
export { toast, Toaster, type ToastOptions, type ToasterProps, type ToastKind, type ToastItem } from "./components/toast";
export { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandPalette, type CommandItemProps, type CommandPaletteProps } from "./components/command";

// navigation
export { Tabs, TabsList, Tab, TabsContent, Accordion, AccordionItem, Collapsible, CollapsibleTrigger, CollapsibleContent, type TabsProps, type TabProps, type AccordionProps, type AccordionItemProps } from "./components/tabs";
export { Breadcrumbs, Pagination, type BreadcrumbsProps, type Crumb, type PaginationProps } from "./components/breadcrumbs";
export {
  SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarInset, SidebarTrigger, SidebarSearch,
  SidebarNav, SidebarButton, SidebarExpandedOnly, useSidebar,
  type SidebarProviderProps, type SidebarProps, type SidebarNavProps, type NavItem, type NavSection, type LinkProps, type SidebarButtonProps,
} from "./components/sidebar";

// data display
export { Table, THead, TBody, TR, TH, TD, DataTable, type TableProps, type Column, type DataTableProps, type SortState } from "./components/table";
export { Stat, Sparkline, BarChart, type StatProps, type SparklineProps, type BarChartProps } from "./components/stat";
