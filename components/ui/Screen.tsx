import { ScrollView, View } from 'react-native';

export type ScreenProps = {
  children: React.ReactNode;
  /** Center content vertically + horizontally. Useful for placeholder/empty states. */
  center?: boolean;
  /** Wrap children in a ScrollView. */
  scroll?: boolean;
  /** Override the default padding (p-6). */
  className?: string;
};

const BASE = 'flex-1 bg-slate-50';

export function Screen({ children, center, scroll, className }: ScreenProps) {
  const layout = center ? 'items-center justify-center' : '';
  const padding = className ?? 'p-6';
  const classes = `${BASE} ${layout} ${padding}`.trim();

  if (scroll) {
    return (
      <ScrollView
        className={BASE}
        contentContainerClassName={`${layout} ${padding}`.trim()}
      >
        {children}
      </ScrollView>
    );
  }

  return <View className={classes}>{children}</View>;
}
