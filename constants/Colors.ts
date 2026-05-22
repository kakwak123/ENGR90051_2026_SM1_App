/**
 * Design tokens for the flood-resilience app.
 *
 * Mirrored in tailwind.config.js — keep in sync.
 *
 * Three palette variants are exported. The active palette is selected via the
 * accessibility profile (see lib/profile.tsx).
 */

export type PaletteName = 'default' | 'hc' | 'cb-safe';

export type Palette = {
  bg: string;
  card: string;
  ink: string;
  ink2: string;
  ink3: string;
  rule: string;
  amber: string;
  amberSoft: string;
  amberInk: string;
  hydro: string;
  hydroSoft: string;
  hydroInk: string;
  red: string;
  redSoft: string;
  redInk: string;
  green: string;
  greenSoft: string;
  greenInk: string;
};

export const PALETTES: Record<PaletteName, Palette> = {
  default: {
    bg: '#F2F2F7',
    card: '#FFFFFF',
    ink: '#0A0A0C',
    ink2: '#3A3A3C',
    ink3: '#6B6B70',
    rule: 'rgba(0,0,0,0.08)',
    amber: '#E8803A',
    amberSoft: '#FFE7D1',
    amberInk: '#9A4A14',
    hydro: '#3077C9',
    hydroSoft: '#D7E6F6',
    hydroInk: '#1F4F8A',
    red: '#D23B2E',
    redSoft: '#FBDAD6',
    redInk: '#8C1F18',
    green: '#2FA36A',
    greenSoft: '#D6EFDF',
    greenInk: '#1A6A42',
  },
  hc: {
    bg: '#FFFFFF',
    card: '#FFFFFF',
    ink: '#000000',
    ink2: '#000000',
    ink3: '#222222',
    rule: '#000000',
    amber: '#FFB000',
    amberSoft: '#FFE48A',
    amberInk: '#000000',
    hydro: '#0050C7',
    hydroSoft: '#CFE0FF',
    hydroInk: '#000000',
    red: '#C5170E',
    redSoft: '#FFD2CD',
    redInk: '#000000',
    green: '#0E6B3A',
    greenSoft: '#C2E4CC',
    greenInk: '#000000',
  },
  'cb-safe': {
    bg: '#F2F2F7',
    card: '#FFFFFF',
    ink: '#0A0A0C',
    ink2: '#3A3A3C',
    ink3: '#6B6B70',
    rule: 'rgba(0,0,0,0.08)',
    amber: '#FFB000',
    amberSoft: '#FFE48A',
    amberInk: '#7A4A00',
    hydro: '#0050C7',
    hydroSoft: '#CFE0FF',
    hydroInk: '#103770',
    red: '#000000',
    redSoft: '#E0E0E0',
    redInk: '#000000',
    green: '#0E6B3A',
    greenSoft: '#C2E4CC',
    greenInk: '#0E6B3A',
  },
};
