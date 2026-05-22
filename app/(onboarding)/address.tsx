import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

import { Body } from '@/components/ui/Body';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SerifTitle } from '@/components/ui/SerifTitle';
import { StepDots } from '@/components/ui/StepDots';
import { useT } from '@/lib/i18n';
import { useProfile, useTheme } from '@/lib/profile';

const ADDRESS = '14 Edgewater Boulevard, Maribyrnong VIC 3032';

export default function Address() {
  const t = useTheme();
  const tr = useT();
  const { update } = useProfile();

  function next() {
    update({ address: ADDRESS });
    router.push('/access');
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 22, paddingTop: 70, paddingBottom: 40 }}>
      <StepDots i={1} n={5} />
      <View style={{ marginTop: 24 }}>
        <Eyebrow>{tr('onb.address.step')}</Eyebrow>
      </View>
      <View style={{ marginTop: 8 }}>
        <SerifTitle size="xl">{tr('onb.address.title')}</SerifTitle>
      </View>
      <Body tone="muted" style={{ fontSize: 13, marginTop: 8, lineHeight: 18 }}>
        {tr('onb.address.sub')}
      </Body>

      <View style={{ marginTop: 22 }}>
        <Eyebrow>{tr('onb.address.label')}</Eyebrow>
        <View
          style={{
            marginTop: 6,
            backgroundColor: t.card,
            borderRadius: 12,
            padding: 14,
            borderWidth: 1,
            borderColor: t.ink,
          }}
        >
          <Body style={{ fontSize: 15, fontWeight: '700' }}>{ADDRESS}</Body>
        </View>
      </View>

      {/* Tiny map */}
      <View
        style={{
          marginTop: 14,
          height: 160,
          borderRadius: 12,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: t.rule,
        }}
      >
        <Svg width="100%" height="100%" viewBox="0 0 300 160" preserveAspectRatio="none">
          <Rect width="300" height="160" fill="#F0E8D8" />
          <Path d="M-20,90 Q70,40 160,80 T340,70 L340,160 L-20,160 Z" fill="#D7E6F6" />
          <Path
            d="M-20,90 Q70,40 160,80 T340,70"
            fill="none"
            stroke={t.hydro}
            strokeWidth="1.5"
          />
          <Line x1="0" y1="120" x2="300" y2="120" stroke="#C8C2B1" strokeWidth="0.8" />
          <Line x1="100" y1="0" x2="100" y2="120" stroke="#C8C2B1" strokeWidth="0.8" />
          <Line x1="200" y1="0" x2="200" y2="120" stroke="#C8C2B1" strokeWidth="0.8" />
          <Circle cx="168" cy="60" r="9" fill={t.amber} stroke="#fff" strokeWidth="2.5" />
        </Svg>
      </View>

      <View style={{ flex: 1 }} />
      <Pressable
        onPress={next}
        style={{
          backgroundColor: t.ink,
          borderRadius: 14,
          paddingVertical: 16,
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <Body style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>
          {tr('onb.address.confirm')}
        </Body>
      </Pressable>
    </View>
  );
}
