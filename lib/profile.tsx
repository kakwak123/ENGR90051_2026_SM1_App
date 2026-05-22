import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { type Palette, PALETTES, type PaletteName } from '@/constants/Colors';

/* ----------------------------- types ----------------------------- */

export type TextSize = 'default' | 'large' | 'xlarge';
export type Language = 'en' | 'vi' | 'zh' | 'ga';

export type Profile = {
  /** Set after the user finishes onboarding. Routing reads this. */
  completedOnboarding: boolean;
  address: string | null;
  buddy: string | null;
  textSize: TextSize;
  palette: PaletteName;
  language: Language;
  readAloud: boolean;
  simplify: boolean;
};

const DEFAULT_PROFILE: Profile = {
  completedOnboarding: false,
  address: null,
  buddy: null,
  textSize: 'default',
  palette: 'default',
  language: 'en',
  readAloud: false,
  simplify: false,
};

/**
 * Derived theme — what screens actually consume. Pure function of Profile.
 * Mirrors the design's `t` shape so screens read like the prototype.
 */
export type Theme = Palette & {
  scale: number;
  weight: number;
  radius: number;
  density: 'normal' | 'roomy';
  ruleAlpha: number;
  language: Language;
  readAloud: boolean;
  simplify: boolean;
};

const SCALE: Record<TextSize, number> = {
  default: 1,
  large: 1.15,
  xlarge: 1.3,
};

function deriveTheme(p: Profile): Theme {
  const palette = PALETTES[p.palette];
  const isHC = p.palette === 'hc';
  return {
    ...palette,
    scale: SCALE[p.textSize],
    weight: isHC ? 700 : 600,
    radius: isHC ? 8 : 16,
    density: p.simplify ? 'roomy' : 'normal',
    ruleAlpha: isHC ? 1 : 0.14,
    language: p.language,
    readAloud: p.readAloud,
    simplify: p.simplify,
  };
}

/* --------------------------- context ----------------------------- */

type ProfileContextValue = {
  profile: Profile;
  theme: Theme;
  hydrated: boolean;
  /** Merge a partial update; persists asynchronously. */
  update: (patch: Partial<Profile>) => void;
  /** Wipe everything (used by sign-out / restart-onboarding). */
  reset: () => void;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

const STORAGE_KEY = 'flood-app/profile/v1';

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) {
          try {
            setProfile({ ...DEFAULT_PROFILE, ...JSON.parse(raw) });
          } catch {
            // ignore corrupt payload
          }
        }
      })
      .finally(() => setHydrated(true));
  }, []);

  const update = useCallback((patch: Partial<Profile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...patch };
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setProfile(DEFAULT_PROFILE);
    AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
  }, []);

  const value = useMemo<ProfileContextValue>(
    () => ({
      profile,
      theme: deriveTheme(profile),
      hydrated,
      update,
      reset,
    }),
    [profile, hydrated, update, reset],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error('useProfile must be used inside <ProfileProvider>');
  }
  return ctx;
}

export function useTheme(): Theme {
  return useProfile().theme;
}
