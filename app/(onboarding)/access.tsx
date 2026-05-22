import { router } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

import { Body } from '@/components/ui/Body';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SerifTitle } from '@/components/ui/SerifTitle';
import { StepDots } from '@/components/ui/StepDots';
import { type PaletteName } from '@/constants/Colors';
import { LANGUAGES, useT } from '@/lib/i18n';
import { type Language, type TextSize, useProfile, useTheme } from '@/lib/profile';

export default function Access() {
  const t = useTheme();
  const tr = useT();
  const { profile, update } = useProfile();

  const sizes: { key: TextSize; label: string; px: number }[] = [
    { key: 'default', label: tr('onb.access.size.default'), px: 14 },
    { key: 'large', label: tr('onb.access.size.large'), px: 18 },
    { key: 'xlarge', label: tr('onb.access.size.xlarge'), px: 24 },
  ];

  const palettes: { key: PaletteName; label: string; sw: string[] }[] = [
    {
      key: 'default',
      label: tr('onb.access.palette.default'),
      sw: ['#E8803A', '#3077C9', '#D23B2E', '#2FA36A'],
    },
    {
      key: 'hc',
      label: tr('onb.access.palette.hc'),
      sw: ['#FFB000', '#0050C7', '#C5170E', '#0E6B3A'],
    },
    {
      key: 'cb-safe',
      label: tr('onb.access.palette.cb'),
      sw: ['#FFB000', '#0050C7', '#000000', '#FFFFFF'],
    },
  ];

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 70, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <StepDots i={2} n={5} />
      <View style={{ marginTop: 24 }}>
        <Eyebrow>{tr('onb.access.step')}</Eyebrow>
      </View>
      <View style={{ marginTop: 8 }}>
        <SerifTitle size="xl">{tr('onb.access.title')}</SerifTitle>
      </View>
      <Body tone="muted" style={{ fontSize: 13, marginTop: 8, lineHeight: 18 }}>
        {tr('onb.access.sub')}
      </Body>

      {/* Text size */}
      <View style={{ marginTop: 22 }}>
        <Eyebrow>{tr('onb.access.section.text')}</Eyebrow>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
          {sizes.map((s) => {
            const sel = profile.textSize === s.key;
            return (
              <Pressable
                key={s.key}
                onPress={() => update({ textSize: s.key })}
                style={{
                  flex: 1,
                  backgroundColor: t.card,
                  borderWidth: sel ? 2 : 1,
                  borderColor: sel ? t.ink : t.rule,
                  borderRadius: 12,
                  paddingVertical: 12,
                  alignItems: 'center',
                }}
              >
                <Body style={{ fontSize: s.px, fontWeight: '700', color: t.ink }}>
                  Aa
                </Body>
                <Body
                  tone="muted"
                  style={{
                    fontSize: 10,
                    fontWeight: '700',
                    letterSpacing: 0.4,
                    textTransform: 'uppercase',
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </Body>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Palette */}
      <View style={{ marginTop: 22 }}>
        <Eyebrow>{tr('onb.access.section.colour')}</Eyebrow>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
          {palettes.map((p) => {
            const sel = profile.palette === p.key;
            return (
              <Pressable
                key={p.key}
                onPress={() => update({ palette: p.key })}
                style={{
                  flex: 1,
                  backgroundColor: t.card,
                  borderWidth: sel ? 2 : 1,
                  borderColor: sel ? t.ink : t.rule,
                  borderRadius: 12,
                  paddingVertical: 10,
                  paddingHorizontal: 8,
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <View style={{ flexDirection: 'row', gap: 3 }}>
                  {p.sw.map((c, j) => (
                    <View
                      key={j}
                      style={{
                        width: 10,
                        height: 14,
                        backgroundColor: c,
                        borderWidth: c === '#FFFFFF' ? 1 : 0,
                        borderColor: '#000',
                      }}
                    />
                  ))}
                </View>
                <Body
                  tone="muted"
                  style={{
                    fontSize: 9.5,
                    fontWeight: '700',
                    letterSpacing: 0.4,
                    textTransform: 'uppercase',
                  }}
                >
                  {p.label}
                </Body>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Language */}
      <View style={{ marginTop: 22 }}>
        <Eyebrow>{tr('onb.access.section.read')}</Eyebrow>
        <View style={{ marginTop: 8, gap: 8 }}>
          {LANGUAGES.map((l) => {
            const sel = profile.language === l.code;
            return (
              <Pressable
                key={l.code}
                onPress={() => update({ language: l.code as Language })}
                style={{
                  backgroundColor: t.card,
                  borderWidth: sel ? 2 : 1,
                  borderColor: sel ? t.ink : t.rule,
                  borderRadius: 12,
                  padding: 14,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <View
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 9,
                    borderWidth: 2,
                    borderColor: sel ? t.ink : t.ink3,
                    backgroundColor: sel ? t.ink : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {sel && (
                    <View
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: '#fff',
                      }}
                    />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Body style={{ fontSize: 14, fontWeight: '700', color: t.ink }}>
                    {l.native} · {l.label}
                  </Body>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Helpful extras */}
      <View style={{ marginTop: 22 }}>
        <Eyebrow>{tr('onb.access.section.extras')}</Eyebrow>
        <View style={{ marginTop: 8, gap: 8 }}>
          <Toggle
            label={tr('onb.access.toggle.readaloud')}
            sub={tr('onb.access.toggle.readaloud.sub')}
            on={profile.readAloud}
            onPress={() => update({ readAloud: !profile.readAloud })}
          />
          <Toggle
            label={tr('onb.access.toggle.simplify')}
            sub={tr('onb.access.toggle.simplify.sub')}
            on={profile.simplify}
            onPress={() => update({ simplify: !profile.simplify })}
          />
        </View>
      </View>

      <Pressable
        onPress={() => router.push('/buddy')}
        style={{
          backgroundColor: t.ink,
          borderRadius: 14,
          paddingVertical: 16,
          alignItems: 'center',
          marginTop: 24,
        }}
      >
        <Body style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>
          {tr('onb.continue')}
        </Body>
      </Pressable>
    </ScrollView>
  );
}

function Toggle({
  label,
  sub,
  on,
  onPress,
}: {
  label: string;
  sub: string;
  on: boolean;
  onPress: () => void;
}) {
  const t = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: t.card,
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: t.rule,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <View style={{ flex: 1 }}>
        <Body style={{ fontSize: 14, fontWeight: '700', color: t.ink }}>{label}</Body>
        <Body tone="muted" style={{ fontSize: 11, marginTop: 1 }}>
          {sub}
        </Body>
      </View>
      <View
        style={{
          width: 42,
          height: 24,
          borderRadius: 12,
          backgroundColor: on ? t.ink : '#D6D0C0',
          padding: 2,
        }}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: '#fff',
            marginLeft: on ? 18 : 0,
          }}
        />
      </View>
    </Pressable>
  );
}
