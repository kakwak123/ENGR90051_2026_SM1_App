# CLAUDE.md — guidance for AI assistants working on this app

This is the Maribyrnong flood-resilience capstone app (ENGR90051). Read this
before making changes. It captures stack rules and design conventions that are
not obvious from the code.

## Stack — do not swap libraries without asking

- **Expo SDK 54** (managed workflow, typed routes, React Compiler enabled)
- **Expo Router 6** — file-based routing under `app/`
- **TypeScript strict** — every new file must typecheck under `npm run typecheck`
- **NativeWind v4** + **Tailwind 3.4** — all styling via `className`. No
  `StyleSheet.create`, no inline `style={{}}` unless the value is dynamic and
  cannot be expressed as a class.
- **Reanimated 4** + **Gesture Handler 2** — already wired into the root layout
- **Ionicons** via `@expo/vector-icons` — preferred icon set; do not add another
- **npm** (not yarn / pnpm / bun)

If a task seems to need a new dependency, flag it and wait for confirmation.
Especially do not add: state libraries (Zustand/Redux), data fetching libs
(React Query) — these will be chosen later.

## Path alias

`@/*` resolves to the project root. Prefer `@/components/ui/Button` over
`../../../components/ui/Button`.

## Folder conventions

```
app/                    Routes only. One screen per file. Layouts in _layout.tsx.
  (tabs)/               Tab routes — index/map/report/prepare/profile
components/ui/          Reusable, themed primitives (Button, Card, …)
components/             Larger feature components live at the top level
constants/Colors.ts     Palette mirror of tailwind.config theme.extend.colors
hooks/                  Reusable React hooks
lib/                    Helpers, types, future API clients
assets/images           App icons and visual assets
```

A new screen goes in `app/`. A new generic styled element goes in
`components/ui/`. A feature-specific component (e.g. `AlertBanner`,
`FloodMap`) goes in `components/`.

## Design tokens — the palette

Defined in **two** places that must stay in sync:

1. `tailwind.config.js` → `theme.extend.colors`
2. `constants/Colors.ts`

| Token   | Hex       | Use                    |
| ------- | --------- | ---------------------- |
| primary | `#0369a1` | Brand, nav, links      |
| danger  | `#dc2626` | Active flood alerts    |
| warning | `#d97706` | Watch / advisory state |
| safe    | `#16a34a` | Cleared / safe state   |

Reach for these via `bg-primary`, `text-danger`, `border-warning`. Use Tailwind's
built-in `slate-*` for neutrals; do not invent new neutrals.

If you add a new color token, update **both** files in the same change.

## Styling rules

- **Use NativeWind classes.** `<View className="flex-1 items-center bg-slate-50 p-6">`.
- **Variants via discriminated props**, not class merging. Look at how `Button`
  maps `variant` → class string for the pattern.
- **No `clsx`/`classnames` dependency** — template literals or simple lookup
  objects are enough at this scale.
- **Spacing**: prefer Tailwind scale (`p-4`, `gap-3`). Avoid arbitrary values
  unless matching an external design.
- **Rounded corners**: `rounded-xl` (12px) for cards, `rounded-lg` (8px) for
  inputs/buttons, `rounded-full` for pills/avatars. Stay consistent.
- **Shadows**: `shadow-sm` on cards. Don't pile on heavier shadows.
- **Type**: rely on `Heading` / `Body` primitives. Don't restyle `Text`
  ad-hoc inside screens.

## Editing the design

Most visual changes should land in `components/ui/*`, not in screens. If you
find yourself editing the same className across multiple screens, that's a
signal to push it into a primitive instead.

## Quality gates — run after non-trivial edits

```bash
npm run typecheck   # must pass
npm run lint        # must pass with 0 errors
```

`npx expo-doctor` should also stay green. Don't introduce dependency-version
mismatches; if Expo prints a "compatible version" warning, follow its advice.

## Things to avoid

- Don't reintroduce the demo components from the default Expo template
  (themed-text, parallax-scroll-view, haptic-tab) — they were stripped on
  purpose.
- Don't add custom fonts yet. System default is fine for now.
- Don't write tests (the user will set up the test stack later).
- Don't write feature logic (alert APIs, map integrations, auth) unless the
  task explicitly asks for it. This codebase is still scaffold.

## When you finish a UI change

State explicitly that you have _not_ run it in a simulator/browser unless you
actually have. Type/lint passing ≠ UI working. Ask the user to verify
visually with `npm run web` or `npm run ios`.
