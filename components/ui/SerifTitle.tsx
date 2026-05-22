import { Text, type TextStyle } from 'react-native';

import { useTheme } from '@/lib/profile';

export type SerifTitleProps = {
  children: React.ReactNode;
  size?: 'lg' | 'xl' | '2xl';
  color?: string;
};

const SIZE = { lg: 24, xl: 32, '2xl': 42 } as const;

/**
 * Display headline in Instrument Serif.
 * Used for the page hero on every screen ("All clear.", "Calm.", etc.).
 */
export function SerifTitle({ children, size = 'xl', color }: SerifTitleProps) {
  const t = useTheme();
  const style: TextStyle = {
    color: color ?? t.ink,
    fontSize: Math.round(SIZE[size] * t.scale),
    lineHeight: Math.round(SIZE[size] * t.scale * 1.0),
    letterSpacing: -0.5,
  };
  return (
    <Text className="font-serif" style={style}>
      {children}
    </Text>
  );
}
