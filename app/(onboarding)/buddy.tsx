import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Body } from '@/components/ui/Body';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SerifTitle } from '@/components/ui/SerifTitle';
import { StepDots } from '@/components/ui/StepDots';
import { useT } from '@/lib/i18n';
import { useProfile, useTheme } from '@/lib/profile';

const PEOPLE = [
  { n: 'Maya L.', s: 'Neighbour · #12 Edgewater Bvd', dist: '3 min walk' },
  { n: 'Sarah Chen', s: 'Daughter · Geelong', dist: 'phone' },
  { n: 'Dr. Patel', s: 'GP · Footscray Medical', dist: 'phone' },
];

export default function Buddy() {
  const t = useTheme();
  const tr = useT();
  const { profile, update } = useProfile();
  const selected = profile.buddy ?? PEOPLE[0].n;

  function next() {
    update({ buddy: selected });
    router.push('/review');
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 22, paddingTop: 70, paddingBottom: 40 }}>
      <StepDots i={3} n={5} />
      <View style={{ marginTop: 24 }}>
        <Eyebrow>{tr('onb.buddy.step')}</Eyebrow>
      </View>
      <View style={{ marginTop: 8 }}>
        <SerifTitle size="xl">{tr('onb.buddy.title')}</SerifTitle>
      </View>
      <Body tone="muted" style={{ fontSize: 13, marginTop: 8, lineHeight: 18 }}>
        {tr('onb.buddy.sub')}
      </Body>

      <View style={{ marginTop: 18, gap: 10 }}>
        {PEOPLE.map((p) => {
          const sel = selected === p.n;
          return (
            <Pressable
              key={p.n}
              onPress={() => update({ buddy: p.n })}
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
                  width: 38,
                  height: 38,
                  borderRadius: 19,
                  backgroundColor: '#E8E5DD',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Body style={{ fontSize: 14, fontWeight: '700', color: t.ink2 }}>
                  {p.n
                    .split(' ')
                    .map((s) => s[0])
                    .join('')}
                </Body>
              </View>
              <View style={{ flex: 1 }}>
                <Body style={{ fontSize: 15, fontWeight: '700', color: t.ink }}>
                  {p.n}
                </Body>
                <Body tone="muted" style={{ fontSize: 11 }}>
                  {p.s}
                </Body>
              </View>
              <Body
                className="font-mono"
                tone="muted"
                style={{ fontSize: 10, letterSpacing: 0.4 }}
              >
                {p.dist}
              </Body>
            </Pressable>
          );
        })}
        <Pressable
          style={{
            borderWidth: 1.5,
            borderStyle: 'dashed',
            borderColor: t.ink3,
            borderRadius: 12,
            padding: 12,
            alignItems: 'center',
          }}
        >
          <Body tone="muted" style={{ fontSize: 13, fontWeight: '700' }}>
            + Add someone else
          </Body>
        </Pressable>
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
          {tr('onb.buddy.continue')}
        </Body>
      </Pressable>
    </View>
  );
}
