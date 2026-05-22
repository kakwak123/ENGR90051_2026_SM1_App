import { View } from 'react-native';

import { useTheme } from '@/lib/profile';

export function StepDots({ i, n }: { i: number; n: number }) {
  const t = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: 6 }}>
      {[...Array(n)].map((_, k) => (
        <View
          key={k}
          style={{
            width: k === i ? 20 : 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: k <= i ? t.ink : '#D6D3CB',
          }}
        />
      ))}
    </View>
  );
}
