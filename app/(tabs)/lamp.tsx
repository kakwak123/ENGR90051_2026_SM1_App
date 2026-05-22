import { Pressable, ScrollView, View } from 'react-native';

import { Body } from '@/components/ui/Body';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SerifTitle } from '@/components/ui/SerifTitle';
import { useT } from '@/lib/i18n';
import { useTheme } from '@/lib/profile';

export default function LampScreen() {
  const t = useTheme();
  const tr = useT();
  const F = (n: number) => Math.round(n * t.scale);
  const tone = t.green; // calm

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.bg }}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Eyebrow>{tr('lamp.head')}</Eyebrow>
      <View style={{ marginTop: 4 }}>
        <SerifTitle size="xl">{tr('lamp.connected')}</SerifTitle>
      </View>
      <Body
        tone="muted"
        style={{ fontSize: F(13), marginTop: 6, lineHeight: F(13) * 1.4 }}
      >
        {tr('lamp.sub')}
      </Body>

      {/* Live preview */}
      <Card style={{ marginTop: F(14) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: F(12) }}>
          <View
            style={{
              width: F(72),
              height: F(72),
              borderRadius: F(36),
              backgroundColor: tone + '22',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: F(42),
                height: F(42),
                borderRadius: F(21),
                backgroundColor: tone,
                shadowColor: tone,
                shadowRadius: F(20),
                shadowOpacity: 0.8,
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Body
              className="font-mono"
              style={{
                fontSize: F(10),
                fontWeight: '800',
                color: tone,
                letterSpacing: 0.4,
              }}
            >
              ● {tr('lamp.state.calm')}
            </Body>
            <Body
              style={{
                fontSize: F(15),
                fontWeight: '700',
                color: t.ink,
                marginTop: 2,
              }}
            >
              {tr('lamp.why.calm')}
            </Body>
            <Body tone="muted" style={{ fontSize: F(11), marginTop: 1 }}>
              No action needed.
            </Body>
          </View>
        </View>
      </Card>

      <Pressable
        style={{
          marginTop: F(10),
          backgroundColor: t.amber,
          borderRadius: t.radius,
          paddingVertical: F(12),
          alignItems: 'center',
        }}
      >
        <Body style={{ color: '#fff', fontSize: F(14), fontWeight: '800' }}>
          💡 {tr('lamp.test')}
        </Body>
      </Pressable>

      {/* Settings rows */}
      <Card style={{ marginTop: F(12), padding: 0, overflow: 'hidden' }}>
        {[
          { l: tr('lamp.row.sound'), v: tr('lamp.row.sound.value'), icon: '🔊' },
          { l: tr('lamp.row.wake'), v: tr('lamp.row.wake.value'), icon: '🌙' },
          { l: tr('lamp.row.battery'), v: tr('lamp.row.battery.value'), icon: '🔋' },
        ].map((r, i) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              paddingHorizontal: F(14),
              paddingVertical: F(12),
              borderBottomWidth: i < 2 ? (t.ruleAlpha === 1 ? 1 : 0.5) : 0,
              borderBottomColor: t.ruleAlpha === 1 ? t.ink : t.rule,
            }}
          >
            <Body style={{ fontSize: F(14) }}>{r.icon}</Body>
            <Body style={{ flex: 1, fontSize: F(13), fontWeight: '700', color: t.ink }}>
              {r.l}
            </Body>
            <Body style={{ fontSize: F(13), color: t.ink2 }}>{r.v}</Body>
            <Body tone="muted" style={{ fontSize: F(16) }}>
              ›
            </Body>
          </View>
        ))}
      </Card>

      <Body
        tone="muted"
        style={{ fontSize: F(11), marginTop: F(10), lineHeight: F(11) * 1.5 }}
      >
        {tr('lamp.footer')}
      </Body>
    </ScrollView>
  );
}
