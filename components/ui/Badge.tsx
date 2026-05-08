import { Text, View } from 'react-native';

export type BadgeTone = 'primary' | 'danger' | 'warning' | 'safe' | 'neutral';

export type BadgeProps = {
  children: React.ReactNode;
  tone?: BadgeTone;
};

const TONE: Record<BadgeTone, string> = {
  primary: 'bg-primary',
  danger: 'bg-danger',
  warning: 'bg-warning',
  safe: 'bg-safe',
  neutral: 'bg-slate-500',
};

export function Badge({ children, tone = 'primary' }: BadgeProps) {
  return (
    <View className={`self-start rounded-full px-3 py-1 ${TONE[tone]}`}>
      <Text className="text-xs font-semibold uppercase tracking-wide text-white">
        {children}
      </Text>
    </View>
  );
}
