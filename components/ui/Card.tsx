import { View } from 'react-native';

export type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const BASE = 'w-full max-w-md rounded-2xl bg-white p-6 shadow-sm';

export function Card({ children, className }: CardProps) {
  return <View className={`${BASE} ${className ?? ''}`.trim()}>{children}</View>;
}
