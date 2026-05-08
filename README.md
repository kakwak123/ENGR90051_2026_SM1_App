# ENGR90051 — Maribyrnong Flood Resilience App

Capstone mobile app for flood resilience in the Maribyrnong area. Supports residents
before, during, and after flood events: alerts, flood map, community reports,
preparedness checklists, and personalised risk info.

> Status: **scaffold only** — no feature logic yet.

## Stack

| Tool                         | Version                   |
| ---------------------------- | ------------------------- |
| Expo SDK                     | ~54.0.33                  |
| Expo Router                  | ~6.0.23                   |
| React Native                 | 0.81.5                    |
| React                        | 19.1.0                    |
| NativeWind                   | ^4.1.23 (4.2.x installed) |
| Tailwind CSS                 | ^3.4.17                   |
| TypeScript                   | ~5.9.2 (strict mode)      |
| React Native Reanimated      | ~4.1.1                    |
| React Native Gesture Handler | ~2.28.0                   |

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

## Folder map

```
app/                    Expo Router routes (file-based)
  (tabs)/
    _layout.tsx         Tab navigator + Ionicons
    index.tsx           Home / Alerts (placeholder)
    map.tsx             Flood map (placeholder)
    report.tsx          Community reports (placeholder)
    prepare.tsx         Preparedness checklists (placeholder)
    profile.tsx         Profile & settings (placeholder)
  _layout.tsx           Root layout — imports global.css, mounts GestureHandlerRootView
  +not-found.tsx        404 route
components/
  ui/                   Buttons, Cards, Text primitives
constants/
  Colors.ts             Tailwind-aligned palette (primary/danger/warning/safe)
hooks/                  Reusable hooks (currently empty)
lib/                    Helpers, types, future API clients
assets/
  images/               App icons, splash, favicon
  fonts/                Custom fonts (currently empty — system default)
global.css              Tailwind directives — imported by root layout
tailwind.config.js      NativeWind preset + theme palette
metro.config.js         withNativeWind wrapper
babel.config.js         babel-preset-expo with jsxImportSource: 'nativewind'
nativewind-env.d.ts     NativeWind type augmentation
```

Path alias: `@/*` is mapped to project root in `tsconfig.json`.

## Theme palette

Defined in both `constants/Colors.ts` and `tailwind.config.js`:

| Token   | Hex       | Use                    |
| ------- | --------- | ---------------------- |
| primary | `#0369a1` | Brand / nav / links    |
| danger  | `#dc2626` | Active flood alerts    |
| warning | `#d97706` | Watch / advisory state |
| safe    | `#16a34a` | Cleared / safe state   |

Use as `bg-primary`, `text-danger`, `border-warning`, etc.

## Out of scope (for this scaffold)

No real feature logic, no state management library, no backend/Supabase/Firebase,
no custom fonts, no tests.
