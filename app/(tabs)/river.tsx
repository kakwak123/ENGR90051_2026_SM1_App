import { ScrollView, View } from 'react-native';

import { Body } from '@/components/ui/Body';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SerifTitle } from '@/components/ui/SerifTitle';
import { useT } from '@/lib/i18n';
import { useTheme } from '@/lib/profile';

export default function RiverScreen() {
  const t = useTheme();
  const tr = useT();
  const F = (n: number) => Math.round(n * t.scale);
  const lvl = 22; // calm

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.bg }}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Eyebrow>{tr('river.title')} · Avondale Heights</Eyebrow>
      <View style={{ marginTop: 6 }}>
        <SerifTitle size="2xl">{tr('river.calm')}</SerifTitle>
      </View>

      {/* Gauge */}
      <View
        style={{
          marginTop: F(12),
          height: F(180),
          backgroundColor: t.hydroSoft,
          borderWidth: t.ruleAlpha === 1 ? 2 : 1,
          borderColor: t.ruleAlpha === 1 ? t.ink : t.rule,
          borderRadius: t.radius,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: `${lvl}%`,
            backgroundColor: t.hydro,
          }}
        />
        {/* Street + Door markers */}
        <View
          style={{
            position: 'absolute',
            left: 10,
            bottom: '60%',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <View style={{ width: 24, height: 2, backgroundColor: t.ink }} />
          <Body
            className="font-mono"
            style={{
              fontSize: 10,
              fontWeight: '700',
              backgroundColor: t.card,
              paddingHorizontal: 5,
              paddingVertical: 1,
              borderWidth: 1.5,
              borderColor: t.ink,
              borderRadius: 3,
              color: t.ink,
              letterSpacing: 0.4,
            }}
          >
            STREET
          </Body>
        </View>
        <View
          style={{
            position: 'absolute',
            left: 10,
            bottom: '80%',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <View style={{ width: 24, height: 2, backgroundColor: t.red }} />
          <Body
            className="font-mono"
            style={{
              fontSize: 10,
              fontWeight: '700',
              backgroundColor: t.red,
              paddingHorizontal: 5,
              paddingVertical: 1,
              borderRadius: 3,
              color: '#fff',
              letterSpacing: 0.4,
            }}
          >
            YOUR DOOR
          </Body>
        </View>
      </View>

      {/* Verdict */}
      <View
        style={{
          marginTop: F(12),
          padding: F(14),
          backgroundColor: t.greenSoft,
          borderWidth: t.ruleAlpha === 1 ? 2 : 1.5,
          borderColor: t.green,
          borderRadius: t.radius,
        }}
      >
        <SerifTitle size="lg" color={t.greenInk}>
          {tr('river.verdict.calm')}
        </SerifTitle>
      </View>

      {/* Now / Future */}
      <Card style={{ marginTop: F(10), padding: 0, overflow: 'hidden' }}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: t.ruleAlpha === 1 ? 2 : 1,
            borderBottomColor: t.ruleAlpha === 1 ? t.ink : t.rule,
          }}
        >
          <View
            style={{
              flex: 1,
              padding: F(14),
              borderRightWidth: t.ruleAlpha === 1 ? 2 : 1,
              borderRightColor: t.ruleAlpha === 1 ? t.ink : t.rule,
            }}
          >
            <Eyebrow>{tr('river.now')}</Eyebrow>
            <Body
              style={{ fontSize: F(24), fontWeight: '800', color: t.ink, marginTop: 2 }}
            >
              1.4
              <Body tone="muted" style={{ fontSize: F(13) }}>
                {' '}
                m
              </Body>
            </Body>
          </View>
          <View style={{ flex: 1, padding: F(14) }}>
            <Eyebrow>{tr('river.future')}</Eyebrow>
            <Body
              style={{ fontSize: F(24), fontWeight: '800', color: t.green, marginTop: 2 }}
            >
              1.4
              <Body tone="muted" style={{ fontSize: F(13) }}>
                {' '}
                m
              </Body>
            </Body>
          </View>
        </View>
        <View style={{ padding: F(12), backgroundColor: t.bg }}>
          <Body style={{ fontSize: F(13), fontWeight: '700', color: t.ink2 }}>
            {tr('river.note.calm')}
          </Body>
          <Body tone="muted" style={{ fontSize: F(11), marginTop: 1 }}>
            {tr('river.ago')}
          </Body>
        </View>
      </Card>
    </ScrollView>
  );
}
