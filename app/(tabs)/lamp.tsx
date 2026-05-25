import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { Body } from '@/components/ui/Body';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SerifTitle } from '@/components/ui/SerifTitle';
import { toneFor, useDemoState } from '@/lib/demo';
import { useT } from '@/lib/i18n';
import { useTheme } from '@/lib/profile';

type Choice = { label: string; value: string };

const SOUND_CHOICES: Choice[] = [
  { label: 'Off', value: 'Off' },
  { label: 'Soft · 50 dB', value: 'Soft · 50 dB' },
  { label: 'On · 70 dB', value: 'On · 70 dB' },
  { label: 'Loud · 85 dB', value: 'Loud · 85 dB' },
];
const WAKE_CHOICES: Choice[] = [
  { label: 'Anytime', value: 'Anytime' },
  { label: '5:30 — 23:00', value: '5:30 — 23:00' },
  { label: '6:00 — 22:00', value: '6:00 — 22:00' },
  { label: '7:00 — 21:00', value: '7:00 — 21:00' },
];
const BATTERY_CHOICES: Choice[] = [
  { label: 'Show days', value: 'Charged · 14 days' },
  { label: 'Show percent', value: 'Charged · 96%' },
  { label: 'Hidden', value: 'Hidden' },
];

export default function LampScreen() {
  const t = useTheme();
  const tr = useT();
  const { state } = useDemoState();
  const F = (n: number) => Math.round(n * t.scale);
  const tone = toneFor(state);
  const lampColor = t[tone];

  const [sound, setSound] = useState(SOUND_CHOICES[2].value);
  const [wake, setWake] = useState(WAKE_CHOICES[1].value);
  const [battery, setBattery] = useState(BATTERY_CHOICES[0].value);

  const [sheet, setSheet] = useState<null | {
    title: string;
    opts: Choice[];
    pick: (v: string) => void;
  }>(null);

  const [flashing, setFlashing] = useState(false);

  // Breathing animation — soft pulse 1.0 -> 1.18 -> 1.0 over ~3.2s, looping.
  const pulse = useSharedValue(1);
  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.18, { duration: 1600, easing: Easing.inOut(Easing.quad) }),
        withTiming(1, { duration: 1600, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, [pulse]);
  const orbStyle = useAnimatedStyle(() => ({ transform: [{ scale: pulse.value }] }));

  const triggerTest = () => {
    setFlashing(true);
    setTimeout(() => setFlashing(false), 1200);
  };

  const stateCopyKey: 'lamp.state.calm' = 'lamp.state.calm';
  const whyCopyKey: 'lamp.why.calm' = 'lamp.why.calm';
  const stateLabel = flashing ? tr('lamp.test.flashing') : tr(stateCopyKey);
  const whyLabel = tr(whyCopyKey);

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
              width: F(84),
              height: F(84),
              borderRadius: F(42),
              backgroundColor: (flashing ? t.amber : lampColor) + '22',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Animated.View
              style={[
                {
                  width: F(48),
                  height: F(48),
                  borderRadius: F(24),
                  backgroundColor: flashing ? t.amber : lampColor,
                  shadowColor: flashing ? t.amber : lampColor,
                  shadowRadius: F(24),
                  shadowOpacity: 0.9,
                  shadowOffset: { width: 0, height: 0 },
                },
                orbStyle,
              ]}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Body
              className="font-mono"
              style={{
                fontSize: F(10),
                fontWeight: '800',
                color: flashing ? t.amber : lampColor,
                letterSpacing: 0.4,
              }}
            >
              ● {stateLabel}
            </Body>
            <Body
              style={{
                fontSize: F(15),
                fontWeight: '700',
                color: t.ink,
                marginTop: 2,
              }}
            >
              {whyLabel}
            </Body>
            <Body tone="muted" style={{ fontSize: F(11), marginTop: 1 }}>
              {state === 'act'
                ? 'Loud pulses · take action.'
                : state === 'watch'
                  ? 'Amber breath · prepare to leave.'
                  : 'No action needed.'}
            </Body>
          </View>
        </View>
      </Card>

      <Pressable
        onPress={triggerTest}
        accessibilityRole="button"
        style={({ pressed }) => ({
          marginTop: F(10),
          backgroundColor: t.amber,
          borderRadius: t.radius,
          paddingVertical: F(12),
          alignItems: 'center',
          opacity: pressed ? 0.85 : 1,
        })}
      >
        <Body style={{ color: '#fff', fontSize: F(14), fontWeight: '800' }}>
          💡 {tr('lamp.test')}
        </Body>
      </Pressable>

      {/* Settings rows */}
      <Card style={{ marginTop: F(12), padding: 0, overflow: 'hidden' }}>
        {(
          [
            {
              l: tr('lamp.row.sound'),
              v: sound,
              icon: '🔊',
              opts: SOUND_CHOICES,
              pick: setSound,
            },
            {
              l: tr('lamp.row.wake'),
              v: wake,
              icon: '🌙',
              opts: WAKE_CHOICES,
              pick: setWake,
            },
            {
              l: tr('lamp.row.battery'),
              v: battery,
              icon: '🔋',
              opts: BATTERY_CHOICES,
              pick: setBattery,
            },
          ] as const
        ).map((r, i) => (
          <Pressable
            key={i}
            onPress={() => setSheet({ title: r.l, opts: [...r.opts], pick: r.pick })}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              paddingHorizontal: F(14),
              paddingVertical: F(12),
              borderBottomWidth: i < 2 ? (t.ruleAlpha === 1 ? 1 : 0.5) : 0,
              borderBottomColor: t.ruleAlpha === 1 ? t.ink : t.rule,
              opacity: pressed ? 0.65 : 1,
            })}
          >
            <Body style={{ fontSize: F(14) }}>{r.icon}</Body>
            <Body style={{ flex: 1, fontSize: F(13), fontWeight: '700', color: t.ink }}>
              {r.l}
            </Body>
            <Body style={{ fontSize: F(13), color: t.ink2 }}>{r.v}</Body>
            <Body tone="muted" style={{ fontSize: F(16) }}>
              ›
            </Body>
          </Pressable>
        ))}
      </Card>

      <Body
        tone="muted"
        style={{ fontSize: F(11), marginTop: F(10), lineHeight: F(11) * 1.5 }}
      >
        {tr('lamp.footer')}
      </Body>

      {/* Choice sheet */}
      <Modal
        visible={sheet !== null}
        animationType="slide"
        transparent
        onRequestClose={() => setSheet(null)}
      >
        <Pressable
          onPress={() => setSheet(null)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'flex-end',
          }}
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={{
              backgroundColor: t.bg,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingHorizontal: F(16),
              paddingTop: F(16),
              paddingBottom: F(28),
            }}
          >
            <Eyebrow>{sheet?.title}</Eyebrow>
            <View style={{ marginTop: F(10) }}>
              {sheet?.opts.map((opt, i) => (
                <Pressable
                  key={i}
                  onPress={() => {
                    sheet?.pick(opt.value);
                    setSheet(null);
                  }}
                  style={({ pressed }) => ({
                    paddingVertical: F(14),
                    borderBottomWidth: i < (sheet?.opts.length ?? 0) - 1 ? 0.5 : 0,
                    borderBottomColor: t.rule,
                    opacity: pressed ? 0.6 : 1,
                  })}
                >
                  <Body style={{ fontSize: F(15), fontWeight: '700', color: t.ink }}>
                    {opt.label}
                  </Body>
                </Pressable>
              ))}
            </View>
            <Pressable
              onPress={() => setSheet(null)}
              style={({ pressed }) => ({
                marginTop: F(12),
                paddingVertical: F(12),
                alignItems: 'center',
                opacity: pressed ? 0.6 : 1,
              })}
            >
              <Body tone="muted" style={{ fontSize: F(13) }}>
                {tr('lamp.choice.cancel')}
              </Body>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}
