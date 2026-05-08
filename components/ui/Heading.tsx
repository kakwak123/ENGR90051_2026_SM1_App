import { Text } from 'react-native';

export type HeadingLevel = 1 | 2 | 3;

export type HeadingProps = {
  children: React.ReactNode;
  level?: HeadingLevel;
  className?: string;
};

const LEVEL: Record<HeadingLevel, string> = {
  1: 'text-3xl font-bold text-slate-900',
  2: 'text-2xl font-bold text-slate-900',
  3: 'text-lg font-semibold text-slate-900',
};

export function Heading({ children, level = 2, className }: HeadingProps) {
  return <Text className={`${LEVEL[level]} ${className ?? ''}`.trim()}>{children}</Text>;
}
