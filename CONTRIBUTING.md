# Contributing to Sea Glass UI

Thanks for helping. Bug reports, docs fixes and new components are all welcome.

## Setup

```bash
git clone https://github.com/thisisdkyadav/seaglass-ui.git
cd seaglass-ui
npm install
npm run dev            # docs site with live examples at http://localhost:5173
```

Requires Node 20.19 or newer.

## Layout

| Path | What |
|------|------|
| `src/components` | One file per component. Behaviour comes from Radix or cmdk; we add styling and ergonomics. |
| `src/styles` | Plain CSS. `tokens.css` holds every design token; component styles only use tokens. |
| `tests` | Vitest + Testing Library, including an axe accessibility pass over every component. |
| `site` | The docs site. `site/src/content/registry.ts` is the props reference; examples live in `site/src/examples/<component>/`. |
| `examples/dashboard` | A full app built only from the library. |

## Before you open a pull request

```bash
npm run typecheck && npm test && npm run build && npm run lint:pkg
```

- **Add a changeset** for anything that changes the published package: `npx changeset`, pick
  patch / minor / major, and describe the change for users. Docs-only and test-only changes do not need one.
- **Test the behaviour you add.** New components need an entry in `tests/a11y.test.tsx` and a
  keyboard test for anything interactive.
- **Update the docs**: add or adjust examples and the props table in `registry.ts`.
- **Check it by hand** in light and dark (Shift + D on the docs site), at phone width, and with the
  keyboard only.

## Design rules

- Size, space, type and radius come from the tokens in `src/styles/tokens.css`. Do not hard-code new pixel values.
- Use logical properties (`margin-inline-start`, `inset-inline-end`) so layouts work right-to-left.
- One material: surfaces are pebbles (`.sg-pebble`), wells (`.sg-well`) or chips (`.sg-chip-surface`).
  Read [DESIGN.md](DESIGN.md) before adding a new surface.
- Every interactive element must be reachable and operable from the keyboard, with a visible focus state.

## Releases

Maintainers merge the "Version packages" pull request that Changesets opens; CI then publishes to
npm with provenance and creates the GitHub release.
