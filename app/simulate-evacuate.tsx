import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Body } from '@/components/ui/Body';
import { SerifTitle } from '@/components/ui/SerifTitle';
import { useT } from '@/lib/i18n';
import { useTheme } from '@/lib/profile';

// Act-state palette. Lives here pending a future t.act* token set in lib/profile.tsx.
const actDark = {
  bg: '#1A0E08',
  ink: '#FFFFFF',
  inkDim: 'rgba(255,255,255,0.72)',
  inkMuted: 'rgba(255,255,255,0.55)',
  amber: '#F7C948',
  amberSoft: 'rgba(247,201,72,0.10)',
  amberTrack: 'rgba(247,201,72,0.22)',
  red: '#E5484D',
  redSoft: 'rgba(229,72,77,0.10)',
};

const TOTAL_SECONDS = 30 * 60;

export default function SimulateEvacuate() {
  const t = useTheme();
  const tr = useT();
  const insets = useSafeAreaInsets();
  const F = (n: number) => Math.round(n * t.scale);
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const minutesLabel = Math.ceil(secondsLeft / 60);
  const progress = Math.max(secondsLeft / TOTAL_SECONDS, 0);

  const onCannotLeave = () => {
    Alert.alert(tr('simulate.confirm.title'), tr('simulate.confirm.msg'), [
      { text: tr('simulate.confirm.cancel'), style: 'cancel' },
      {
        text: tr('simulate.confirm.send'),
        style: 'destructive',
        onPress: () => router.back(),
      },
    ]);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1, backgroundColor: actDark.bg }}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: insets.top + F(8),
            paddingBottom: insets.bottom + F(28),
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Top bar */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              marginBottom: F(24),
            }}
          >
            <Body
              className="font-mono"
              style={{
                fontSize: F(11),
                color: actDark.amber,
                letterSpacing: 1.4,
                fontWeight: '700',
              }}
            >
              {tr('simulate.topbar')}
            </Body>
            <Pressable
              onPress={() => router.back()}
              hitSlop={16}
              accessibilityRole="button"
              accessibilityLabel="Close simulation"
              style={{ position: 'absolute', right: 0, padding: 4 }}
            >
              <Ionicons name="close" size={F(22)} color={actDark.inkDim} />
            </Pressable>
          </View>

          {/* Status row */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginBottom: F(8),
            }}
          >
            <View
              style={{
                width: F(8),
                height: F(8),
                borderRadius: F(4),
                backgroundColor: actDark.amber,
              }}
            />
            <Body
              className="font-mono"
              style={{
                fontSize: F(11),
                color: actDark.amber,
                letterSpacing: 1.2,
                fontWeight: '800',
              }}
            >
              {tr('simulate.eyebrow')}
            </Body>
          </View>

          {/* Headline */}
          <SerifTitle size="2xl" color={actDark.ink}>
            {tr('simulate.headline.lead')}
          </SerifTitle>
          <View style={{ marginTop: F(2) }}>
            <SerifTitle size="2xl" color={actDark.amber}>
              {tr('simulate.headline.window')}
            </SerifTitle>
          </View>

          {/* Sub */}
          <Body
            style={{
              fontSize: F(14),
              color: actDark.inkDim,
              marginTop: F(12),
              lineHeight: F(14) * 1.4,
            }}
          >
            {tr('simulate.sub')}
          </Body>

          {/* Countdown card */}
          <View
            style={{
              marginTop: F(22),
              borderWidth: 2,
              borderColor: actDark.amber,
              borderRadius: 14,
              paddingVertical: F(16),
              paddingHorizontal: F(18),
              flexDirection: 'row',
              alignItems: 'center',
              gap: F(12),
              backgroundColor: actDark.amberSoft,
            }}
          >
            <SerifTitle size="2xl" color={actDark.amber}>
              {minutesLabel}
            </SerifTitle>
            <Body
              style={{
                fontSize: F(13),
                color: actDark.ink,
                fontWeight: '700',
              }}
            >
              {tr('simulate.countdown.unit')}
            </Body>
            <View style={{ flex: 1 }} />
            <View
              style={{
                width: F(110),
                height: F(6),
                backgroundColor: actDark.amberTrack,
                borderRadius: F(3),
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  width: `${progress * 100}%`,
                  height: '100%',
                  backgroundColor: actDark.amber,
                }}
              />
            </View>
          </View>

          {/* Buddy card */}
          <View
            style={{
              marginTop: F(14),
              borderRadius: 14,
              padding: F(14),
              flexDirection: 'row',
              alignItems: 'center',
              gap: F(12),
              backgroundColor: 'rgba(255,255,255,0.06)',
            }}
          >
            <View
              style={{
                width: F(42),
                height: F(42),
                borderRadius: F(21),
                backgroundColor: '#E8E5DD',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Body style={{ fontSize: F(13), fontWeight: '800', color: '#3A2A1F' }}>
                ML
              </Body>
            </View>
            <View style={{ flex: 1 }}>
              <Body style={{ fontSize: F(15), fontWeight: '800', color: actDark.ink }}>
                {tr('simulate.buddy.headline')}
              </Body>
              <Body style={{ fontSize: F(12), color: actDark.inkDim, marginTop: 2 }}>
                {tr('simulate.buddy.sub')}
              </Body>
            </View>
          </View>

          {/* Primary CTA */}
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            style={({ pressed }) => ({
              marginTop: F(20),
              backgroundColor: actDark.amber,
              borderRadius: 14,
              paddingVertical: F(16),
              alignItems: 'center',
              opacity: pressed ? 0.85 : 1,
            })}
          >
            <Body style={{ fontSize: F(16), fontWeight: '800', color: '#1A0E08' }}>
              {tr('simulate.cta.leaving')}
            </Body>
          </Pressable>

          {/* Secondary CTA */}
          <Pressable
            onPress={onCannotLeave}
            accessibilityRole="button"
            style={({ pressed }) => ({
              marginTop: F(10),
              borderWidth: 1.5,
              borderColor: actDark.red,
              borderRadius: 14,
              paddingVertical: F(12),
              alignItems: 'center',
              backgroundColor: actDark.redSoft,
              opacity: pressed ? 0.85 : 1,
            })}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View
                style={{
                  backgroundColor: actDark.red,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 4,
                }}
              >
                <Body
                  className="font-mono"
                  style={{
                    fontSize: F(9),
                    fontWeight: '800',
                    color: '#fff',
                    letterSpacing: 0.6,
                  }}
                >
                  SOS
                </Body>
              </View>
              <Body style={{ fontSize: F(15), fontWeight: '800', color: actDark.ink }}>
                {tr('simulate.cta.cannot.title')}
              </Body>
            </View>
            <Body style={{ fontSize: F(12), color: actDark.inkDim, marginTop: 2 }}>
              {tr('simulate.cta.cannot.sub')}
            </Body>
          </Pressable>
        </ScrollView>
      </View>
    </>
  );
}
