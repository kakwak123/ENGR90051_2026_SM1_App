import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Body } from '@/components/ui/Body';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SerifTitle } from '@/components/ui/SerifTitle';
import { toneFor, useDemoState } from '@/lib/demo';
import { useT } from '@/lib/i18n';
import { useTheme } from '@/lib/profile';

/**
 * Pretend "live" river readings keyed by demo state. The refresh handler
 * picks a small perturbation around the baseline so the gauge nudges
 * on every pull.
 */
const BASE: Record<
  'calm' | 'watch' | 'act',
  { lvl: number; now: number; future: number }
> = {
  calm: { lvl: 22, now: 1.4, future: 1.4 },
  watch: { lvl: 55, now: 3.1, future: 3.5 },
  act: { lvl: 82, now: 3.7, future: 4.1 },
};

export default function RiverScreen() {
  const t = useTheme();
  const tr = useT();
  const { state } = useDemoState();
  const F = (n: number) => Math.round(n * t.scale);
  const tone = toneFor(state);

  const baseline = BASE[state];
  const [now, setNow] = useState(baseline.now);
  const [future, setFuture] = useState(baseline.future);
  const [refreshing, setRefreshing] = useState(false);

  const fill = useSharedValue(baseline.lvl);
  useEffect(() => {
    fill.value = withTiming(baseline.lvl, { duration: 700 });
    setNow(baseline.now);
    setFuture(baseline.future);
  }, [baseline.lvl, baseline.now, baseline.future, fill]);

  const fillStyle = useAnimatedStyle(() => ({ height: `${fill.value}%` }));

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      const jitter = (cap: number) => (Math.random() - 0.5) * cap;
      const newLvl = Math.max(5, Math.min(95, baseline.lvl + jitter(20)));
      const newNow = Math.max(0, baseline.now + jitter(0.4));
      const newFuture = Math.max(0, baseline.future + jitter(0.5));
      fill.value = withTiming(newLvl, { duration: 700 });
      setNow(Number(newNow.toFixed(1)));
      setFuture(Number(newFuture.toFixed(1)));
      setRefreshing(false);
    }, 700);
  };

  const verdictKey: 'river.verdict.calm' = 'river.verdict.calm';
  const noteKey: 'river.note.calm' = 'river.note.calm';
  const verdictColor = state === 'act' ? t.red : state === 'watch' ? t.amber : t.green;
  const futureColor = state === 'act' ? t.red : state === 'watch' ? t.amber : t.green;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.bg }}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={t.hydro}
        />
      }
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
        <Animated.View
          style={[
            {
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: t.hydro,
            },
            fillStyle,
          ]}
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
          backgroundColor: t[`${tone}Soft` as 'greenSoft'],
          borderWidth: t.ruleAlpha === 1 ? 2 : 1.5,
          borderColor: verdictColor,
          borderRadius: t.radius,
        }}
      >
        <SerifTitle size="lg" color={t[`${tone}Ink` as 'greenInk']}>
          {tr(verdictKey)}
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
              {now.toFixed(1)}
              <Body tone="muted" style={{ fontSize: F(13) }}>
                {' '}
                m
              </Body>
            </Body>
          </View>
          <View style={{ flex: 1, padding: F(14) }}>
            <Eyebrow>{tr('river.future')}</Eyebrow>
            <Body
              style={{
                fontSize: F(24),
                fontWeight: '800',
                color: futureColor,
                marginTop: 2,
              }}
            >
              {future.toFixed(1)}
              <Body tone="muted" style={{ fontSize: F(13) }}>
                {' '}
                m
              </Body>
            </Body>
          </View>
        </View>
        <View style={{ padding: F(12), backgroundColor: t.bg }}>
          <Body style={{ fontSize: F(13), fontWeight: '700', color: t.ink2 }}>
            {tr(noteKey)}
          </Body>
          <Body tone="muted" style={{ fontSize: F(11), marginTop: 1 }}>
            {tr('river.refresh.hint')}
          </Body>
        </View>
      </Card>
    </ScrollView>
  );
}
