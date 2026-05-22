# CLAUDE.md — guidance for AI assistants working on this app

This is the Maribyrnong flood-resilience capstone app (ENGR90051). Read this
before making changes. It captures stack rules and design conventions that are
not obvious from the code.

## Stack — do not swap libraries without asking

- **Expo SDK 54** (managed workflow, typed routes, React Compiler enabled)
- **Expo Router 6** — file-based routing under `app/`
- **TypeScript strict** — every new file must typecheck under `npm run typecheck`
- **NativeWind v4** + **Tailwind 3.4** — styling via `className` for layout
  primitives, but inline `style={{}}` is acceptable when a value is dynamic from
  the Theme object (palette colour, scale-multiplied font size, etc.). The
  design system is theme-driven; don't fight it.
- **Reanimated 4** + **Gesture Handler 2** — already wired into the root layout
- **react-native-svg** — used by River gauge, address map, etc.
- **Ionicons** via `@expo/vector-icons` — preferred icon set; do not add another
- **Custom fonts**: `Instrument Serif` (display) + `IBM Plex Mono` (eyebrow /
  numeric labels). Loaded in `app/_layout.tsx` via `@expo-google-fonts/*`.
- **AsyncStorage** for the user profile only — no other persistence yet
- **npm** (not yarn / pnpm / bun)

If a task seems to need a new dependency, flag it and wait for confirmation.
Especially do not add: state libraries (Zustand/Redux), data fetching libs
(React Query) — these will be chosen later.

## Path alias

`@/*` resolves to the project root. Prefer `@/components/ui/Button` over
`../../../components/ui/Button`.

## Folder conventions

```
app/
  _layout.tsx           Root: fonts, ProfileProvider, RouteGate
  (onboarding)/         Welcome → Address → Access → Buddy → Review
    welcome.tsx address.tsx access.tsx buddy.tsx review.tsx
  (tabs)/               Main app: Home/River/Street/Lamp/Call
    _layout.tsx index.tsx river.tsx street.tsx lamp.tsx call.tsx
  settings.tsx          Modal — opened from header avatar in (tabs)
  +not-found.tsx
components/ui/          Reusable, themed primitives
constants/Colors.ts     Three palettes (default / hc / cb-safe)
lib/
  profile.tsx           ProfileProvider, useProfile, useTheme — the spine
  i18n.ts               Tiny dict-based translations (en/vi/zh/ga)
hooks/                  Reusable React hooks
assets/                 App icons & images
```

## The accessibility-profile architecture (read this)

The product idea is that **accessibility settings live in normal registration**,
not behind a hidden mode switch. `lib/profile.tsx` holds the user's choices
(text size, palette, language, read-aloud, simpler-screens) in AsyncStorage and
exposes a derived `Theme` object that every screen consumes:

```tsx
const t = useTheme(); // current palette + scale + radius + density + flags
const tr = useT(); // translate function for the current language
```

Screens read from `t` to compute font sizes, border colours, alert tones, etc.
**Don't hard-code colours** that already live in `t.amber`, `t.hydroSoft`, etc.

`app/_layout.tsx` mounts a `<RouteGate>` that redirects users to `/welcome` if
they haven't finished onboarding, and out of onboarding once they have.

## Design tokens — the three palettes

Defined in **two** places that must stay in sync:

1. `tailwind.config.js` → `theme.extend.colors` (raw token list, used for class
   utilities like `bg-amber`, `text-hydro-ink`)
2. `constants/Colors.ts` → `PALETTES` map keyed by `default | hc | cb-safe`

The active palette is selected by `profile.palette` and surfaced via
`useTheme()` as `t.amber`, `t.amberSoft`, `t.amberInk`, etc.

| Tone  | Use                                |
| ----- | ---------------------------------- |
| amber | Watch / preparing                  |
| hydro | River / informational / brand-blue |
| red   | Act / danger / SOS                 |
| green | Calm / safe / ready                |

When you need an accent on a screen, pick the tone that matches the meaning,
then read `t.<tone>` / `t.<tone>Soft` / `t.<tone>Ink` from the theme. Use
Tailwind's built-in `slate-*` only for neutrals where the palette doesn't apply.

If you add a new colour token, update **both** files in the same change.

## i18n

App ships in 4 languages: English, Vietnamese (vi), Chinese (zh), Irish (ga).
Strings are flat keys in `lib/i18n.ts`. Add new keys as full `Dict` objects
covering all four; missing keys fall back to English.

Don't add i18n libraries (i18next, react-intl, FormatJS) — the dict-based
approach scales fine for this app's surface area.

## Styling rules

- **Layout**: NativeWind classes (`flex-1`, `gap-3`, `p-4`).
- **Themed values**: read from `useTheme()` and pass via `style={{ ... }}`.
  This is intentional — the design has too many dynamic values per screen to
  enumerate as classes.
- **Typography**: use `<Eyebrow>`, `<SerifTitle>`, `<Body>` from
  `components/ui/`. They scale with `t.scale` automatically.
- **Cards**: `<Card>`. Override padding via `style={{ padding: 0 }}` when you
  need to lay out internal sections with different colours.
- **No `clsx`/`classnames` dependency** — template literals are enough.
- **Don't reach for `StyleSheet.create`** — inline `style={{}}` is preferred so
  themed values (e.g. `t.amber`) don't have to be threaded through factories.

## Editing the design

Most visual changes should land in `components/ui/*` or in `lib/profile.tsx`'s
`deriveTheme` function. Editing the same colour across multiple screens is a
sign that the value should be a theme token instead.

Onboarding step 3 (`app/(onboarding)/access.tsx`) and `app/settings.tsx` share
the same surface — preferences set at registration should be editable here. If
you change the schema in either, update the other.

## Quality gates — run after non-trivial edits

```bash
npm run typecheck   # tsc --noEmit, must pass
npm run lint        # eslint ., must pass with 0 errors
```

`npx expo-doctor` should also stay green. Don't introduce dependency-version
mismatches; if Expo prints a "compatible version" warning, follow its advice.

## Things to avoid

- Don't reintroduce the demo components from the default Expo template
  (themed-text, parallax-scroll-view, haptic-tab) — they were stripped on
  purpose.
- Don't write tests (the user will set up the test stack later).
- Don't write feature logic (alert APIs, real maps, auth, real call dialing,
  real lamp pairing) unless the task explicitly asks for it. The current
  surface is calm-state UI only — Watch/Act states and the Lamp tweaks panel
  are deferred.

## When you finish a UI change

State explicitly that you have _not_ run it in a simulator/browser unless you
actually have. Type/lint passing ≠ UI working. Ask the user to verify
visually with `npm run web` or `npm run ios`. Reset the user profile via
Settings → "Restart onboarding" to retest the onboarding flow.
