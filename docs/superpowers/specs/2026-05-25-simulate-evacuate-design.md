# Simulate Evacuation — Dev-Only Demo

**Date:** 2026-05-25
**Status:** Approved (pending user spec review)
**Scope:** UI-only dev simulation. No real alert APIs, push, or river-data integration.

## Purpose

Stand up a visual demo of the app's **Act / Evacuate** state so it can be shown
live (in-class, in stakeholder meetings, on a phone via the EAS dev build)
without waiting for the full alert pipeline. Today the Home tab only renders
the "calm" state; the Act-state mockup has never been built. CLAUDE.md flags
Act/Watch states as deferred — this spec carves out the minimum needed to
_demo_ the Act state behind a dev-only switch, not to ship it.

## Non-goals

- Real alert ingestion, push notifications, or river-data thresholds
- Persisting "evacuation in progress" state across app launches
- Escalation behaviour when the countdown reaches zero
- A user-visible (production) entry point — the trigger is dev-only
- Watch state, Lamp tweaks panel, or any other deferred surface

## Entry point — dev row in Settings

Add a new section at the bottom of `app/settings.tsx`, rendered **only when
React Native's `__DEV__` global is true**. The section contains:

- A mono `DEV` eyebrow (using the existing `<Eyebrow>` component)
- A single tappable row labelled `Simulate evacuation` with a chevron, styled
  consistently with the existing preference rows
- On press: `router.push('/simulate-evacuate')`

The dev section sits below "Restart onboarding" with extra top spacing so it
reads as a separate dev affordance, not a regular preference.

## New modal route — `app/simulate-evacuate.tsx`

A new file-routed screen at the project root level (same level as
`settings.tsx`, outside the `(tabs)` and `(onboarding)` groups). Presentation:

- `<Stack.Screen options={{ presentation: 'fullScreenModal', headerShown: false }} />`
- Status-bar style forced to `light` while mounted (dark background)
- A small close affordance (×) in the top-right safe area

### Visual structure (top → bottom)

1. **Top bar** — mono `§ ACT · EVACUATE` centered, muted amber
2. **Status row** — small filled amber dot + eyebrow `EVACUATE NOW`
3. **Headline** — serif, two lines: `Leave in the next` (white) /
   `30 minutes.` (amber, same line height)
4. **Sub-line** — `River will reach your street at 15:42.` (muted white)
5. **Countdown card** — amber-stroked rounded card (`borderWidth: 2`,
   `borderColor: amber`, dark fill). Contents: large serif numeral on the
   left, `min remaining` label, and a horizontal progress bar on the right
   that drains from full → empty as time passes.
6. **Buddy card** — softer dark fill, circular avatar with initials `ML`,
   headline `Maya is at your door.`, sub `Go with her. Take the orange bag.`
7. **Primary CTA** — solid amber pill, full width, label `I am leaving now ✓`
8. **Secondary CTA** — red-stroked outline pill with an inline SOS chip,
   two-line label `I cannot leave` / `Send help to my address`

### Local Act-state palette

The current `theme` (`lib/profile.tsx`) only models light surfaces. Rather
than threading Act-state tokens through all three palettes prematurely (a
larger change with no production caller yet), inline a local palette object
at the top of `simulate-evacuate.tsx`:

```ts
// Act-state palette. Lives here pending a future t.act* token set.
const actDark = {
  bg: '#1A0E08',
  ink: '#FFFFFF',
  inkDim: 'rgba(255,255,255,0.72)',
  inkMuted: 'rgba(255,255,255,0.55)',
  amber: '#F7C948',
  amberSoft: 'rgba(247,201,72,0.16)',
  red: '#E5484D',
  redSoft: 'rgba(229,72,77,0.14)',
};
```

A one-line comment explains its provenance. When/if a real Act state ships,
these constants will be hoisted into `constants/Colors.ts` and surfaced via
`useTheme()` — that migration is out of scope for this spec.

## Behaviour

### Countdown

- Initial value: **30 minutes** (1800 seconds), stored in component state
- Ticks down every 1 s via a single `setInterval` inside a `useEffect`; the
  interval is cleared on unmount and stops when the value reaches 0
- Displayed integer minutes = `Math.ceil(secondsRemaining / 60)`, so the
  card initially shows `30` and flips to `29` after the first whole minute
- Progress bar width = `secondsRemaining / 1800`, animated implicitly by
  per-second re-renders
- When seconds hit 0: stop the interval, leave the card showing `0` and a
  full-drained bar. No further behaviour — explicitly out of scope.

### Primary CTA — "I am leaving now"

`router.back()` — returns the user to Settings, which dismisses the modal.

### Secondary CTA — "I cannot leave"

Opens a native `Alert.alert` with:

- Title: `Send help to your address?`
- Message: short reminder copy
- Buttons: `Cancel` (no-op) and `Send` (which calls `router.back()`)

No real dispatch — this is a dev demo.

## i18n

All user-facing copy on the new screen goes through `useT()` from
`lib/i18n.ts`. New keys under the `simulate.*` namespace:

| Key                         | Purpose                                  |
| --------------------------- | ---------------------------------------- |
| `simulate.dev.row`          | "Simulate evacuation" (Settings row)     |
| `simulate.topbar`           | "§ ACT · EVACUATE"                       |
| `simulate.eyebrow`          | "EVACUATE NOW"                           |
| `simulate.headline.lead`    | "Leave in the next"                      |
| `simulate.headline.window`  | "30 minutes."                            |
| `simulate.sub`              | "River will reach your street at 15:42." |
| `simulate.countdown.unit`   | "min remaining"                          |
| `simulate.buddy.headline`   | "Maya is at your door."                  |
| `simulate.buddy.sub`        | "Go with her. Take the orange bag."      |
| `simulate.cta.leaving`      | "I am leaving now ✓"                     |
| `simulate.cta.cannot.title` | "I cannot leave"                         |
| `simulate.cta.cannot.sub`   | "Send help to my address"                |
| `simulate.confirm.title`    | "Send help to your address?"             |
| `simulate.confirm.msg`      | confirm body copy                        |
| `simulate.confirm.cancel`   | "Cancel"                                 |
| `simulate.confirm.send`     | "Send"                                   |

Each key must be added as a complete entry across all four languages
(`en`, `vi`, `zh`, `ga`) per the existing `Dict` shape.

## Files touched

- **Create:** `app/simulate-evacuate.tsx`
- **Modify:** `app/settings.tsx` (add dev section under `__DEV__`)
- **Modify:** `lib/i18n.ts` (new `simulate.*` keys × 4 languages)

No new dependencies. No changes to `tailwind.config.js`, `constants/Colors.ts`,
or `lib/profile.tsx`.

## Quality gates

- `npm run typecheck` passes
- `npm run lint` passes with 0 errors
- Manual verification by the user (per CLAUDE.md, type/lint passing ≠ UI
  working) on at least one platform: `npm run web` or the new EAS dev build
- Verify the dev row is absent in a production build by inspecting it under
  `EXPO_PUBLIC_…` build (not blocking — `__DEV__` is the React Native
  guarantee)

## Open questions

None at spec-write time. If the Maya/buddy name should come from
`profile.buddyName` instead of a hard-coded string, raise during plan review.
