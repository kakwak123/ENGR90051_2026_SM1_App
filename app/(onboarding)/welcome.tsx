import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Body } from '@/components/ui/Body';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SerifTitle } from '@/components/ui/SerifTitle';
import { StepDots } from '@/components/ui/StepDots';
import { useT } from '@/lib/i18n';
import { useTheme } from '@/lib/profile';

export default function Welcome() {
  const t = useTheme();
  const tr = useT();
  return (
    <View style={{ flex: 1, paddingHorizontal: 22, paddingTop: 70, paddingBottom: 40 }}>
      <StepDots i={0} n={5} />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Eyebrow tone="amber">{tr('onb.welcome.eyebrow')}</Eyebrow>
        <View style={{ marginTop: 10 }}>
          <SerifTitle size="2xl">{tr('onb.welcome.title')}</SerifTitle>
        </View>
        <Body style={{ marginTop: 14, lineHeight: 22 }}>{tr('onb.welcome.sub')}</Body>
      </View>
      <Pressable
        onPress={() => router.push('/address')}
        style={{
          backgroundColor: t.ink,
          borderRadius: 14,
          paddingVertical: 16,
          alignItems: 'center',
        }}
      >
        <Body style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>
          {tr('onb.welcome.start')}
        </Body>
      </Pressable>
      <Pressable style={{ paddingVertical: 10, alignItems: 'center', marginTop: 8 }}>
        <Body tone="muted" style={{ fontSize: 13 }}>
          {tr('onb.welcome.have')}
        </Body>
      </Pressable>
    </View>
  );
}
