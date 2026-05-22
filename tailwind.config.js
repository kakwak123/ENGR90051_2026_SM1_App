/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Paper / surface
        paper: '#F4F1EA',
        'paper-2': '#EAE6DB',
        ios: '#F2F2F7',

        // Ink (text)
        ink: '#0A0A0C',
        'ink-2': '#3A3A3C',
        'ink-3': '#6B6B70',

        // Rule (borders)
        rule: '#D6D0C0',

        // Hydro (river / informational)
        hydro: '#3077C9',
        'hydro-soft': '#D7E6F6',
        'hydro-ink': '#1F4F8A',

        // Amber (watch / preparing)
        amber: '#E8803A',
        'amber-soft': '#FFE7D1',
        'amber-ink': '#9A4A14',

        // Red (act / danger)
        red: '#D23B2E',
        'red-soft': '#FBDAD6',
        'red-ink': '#8C1F18',

        // Green (calm / safe)
        green: '#2FA36A',
        'green-soft': '#D6EFDF',
        'green-ink': '#1A6A42',

        // Aliases retained from earlier scaffold
        primary: '#3077C9',
        danger: '#D23B2E',
        warning: '#E8803A',
        safe: '#2FA36A',
      },
      fontFamily: {
        serif: ['InstrumentSerif_400Regular', 'serif'],
        mono: ['IBMPlexMono_400Regular', 'monospace'],
      },
    },
  },
  plugins: [],
};
