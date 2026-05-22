import { View, type ViewStyle } from 'react-native';

export type CardProps = {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle | ViewStyle[];
};

/**
 * Default styling matches the design's white-card-with-shadow look. Override
 * via `style` for screens that need explicit padding / border / colour.
 */
const BASE = 'w-full rounded-2xl bg-white p-4 shadow-sm';

export function Card({ children, className, style }: CardProps) {
  return (
    <View className={`${BASE} ${className ?? ''}`.trim()} style={style}>
      {children}
    </View>
  );
}
