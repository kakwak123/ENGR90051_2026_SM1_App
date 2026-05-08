import { Text } from 'react-native';

export type BodyTone = 'default' | 'muted' | 'inverse';

export type BodyProps = {
  children: React.ReactNode;
  tone?: BodyTone;
  className?: string;
};

const TONE: Record<BodyTone, string> = {
  default: 'text-slate-900',
  muted: 'text-slate-600',
  inverse: 'text-white',
};

const BASE = 'text-base leading-6';

export function Body({ children, tone = 'default', className }: BodyProps) {
  return (
    <Text className={`${BASE} ${TONE[tone]} ${className ?? ''}`.trim()}>{children}</Text>
  );
}
