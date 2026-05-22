import { Text, type TextStyle } from 'react-native';

import { useTheme } from '@/lib/profile';

export type EyebrowProps = {
  children: React.ReactNode;
  tone?: 'muted' | 'amber' | 'hydro' | 'red' | 'green';
};

/**
 * Mono uppercase label used as a section heading throughout the design.
 * Example: "OAK STREET, BRISBANE" or "STEP 3 OF 5".
 */
export function Eyebrow({ children, tone = 'muted' }: EyebrowProps) {
  const t = useTheme();
  const colorMap = {
    muted: t.ink3,
    amber: t.amberInk,
    hydro: t.hydroInk,
    red: t.redInk,
    green: t.greenInk,
  } as const;
  const style: TextStyle = {
    color: colorMap[tone],
    fontSize: Math.round(11 * t.scale),
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  };
  return (
    <Text className="font-mono" style={style}>
      {children}
    </Text>
  );
}
