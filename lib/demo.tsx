import { createContext, useCallback, useContext, useMemo, useState } from 'react';

/**
 * Demo-only alert-state context. Lets the dev cycler in Home flip the whole
 * app between calm/watch/act looks without any real alert pipeline.
 * Not persisted — resets on app launch.
 */

export type AlertState = 'calm' | 'watch' | 'act';

export const ALERT_ORDER: AlertState[] = ['calm', 'watch', 'act'];

type DemoContextValue = {
  state: AlertState;
  setState: (s: AlertState) => void;
  cycle: () => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AlertState>('calm');
  const cycle = useCallback(() => {
    setState((prev) => {
      const idx = ALERT_ORDER.indexOf(prev);
      return ALERT_ORDER[(idx + 1) % ALERT_ORDER.length];
    });
  }, []);

  const value = useMemo(() => ({ state, setState, cycle }), [state, cycle]);
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemoState() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error('useDemoState must be used within DemoStateProvider');
  return ctx;
}

/**
 * Convenience: tone keyword for the current state. Maps onto theme tones.
 */
export function toneFor(state: AlertState): 'green' | 'amber' | 'red' {
  return state === 'calm' ? 'green' : state === 'watch' ? 'amber' : 'red';
}
