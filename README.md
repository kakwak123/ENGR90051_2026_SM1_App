# ENGR90051 — Maribyrnong Flood Resilience App

Capstone mobile app for flood resilience in the Maribyrnong area. Supports
residents before, during, and after flood events: alerts, flood map, community
street tracker, companion FloodLamp, and personalised risk info.

> Status: **calm-state UI only**. Watch/Act alert states are deferred. Onboarding
> flow, theme system, i18n, and the 5-tab main app are all wired up.

## Stack

| Tool                         | Version                          |
| ---------------------------- | -------------------------------- |
| Expo SDK                     | ~54.0.33                         |
| Expo Router                  | ~6.0.23                          |
| React Native                 | 0.81.5                           |
| React                        | 19.1.0                           |
| NativeWind                   | ^4.1.23 (4.2.x installed)        |
| Tailwind CSS                 | ^3.4.17                          |
| TypeScript                   | ~5.9.2 (strict mode)             |
| React Native Reanimated      | ~4.1.1                           |
| React Native Gesture Handler | ~2.28.0                          |
| react-native-svg             | ~15.x (river gauge, address map) |
| AsyncStorage                 | (profile persistence)            |
| Custom fonts                 | Instrument Serif, IBM Plex Mono  |

Managed workflow, typed routes enabled, React Compiler enabled.

## Install

```bash
npm install
```

## Run

```bash
npm run start       # Expo dev server (press i for iOS sim, w for web, a for Android)
npm run ios         # iOS Simulator
npm run web         # Web (browser)
npm run android     # Android emulator / device
```

## Quality gates

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint .
npm run format      # prettier --write .
npx expo-doctor     # config / dependency health check
```

## What's in the app

### Onboarding (5 steps, accessibility-first)

The product idea: accessibility prefs are baked into normal registration, not
hidden behind a "mode" switch.

1. **Welcome** — intro copy, "Get started"
2. **Address** — single address (mocked), tiny SVG map
3. **Access** — text size · palette · language · read-aloud · simpler-screens
4. **Buddy** — pick one trusted neighbour
5. **Review** — live preview of how the app will look + confirm

Re-trigger the flow any time via Settings → "Restart onboarding".

### Main app — 5 tabs

| Tab    | Status | Description                                   |
| ------ | ------ | --------------------------------------------- |
| Home   | calm   | Location, river card, street strip, bag/buddy |
| River  | calm   | Gauge with street + door markers, now/future  |
| Street | calm   | Block-bar of 12 homes, legend, per-home list  |
| Lamp   | calm   | Companion FloodLamp state, settings rows      |
| Call   | always | Buddy / family / GP + emergency 000           |

Settings is reached via the avatar in the tab header.

### Three palettes

Selected during onboarding; switchable in Settings:

- **Default** — soft blue/amber/red/green, slate neutrals
- **High contrast** — pure black ink, thick borders, vivid hues
- **CB-safe** — colour-blind safe substitution (red → black, amber → yellow)

### Four languages

English · Vietnamese (Tiếng Việt) · Chinese (中文) · Irish (Gaeilge).
Strings live in `lib/i18n.ts`.

## Folder map

```
app/
  _layout.tsx           Root: fonts + ProfileProvider + RouteGate
  (onboarding)/
    _layout.tsx
    welcome.tsx address.tsx access.tsx buddy.tsx review.tsx
  (tabs)/
    _layout.tsx index.tsx river.tsx street.tsx lamp.tsx call.tsx
  settings.tsx
  +not-found.tsx
components/ui/          Eyebrow, SerifTitle, Body, Card, Button, Badge,
                        Heading, Screen, StepDots
constants/
  Colors.ts             Three palettes (default / hc / cb-safe)
lib/
  profile.tsx           ProfileProvider + useProfile() + useTheme()
  i18n.ts               Flat dict, useT()
  types.ts
hooks/                  (currently empty)
assets/                 App icons, splash
global.css              Tailwind directives
tailwind.config.js      NativeWind preset + design tokens
metro.config.js
babel.config.js
nativewind-env.d.ts
```

Path alias: `@/*` → project root.

## Theme tokens

Each palette in `constants/Colors.ts` exposes the same shape (`bg`, `card`,
`ink`, `ink2`, `ink3`, `rule`, plus `amber/hydro/red/green` × `* / *Soft / *Ink`).
Screens read these via `useTheme()`. Tailwind utility classes (`bg-amber`,
`text-hydro-ink`) reference the **default** palette only — for theme-driven
values, prefer inline `style={{ backgroundColor: t.amber }}`.

## Out of scope right now

- Watch and Act alert states (planned next)
- Real maps (currently a hand-drawn SVG)
- Real call dialing
- Real FloodLamp pairing / hardware integration
- Backend, auth, push notifications
- State / data libraries (Zustand, React Query, etc.)
- Tests
