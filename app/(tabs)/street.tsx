import { useState } from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';

import { Body } from '@/components/ui/Body';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SerifTitle } from '@/components/ui/SerifTitle';
import { useT } from '@/lib/i18n';
import { useTheme } from '@/lib/profile';

type HomeStatus = 'ready' | 'prep' | 'help' | 'none';
type Home = { n: string; o: string; s: HomeStatus; m: string; you?: boolean };

const HOMES: Home[] = [
  { n: '2', o: 'Wong', s: 'ready', m: 'At home' },
  { n: '4', o: 'Kovač', s: 'ready', m: 'At home' },
  { n: '6', o: 'Pereira', s: 'ready', m: 'At home' },
  { n: '8', o: 'Singh', s: 'ready', m: 'At home' },
  { n: '10', o: 'Tran', s: 'ready', m: 'At home' },
  { n: '12', o: 'Maya L.', s: 'ready', m: 'Your buddy' },
  { n: '14', o: 'You', s: 'ready', m: 'At home', you: true },
  { n: '16', o: 'Hassan', s: 'ready', m: 'At home' },
  { n: '18', o: 'Brown', s: 'ready', m: 'At home' },
  { n: '20', o: 'Liu', s: 'ready', m: 'At home' },
  { n: '22', o: 'Ahmadi', s: 'none', m: 'No reply' },
  { n: '24', o: 'Reid', s: 'none', m: 'No reply' },
];

export default function StreetScreen() {
  const t = useTheme();
  const tr = useT();
  const F = (n: number) => Math.round(n * t.scale);
  const [selected, setSelected] = useState<Home | null>(null);

  const colorFor = (s: HomeStatus) =>
    s === 'ready' ? t.green : s === 'prep' ? t.amber : s === 'help' ? t.red : '#C8C2B1';
  const labelFor = (s: HomeStatus) =>
    s === 'ready'
      ? tr('street.legend.ready')
      : s === 'prep'
        ? tr('street.legend.preparing')
        : s === 'help'
          ? tr('street.legend.help')
          : tr('street.legend.noreply');

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.bg }}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Eyebrow>{tr('home.location')}</Eyebrow>
      <View style={{ marginTop: 6 }}>
        <SerifTitle size="xl">{tr('street.title')}</SerifTitle>
      </View>
      <Body tone="muted" style={{ fontSize: F(12), marginTop: 6 }}>
        {tr('street.sub')}
      </Body>

      {/* Live block bar */}
      <Card style={{ marginTop: F(12), padding: F(13) }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: F(8),
          }}
        >
          <Body style={{ fontSize: F(13), fontWeight: '700', color: t.ink }}>
            {tr('street.live')}
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
        <View style={{ flexDirection: 'row', gap: 3 }}>
          {HOMES.map((h, i) => (
            <View
              key={i}
              style={{
                flex: 1,
                height: F(28),
                backgroundColor: colorFor(h.s),
                borderRadius: 3,
                borderWidth: h.you ? 2 : 0,
                borderColor: t.ink,
              }}
            />
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: F(6),
          }}
        >
          <Body className="font-mono" tone="muted" style={{ fontSize: F(9) }}>
            #2
          </Body>
          <Body className="font-mono" tone="muted" style={{ fontSize: F(9) }}>
            #14 ← {tr('street.you')}
          </Body>
          <Body className="font-mono" tone="muted" style={{ fontSize: F(9) }}>
            #24
          </Body>
        </View>
        <Body
          style={{ fontSize: F(12), color: t.ink2, marginTop: F(8), fontWeight: '700' }}
        >
          {tr('street.summary.calm')}
        </Body>
      </Card>

      {/* Legend */}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: F(10),
          marginTop: F(10),
        }}
      >
        {(['ready', 'prep', 'help', 'none'] as HomeStatus[]).map((s) => (
          <View key={s} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View
              style={{
                width: F(10),
                height: F(10),
                backgroundColor: colorFor(s),
                borderRadius: 2,
                borderWidth: t.ruleAlpha === 1 ? 1.5 : 0,
                borderColor: t.ink,
              }}
            />
            <Body style={{ fontSize: F(11), color: t.ink2, fontWeight: '700' }}>
              {labelFor(s)}
            </Body>
          </View>
        ))}
      </View>

      {/* Per-home list */}
      <View style={{ marginTop: F(14), marginBottom: F(6) }}>
        <Eyebrow>Per home</Eyebrow>
      </View>
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        {HOMES.map((h, i) => (
          <Pressable
            key={i}
            onPress={() => setSelected(h)}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: F(10),
              paddingHorizontal: F(13),
              paddingVertical: F(11),
              borderBottomWidth: i < HOMES.length - 1 ? (t.ruleAlpha === 1 ? 1 : 0.5) : 0,
              borderBottomColor: t.ruleAlpha === 1 ? t.ink : t.rule,
              backgroundColor: pressed
                ? t.ruleAlpha === 1
                  ? t.amberSoft
                  : 'rgba(0,0,0,0.04)'
                : h.you
                  ? t.ruleAlpha === 1
                    ? t.amberSoft
                    : 'rgba(232,128,58,0.06)'
                  : 'transparent',
            })}
          >
            <Body
              className="font-mono"
              style={{
                minWidth: F(26),
                fontSize: F(12),
                fontWeight: '800',
                color: t.ink,
              }}
            >
              {h.n}
            </Body>
            <View
              style={{
                width: F(10),
                height: F(34),
                backgroundColor: colorFor(h.s),
                borderRadius: 2,
                borderWidth: t.ruleAlpha === 1 ? 1.5 : 0,
                borderColor: t.ink,
              }}
            />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Body
                style={{
                  fontSize: F(13),
                  fontWeight: '700',
                  color: t.ink,
                }}
              >
                {h.o}
              </Body>
              <Body tone="muted" style={{ fontSize: F(11), marginTop: 1 }}>
                {h.m}
              </Body>
            </View>
            <Body
              style={{
                fontSize: F(10),
                color: colorFor(h.s),
                fontWeight: '800',
                letterSpacing: 0.4,
                textTransform: 'uppercase',
              }}
            >
              {labelFor(h.s)}
            </Body>
          </Pressable>
        ))}
      </Card>

      <Modal
        visible={selected !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setSelected(null)}
      >
        <Pressable
          onPress={() => setSelected(null)}
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
              paddingHorizontal: F(18),
              paddingTop: F(18),
              paddingBottom: F(28),
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: F(12) }}>
              <View
                style={{
                  width: F(14),
                  height: F(48),
                  backgroundColor: selected ? colorFor(selected.s) : 'transparent',
                  borderRadius: 3,
                }}
              />
              <View style={{ flex: 1 }}>
                <Eyebrow>#{selected?.n} · Edgewater Bvd</Eyebrow>
                <SerifTitle size="lg">{selected?.o ?? ''}</SerifTitle>
                <Body tone="muted" style={{ fontSize: F(12), marginTop: 2 }}>
                  {selected?.m}
                </Body>
              </View>
              <View
                style={{
                  backgroundColor: selected ? colorFor(selected.s) : 'transparent',
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 6,
                }}
              >
                <Body
                  style={{
                    fontSize: 10,
                    fontWeight: '800',
                    color: '#fff',
                    letterSpacing: 0.4,
                    textTransform: 'uppercase',
                  }}
                >
                  {selected ? labelFor(selected.s) : ''}
                </Body>
              </View>
            </View>

            <View style={{ flexDirection: 'row', gap: F(10), marginTop: F(18) }}>
              <Pressable
                onPress={() => setSelected(null)}
                style={({ pressed }) => ({
                  flex: 1,
                  paddingVertical: F(13),
                  backgroundColor: t.ink,
                  borderRadius: t.radius,
                  alignItems: 'center',
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <Body style={{ color: '#fff', fontSize: F(14), fontWeight: '800' }}>
                  {tr('street.sheet.message')}
                </Body>
              </Pressable>
              <Pressable
                onPress={() => setSelected(null)}
                style={({ pressed }) => ({
                  flex: 1,
                  paddingVertical: F(13),
                  borderWidth: 1.5,
                  borderColor: t.ink,
                  borderRadius: t.radius,
                  alignItems: 'center',
                  opacity: pressed ? 0.6 : 1,
                })}
              >
                <Body style={{ color: t.ink, fontSize: F(14), fontWeight: '800' }}>
                  {tr('street.sheet.call')}
                </Body>
              </Pressable>
            </View>

            <Body
              tone="muted"
              style={{ fontSize: F(11), marginTop: F(14), lineHeight: F(11) * 1.5 }}
            >
              {tr('street.sheet.note')}
            </Body>
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}
