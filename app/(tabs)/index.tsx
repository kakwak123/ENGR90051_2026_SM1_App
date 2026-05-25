import { router } from 'expo-router';
import { Alert, Pressable, ScrollView, View } from 'react-native';
import Svg, { Line, Path, Text as SvgText } from 'react-native-svg';

import { Body } from '@/components/ui/Body';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SerifTitle } from '@/components/ui/SerifTitle';
import { type AlertState, toneFor, useDemoState } from '@/lib/demo';
import { useT } from '@/lib/i18n';
import { useTheme } from '@/lib/profile';

const HERO_KEYS = {
  calm: 'home.headline.calm',
  watch: 'home.headline.watch',
  act: 'home.headline.act',
} as const;

const RIVER_VALUE: Record<AlertState, { level: string; trend: string }> = {
  calm: { level: '2.4', trend: '▼ 0.1m · 24h' },
  watch: { level: '3.1', trend: '▲ 0.4m · 6h' },
  act: { level: '3.7', trend: '▲ 0.9m · 2h' },
};

const STREET_TAG_KEY: Record<AlertState, string> = {
  calm: 'home.street.tag.calm',
  watch: 'home.street.tag.watch',
  act: 'home.street.tag.act',
};

const BAG_STATE_KEY: Record<AlertState, [string, string]> = {
  calm: ['home.bag.state', 'home.bag.sub'],
  watch: ['home.bag.state.watch', 'home.bag.sub.watch'],
  act: ['home.bag.state.act', 'home.bag.sub.act'],
};

const BUDDY_SUB_KEY: Record<AlertState, string> = {
  calm: 'home.buddy.sub',
  watch: 'home.buddy.sub.watch',
  act: 'home.buddy.sub.act',
};

export default function HomeScreen() {
  const t = useTheme();
  const tr = useT();
  const { state, cycle } = useDemoState();
  const F = (n: number) => Math.round(n * t.scale);
  const tone = toneFor(state);

  const heroColor = state === 'calm' ? t.ink : state === 'watch' ? t.amberInk : t.redInk;
  const river = RIVER_VALUE[state];
  const trendColor = state === 'act' ? t.red : state === 'watch' ? t.amber : t.green;
  const tagBg =
    state === 'calm' ? t.greenSoft : state === 'watch' ? t.amberSoft : t.redSoft;
  const tagInk =
    state === 'calm' ? t.greenInk : state === 'watch' ? t.amberInk : t.redInk;

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={{ marginBottom: F(14) }}>
          <Eyebrow>{tr('home.location')}</Eyebrow>
          <View style={{ marginTop: 4 }}>
            <SerifTitle size="2xl" color={heroColor}>
              {tr(HERO_KEYS[state] as 'home.headline.calm')}
            </SerifTitle>
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
                {river.level}
              </SerifTitle>
              <Body tone="muted" style={{ fontSize: F(16) }}>
                m
              </Body>
              <View style={{ flex: 1 }} />
              <Body
                style={{
                  fontSize: F(12),
                  color: trendColor,
                  fontWeight: '700',
                }}
              >
                {river.trend}
              </Body>
            </View>
            <Svg
              viewBox="0 0 280 60"
              width="100%"
              height={60}
              style={{ marginTop: F(10) }}
            >
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
                backgroundColor: tagBg,
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 6,
                borderWidth: t.ruleAlpha === 1 ? 1.5 : 0,
                borderColor: tagInk,
              }}
            >
              <Body
                style={{
                  fontSize: 10,
                  fontWeight: '700',
                  color: tagInk,
                  letterSpacing: 0.4,
                }}
              >
                {tr(STREET_TAG_KEY[state] as 'home.street.tag.calm')}
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
                  backgroundColor: t[tone],
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
                {[...Array(12)].map((_, i) => {
                  // For watch: 3 amber, rest green. For act: 5 red, 4 amber, rest green.
                  let blockColor = t.greenSoft;
                  if (state === 'watch' && i < 3) blockColor = t.amberSoft;
                  if (state === 'act') {
                    if (i < 5) blockColor = t.redSoft;
                    else if (i < 9) blockColor = t.amberSoft;
                  }
                  return (
                    <View
                      key={i}
                      style={{
                        flex: 1,
                        height: F(22),
                        backgroundColor: blockColor,
                        borderRadius: 3,
                      }}
                    />
                  );
                })}
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
              {tr(BAG_STATE_KEY[state][0] as 'home.bag.state')}
            </Body>
            <Body
              style={{
                fontSize: F(11),
                color: state === 'act' ? t.red : state === 'watch' ? t.amber : t.green,
                marginTop: 2,
                fontWeight: '700',
              }}
            >
              {tr(BAG_STATE_KEY[state][1] as 'home.bag.sub')}
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
              {tr(BUDDY_SUB_KEY[state] as 'home.buddy.sub')}
            </Body>
          </Card>
        </View>

        {/* Act-state CTA */}
        {state === 'act' && (
          <Pressable
            onPress={() => router.push('/simulate-evacuate')}
            style={({ pressed }) => ({
              marginTop: F(4),
              marginBottom: F(10),
              backgroundColor: t.red,
              borderRadius: t.radius,
              paddingVertical: F(14),
              alignItems: 'center',
              opacity: pressed ? 0.88 : 1,
            })}
          >
            <Body style={{ color: '#fff', fontSize: F(15), fontWeight: '800' }}>
              {tr('home.cta.act')}
            </Body>
          </Pressable>
        )}

        {/* Read-aloud control */}
        {t.readAloud && (
          <Pressable
            onPress={() =>
              Alert.alert(
                tr('home.listen'),
                'Voice playback is part of the next milestone.',
              )
            }
          >
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
                <Body style={{ fontSize: F(20), color: t.amber, fontWeight: '800' }}>
                  ▸
                </Body>
              </View>
            </Card>
          </Pressable>
        )}
      </ScrollView>

      {/* Dev state cycler */}
      {__DEV__ && (
        <Pressable
          onPress={cycle}
          accessibilityLabel="Cycle demo alert state"
          style={({ pressed }) => ({
            position: 'absolute',
            right: 16,
            bottom: 24,
            paddingHorizontal: 14,
            paddingVertical: 10,
            borderRadius: 999,
            backgroundColor: t.ink,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            opacity: pressed ? 0.85 : 1,
            shadowColor: '#000',
            shadowOpacity: 0.25,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 6,
          })}
        >
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: t[tone],
            }}
          />
          <Body
            className="font-mono"
            style={{
              fontSize: 10,
              fontWeight: '800',
              color: '#fff',
              letterSpacing: 1.4,
            }}
          >
            {tr('demo.cycler.label')} · {tr(`demo.cycler.${state}` as 'demo.cycler.calm')}
          </Body>
        </Pressable>
      )}
    </View>
  );
}
