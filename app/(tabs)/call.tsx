import { Pressable, ScrollView, View } from 'react-native';

import { Body } from '@/components/ui/Body';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SerifTitle } from '@/components/ui/SerifTitle';
import { useT } from '@/lib/i18n';
import { useTheme } from '@/lib/profile';

export default function CallScreen() {
  const t = useTheme();
  const tr = useT();
  const F = (n: number) => Math.round(n * t.scale);

  const contacts = [
    { n: 'Maya L.', r: 'Neighbour · #12 Edgewater Bvd', d: '3 min walk' },
    { n: 'Sarah Chen', r: 'Daughter · Geelong', d: 'Phone' },
    { n: 'Dr. Patel', r: 'GP · Footscray', d: 'Phone' },
  ];

  const initials = (name: string) =>
    name
      .split(' ')
      .map((s) => s[0])
      .join('');

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.bg }}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Eyebrow>{tr('call.head')}</Eyebrow>
      <View style={{ marginTop: 4 }}>
        <SerifTitle size="xl">{tr('call.title')}</SerifTitle>
      </View>
      <Body tone="muted" style={{ fontSize: F(12), marginTop: 6 }}>
        {tr('call.sub')}
      </Body>

      <View style={{ marginTop: F(14), gap: F(8) }}>
        {contacts.map((c, i) => (
          <Card key={i} style={{ padding: F(12) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: F(12) }}>
              <View
                style={{
                  width: F(40),
                  height: F(40),
                  borderRadius: F(20),
                  backgroundColor: '#E8E5DD',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: t.ruleAlpha === 1 ? 2 : 0,
                  borderColor: t.ink,
                }}
              >
                <Body style={{ fontSize: F(14), fontWeight: '700', color: t.ink2 }}>
                  {initials(c.n)}
                </Body>
              </View>
              <View style={{ flex: 1 }}>
                <Body style={{ fontSize: F(15), fontWeight: '700', color: t.ink }}>
                  {c.n}
                </Body>
                <Body tone="muted" style={{ fontSize: F(11) }}>
                  {c.r}
                </Body>
              </View>
              <Pressable
                style={{
                  width: F(38),
                  height: F(38),
                  borderRadius: F(19),
                  backgroundColor: t.green,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: t.ruleAlpha === 1 ? 2 : 0,
                  borderColor: t.ink,
                }}
              >
                <Body style={{ fontSize: F(16), color: '#fff' }}>📞</Body>
              </Pressable>
            </View>
          </Card>
        ))}

        {/* Emergency 000 */}
        <Card
          style={{
            padding: F(12),
            backgroundColor: t.redSoft,
            borderWidth: t.ruleAlpha === 1 ? 2 : 1.5,
            borderColor: t.red,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: F(12) }}>
            <View
              style={{
                width: F(40),
                height: F(40),
                borderRadius: F(20),
                backgroundColor: t.red,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Body style={{ fontSize: F(18), color: '#fff' }}>🚨</Body>
            </View>
            <View style={{ flex: 1 }}>
              <Body style={{ fontSize: F(15), fontWeight: '800', color: t.redInk }}>
                {tr('call.emergency')}
              </Body>
              <Body style={{ fontSize: F(11), color: t.redInk, opacity: 0.8 }}>
                {tr('call.emergency.sub')}
              </Body>
            </View>
            <Pressable
              style={{
                width: F(38),
                height: F(38),
                borderRadius: F(19),
                backgroundColor: t.red,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: t.ruleAlpha === 1 ? 2 : 0,
                borderColor: t.ink,
              }}
            >
              <Body style={{ fontSize: F(16), color: '#fff' }}>📞</Body>
            </Pressable>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
