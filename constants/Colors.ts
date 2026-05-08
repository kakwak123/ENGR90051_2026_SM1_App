export const Colors = {
  primary: "#0369a1",
  danger: "#dc2626",
  warning: "#d97706",
  safe: "#16a34a",
  slate50: "#f8fafc",
  slate900: "#0f172a",
} as const;

export type ColorName = keyof typeof Colors;
