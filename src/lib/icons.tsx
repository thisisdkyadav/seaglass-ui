import type { SVGProps } from "react";

/* The few glyphs components need internally. Rounded strokes to match
   Material Symbols Rounded, which apps are encouraged to use for their own icons. */
type P = SVGProps<SVGSVGElement>;
const base = (p: P): P => ({
  width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, ...p,
});

export const CheckIcon = (p: P) => <svg {...base(p)}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>;
export const ChevronDown = (p: P) => <svg {...base(p)}><path d="M6 9.5l6 6 6-6" /></svg>;
export const ChevronRight = (p: P) => <svg {...base(p)}><path d="M9.5 6l6 6-6 6" /></svg>;
export const ChevronLeft = (p: P) => <svg {...base(p)}><path d="M14.5 6l-6 6 6 6" /></svg>;
export const ChevronsUpDown = (p: P) => <svg {...base(p)}><path d="M8 9l4-4 4 4M8 15l4 4 4-4" /></svg>;
export const XIcon = (p: P) => <svg {...base(p)}><path d="M6.5 6.5l11 11M17.5 6.5l-11 11" /></svg>;
export const SearchIcon = (p: P) => <svg {...base(p)}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4 4" /></svg>;
export const MinusIcon = (p: P) => <svg {...base(p)}><path d="M6 12h12" /></svg>;
export const DotIcon = (p: P) => <svg {...base(p)} fill="currentColor" stroke="none"><circle cx="12" cy="12" r="4" /></svg>;
export const ArrowUp = (p: P) => <svg {...base(p)}><path d="M12 19V5M6 11l6-6 6 6" /></svg>;
export const ArrowDown = (p: P) => <svg {...base(p)}><path d="M12 5v14M6 13l6 6 6-6" /></svg>;
export const CalendarIcon = (p: P) => <svg {...base(p)}><rect x="4" y="5.5" width="16" height="14.5" rx="3" /><path d="M8 3.5v4M16 3.5v4M4 10h16" /></svg>;
export const PanelLeft = (p: P) => <svg {...base(p)}><rect x="3.5" y="4.5" width="17" height="15" rx="3.5" /><path d="M9.5 4.5v15" /></svg>;
export const MenuIcon = (p: P) => <svg {...base(p)}><path d="M4.5 7h15M4.5 12h15M4.5 17h15" /></svg>;
export const InfoIcon = (p: P) => <svg {...base(p)}><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5.5M12 7.8v.1" /></svg>;
export const AlertIcon = (p: P) => <svg {...base(p)}><path d="M12 4l9 15.5H3L12 4z" /><path d="M12 10v4.5M12 17.2v.1" /></svg>;
export const CheckCircle = (p: P) => <svg {...base(p)}><circle cx="12" cy="12" r="8.5" /><path d="M8 12.3l2.8 2.8L16.2 9.6" /></svg>;
export const MoreIcon = (p: P) => <svg {...base(p)} fill="currentColor" stroke="none"><circle cx="5.5" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="18.5" cy="12" r="1.8" /></svg>;
