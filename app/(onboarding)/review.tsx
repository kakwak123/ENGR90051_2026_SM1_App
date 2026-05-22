import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Body } from '@/components/ui/Body';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SerifTitle } from '@/components/ui/SerifTitle';
import { StepDots } from '@/components/ui/StepDots';
import { LANGUAGES, useT } from '@/lib/i18n';
import { useProfile, useTheme } from '@/lib/profile';

export default function Review() {
  const t = useTheme();
  const tr = useT();
  const { profile, update } = useProfile();
  const langLabel =
    LANGUAGES.find((l) => l.code === profile.language)?.native ?? 'English';

  function finish() {
    update({ completedOnboarding: true });
    router.replace('/(tabs)');
  }

  const rows: { l: string; v: string }[] = [
    {
      l: 'Type',
      v:
        profile.textSize === 'default'
          ? 'Default'
          : profile.textSize === 'large'
            ? 'Larger'
            : 'X-Large',
    },
    {
      l: 'Colour',
      v:
        profile.palette === 'default'
          ? 'Default'
          : profile.palette === 'hc'
            ? 'High contrast'
            : 'CB-safe',
    },
    { l: 'Read in', v: langLabel },
    { l: 'Aloud', v: profile.readAloud ? 'On' : 'Off' },
    { l: 'Simpler', v: profile.simplify ? 'On' : 'Off' },
  ];

  return (
    <View style={{ flex: 1, paddingHorizontal: 22, paddingTop: 70, paddingBottom: 40 }}>
      <StepDots i={4} n={5} />
      <View style={{ marginTop: 24 }}>
        <Eyebrow>{tr('onb.review.step')}</Eyebrow>
      </View>
      <View style={{ marginTop: 8 }}>
        <SerifTitle size="xl">{tr('onb.review.title')}</SerifTitle>
      </View>

      {/* Mini live preview */}
      <View
        style={{
          marginTop: 18,
          backgroundColor: t.bg,
          borderRadius: 14,
          padding: 14,
          borderWidth: 1,
          borderColor: t.rule,
        }}
      >
        <Eyebrow>{tr('home.location')}</Eyebrow>
        <View style={{ marginTop: 2 }}>
          <SerifTitle size="lg" color={t.ink}>
            {tr('home.headline.calm')}
          </SerifTitle>
        </View>
        <View
          style={{
            marginTop: 10,
            backgroundColor: t.card,
            borderRadius: t.radius / 1.5,
            padding: 10,
            borderWidth: t.ruleAlpha === 1 ? 2 : 0,
            borderColor: t.ink,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Eyebrow tone="hydro">{tr('home.river.title')}</Eyebrow>
            <Body className="font-mono" tone="muted" style={{ fontSize: 9 }}>
              2.4 m · ▼
            </Body>
          </View>
        </View>
      </View>

      {/* Summary rows */}
      <View style={{ marginTop: 14, gap: 10 }}>
        {rows.map((r) => (
          <View
            key={r.l}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <Eyebrow>{r.l}</Eyebrow>
            <Body style={{ fontSize: 13, color: t.ink, fontWeight: '700' }}>{r.v}</Body>
          </View>
        ))}
      </View>

      <View style={{ flex: 1 }} />
      <Pressable
        onPress={finish}
        style={{
          backgroundColor: t.ink,
          borderRadius: 14,
          paddingVertical: 16,
          alignItems: 'center',
          marginTop: 18,
        }}
      >
        <Body style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>
          {tr('onb.review.finish')}
        </Body>
      </Pressable>
      <Pressable
        onPress={() => router.back()}
        style={{ paddingVertical: 8, alignItems: 'center', marginTop: 6 }}
      >
        <Body tone="muted" style={{ fontSize: 12 }}>
          {tr('onb.review.tweak')}
        </Body>
      </Pressable>
    </View>
  );
}
