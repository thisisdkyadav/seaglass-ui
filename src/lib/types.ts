/** Sea-glass colours, plus semantic aliases that map onto them. */
export type Tone =
  | "clear" | "periwinkle" | "aqua" | "sky" | "seafoam" | "mint" | "lilac" | "coral" | "rose" | "amber" | "sand"
  | "neutral" | "primary" | "success" | "warning" | "danger" | "info";

/** How far a pebble sits above the page: controls its cast shadow and rim. */
export type Depth = "xs" | "sm" | "md" | "lg";

export type Size = "sm" | "md" | "lg";

const TONE_CYCLE: Tone[] = ["periwinkle", "aqua", "rose", "amber", "mint", "lilac", "sky", "seafoam", "coral", "sand"];

/** A stable tone for any string — handy for avatars and tags. */
export function toneFor(key: string): Tone {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  return TONE_CYCLE[Math.abs(h) % TONE_CYCLE.length];
}
