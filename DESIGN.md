# Sea Glass — design language

Reference implementations live in the `uiexp` repo: `sea-glass-v4.html` (the canonical
material, fixed light), `sea-glass-dashboard.html` (a full app built with it), and
`sea-glass-v1/v2/v3.html` (earlier explorations).

## The idea

Every interactive surface is a small, smooth pebble of frosted sea glass resting on a
sheet of paper. It is thick in the middle, rounds down to its edges, and casts a real
shadow. Not a flat card, and not glossy "liquid glass": matte, soft and worn, like
something the sea has tumbled for years.

## Material

- **Frosted, not clear.** The body is milky and translucent. It softens whatever is behind
  it but never shows it sharply.
- **Fine flecks.** Tiny light chips and darker pits, like real worn glass. They stay crisp
  while the body under them is slightly soft (≈1.2px blur).
- **Uneven top.** Gentle low-frequency rises and dips across the surface (a soft-light noise
  texture), so it never reads as a flat plateau. Every pebble gets its own patch of it.
- **Cloudy core.** The centre is a little denser and deeper in colour; the edges are paler,
  and the bottom edge is lightest, where light leaks out of the glass.

## Shape

- **Straight, clean outlines.** Always a regular rounded rectangle or a full pill. The
  organic feel comes from the surface, never from wobbly edges.
- **Domed thickness.** The edge facing the light turns milky-bright, the far edge rolls away
  into deeper colour, and the base has a thin bright lip.
- **Generous rounding.** Pills for controls, 20–32px corners for cards, circles for avatars
  and icon buttons.

## Light

- **One fixed lamp, up and to the left.** Nothing reacts to the pointer.
- **Every pebble casts a soft, slightly tinted shadow down and to the right.** Shadow length
  scales with size — large cards ~14px, controls ~10px, chips and avatars ~6px — so
  everything appears to rest at the same height above the page.
- **Interaction.** Hover lifts a pebble slightly; pressing sinks it and tightens its shadow.

## Colour

- **Pale, sun-bleached tints**, the colours real beach glass comes in: periwinkle, seafoam,
  aqua, lilac, coral, amber, mint — plus a *clear* milky grey for neutral surfaces.
- **One recipe for every colour.** A tint is a single hue/saturation/lightness triple; body,
  rim, core, lip and shadow are all derived from it.
- **Text takes the pebble's own hue, very dark** (deep indigo on periwinkle, deep teal on
  aqua) — never plain black on a coloured pebble.
- **The page is white paper.** Colour lives only in the pebbles.

## Dark mode

Not a black screen: a dim, warm room lit by one lamp. Warm sand-brown page, a soft pool of
brighter light near the top-left, gentle fall-off towards the corners. Everything stays fully
visible. Shadows turn warm brown instead of cool grey; pebbles keep their tints, slightly
muted by the room light.

## Supporting details

- **White chips inside pebbles** mark active or selected states, like a smooth shell resting
  on the stone (selected tab, active nav item, inline actions).
- **Sunken fields.** Inputs and search boxes are pressed *into* the surface (inset shadow),
  never raised.
- **Charts are pebbles too.** Bars, funnel steps and avatars are each their own small
  pebble; lines are thin, smooth curves.
- **Type.** Outfit / Google Sans, weights 500–600, slightly tight tracking on headings,
  tabular numbers for figures.
- **Icons.** Material Symbols Rounded, filled, weight ~500.
- **Motion.** Soft, slightly springy easing. Menus fold open smoothly; nothing snaps or
  flashes. Respect reduced-motion.

## Rules of thumb

**Do:** keep outlines straight · use one light direction · give every pebble a shadow · let
colour come from tints · leave white space so pebbles have room to cast shadows.

**Don't:** glossy highlights · sharp reflections · distorted borders · hard drop shadows ·
saturated colours · black text on colour · light that follows the cursor.

**In one line:** frosted sea-glass pebbles, domed and softly lit from the top left, resting on
white paper — tactile, calm and natural, with crisp outlines and soft insides.
