import { ScrollView, View } from 'react-native';
import Svg, { Line, Path, Text as SvgText } from 'react-native-svg';

import { Body } from '@/components/ui/Body';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SerifTitle } from '@/components/ui/SerifTitle';
import { useT } from '@/lib/i18n';
import { useTheme } from '@/lib/profile';

export default function HomeScreen() {
  const t = useTheme();
  const tr = useT();
  const F = (n: number) => Math.round(n * t.scale);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.bg }}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <View style={{ marginBottom: F(14) }}>
        <Eyebrow>{tr('home.location')}</Eyebrow>
        <View style={{ marginTop: 4 }}>
          <SerifTitle size="2xl">{tr('home.headline.calm')}</SerifTitle>
        </View>
      </View>

      {/* River card */}
      <Card style={{ padding: 0, overflow: 'hidden', marginBottom: F(10) }}>
        <View
          style={{
            backgroundColor: t.ruleAlpha === 1 ? t.card : t.hydroSoft,
            paddingHorizontal: F(18),
            paddingVertical: F(16),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Eyebrow tone="hydro">{tr('home.river.title')}</Eyebrow>
            <Body tone="muted" className="font-mono" style={{ fontSize: 10 }}>
              MARIBYRNONG · UPSTREAM
            </Body>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              gap: 8,
              marginTop: F(8),
            }}
          >
            <SerifTitle size="2xl" color={t.ink}>
              2.4
            </SerifTitle>
            <Body tone="muted" style={{ fontSize: F(16) }}>
              m
            </Body>
            <View style={{ flex: 1 }} />
            <Body
              style={{
                fontSize: F(12),
                color: t.green,
                fontWeight: '700',
              }}
            >
              ▼ 0.1m · 24h
            </Body>
          </View>
          <Svg viewBox="0 0 280 60" width="100%" height={60} style={{ marginTop: F(10) }}>
            <Path
              d="M0 30 L40 28 L80 34 L120 31 L160 22 L200 26 L240 30 L280 33"
              fill="none"
              stroke={t.hydro}
              strokeWidth={t.ruleAlpha === 1 ? 3 : 2}
            />
            <Path
              d="M0 30 L40 28 L80 34 L120 31 L160 22 L200 26 L240 30 L280 33 L280 60 L0 60 Z"
              fill={t.hydro}
              fillOpacity={t.ruleAlpha === 1 ? 0.18 : 0.12}
            />
            <Line
              x1="0"
              y1="10"
              x2="280"
              y2="10"
              stroke={t.red}
              strokeDasharray="3,3"
              strokeWidth={t.ruleAlpha === 1 ? 1.5 : 1}
            />
            <SvgText
              x="278"
              y="8"
              fontSize="9"
              textAnchor="end"
              fill={t.red}
              fontFamily="IBMPlexMono_400Regular"
            >
              FLOOD · 3.8m
            </SvgText>
          </Svg>
        </View>
      </Card>

      {/* Street row */}
      <Card style={{ marginBottom: F(10) }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: F(8),
          }}
        >
          <Body style={{ fontSize: F(15), fontWeight: '700', color: t.ink }}>
            {tr('home.street.title')}
          </Body>
          <View
            style={{
              backgroundColor: t.greenSoft,
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 6,
              borderWidth: t.ruleAlpha === 1 ? 1.5 : 0,
              borderColor: t.greenInk,
            }}
          >
            <Body
              style={{
                fontSize: 10,
                fontWeight: '700',
                color: t.greenInk,
                letterSpacing: 0.4,
              }}
            >
              {tr('home.street.tag.calm')}
            </Body>
          </View>
        </View>
        {t.simplify ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              paddingVertical: 8,
            }}
          >
            <View
              style={{
                width: F(20),
                height: F(20),
                borderRadius: F(10),
                backgroundColor: t.green,
                borderWidth: 2,
                borderColor: t.ink,
              }}
            />
            <Body style={{ fontSize: F(15), fontWeight: '700', color: t.ink }}>
              {tr('home.street.risk')}
            </Body>
          </View>
        ) : (
          <View>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              {[...Array(12)].map((_, i) => (
                <View
                  key={i}
                  style={{
                    flex: 1,
                    height: F(22),
                    backgroundColor: t.greenSoft,
                    borderRadius: 3,
                  }}
                />
              ))}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: F(8),
              }}
            >
              <Body tone="muted" style={{ fontSize: F(11) }}>
                {tr('home.street.monitored')}
              </Body>
              <Body tone="muted" className="font-mono" style={{ fontSize: F(11) }}>
                {tr('home.street.risk')}
              </Body>
            </View>
          </View>
        )}
      </Card>

      {/* Bag + Buddy */}
      <View style={{ flexDirection: 'row', gap: F(10), marginBottom: F(10) }}>
        <Card style={{ flex: 1, padding: F(14) }}>
          <Eyebrow>{tr('home.bag')}</Eyebrow>
          <Body
            style={{ fontSize: F(20), fontWeight: '800', color: t.ink, marginTop: 4 }}
          >
            {tr('home.bag.state')}
          </Body>
          <Body
            style={{ fontSize: F(11), color: t.green, marginTop: 2, fontWeight: '700' }}
          >
            {tr('home.bag.sub')}
          </Body>
        </Card>
        <Card style={{ flex: 1, padding: F(14) }}>
          <Eyebrow>{tr('home.buddy')}</Eyebrow>
          <Body
            style={{ fontSize: F(20), fontWeight: '800', color: t.ink, marginTop: 4 }}
          >
            Maya L.
          </Body>
          <Body tone="muted" style={{ fontSize: F(11), marginTop: 2 }}>
            {tr('home.buddy.sub')}
          </Body>
        </Card>
      </View>

      {/* Read-aloud control */}
      {t.readAloud && (
        <Card style={{ padding: F(14), marginBottom: F(10) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View
              style={{
                width: F(36),
                height: F(36),
                borderRadius: 8,
                backgroundColor: t.amberSoft,
                borderWidth: t.ruleAlpha === 1 ? 2 : 0,
                borderColor: t.ink,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Body style={{ fontSize: F(18), color: t.amberInk }}>🔊</Body>
            </View>
            <View style={{ flex: 1 }}>
              <Body style={{ fontSize: F(14), fontWeight: '700', color: t.ink }}>
                {tr('home.listen')}
              </Body>
              <Body tone="muted" style={{ fontSize: F(11) }}>
                20 sec · natural voice
              </Body>
            </View>
            <Body style={{ fontSize: F(20), color: t.amber, fontWeight: '800' }}>▸</Body>
          </View>
        </Card>
      )}
    </ScrollView>
  );
}
