import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

import { Body } from '@/components/ui/Body';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SerifTitle } from '@/components/ui/SerifTitle';
import { LANGUAGES, useT } from '@/lib/i18n';
import { useProfile, useTheme } from '@/lib/profile';

export default function Settings() {
  const t = useTheme();
  const tr = useT();
  const { profile, reset } = useProfile();
  const F = (n: number) => Math.round(n * t.scale);

  const langLabel =
    LANGUAGES.find((l) => l.code === profile.language)?.native ?? 'English';

  const rows: { l: string; v: string }[] = [
    {
      l: tr('settings.row.textsize'),
      v:
        profile.textSize === 'default'
          ? 'Default'
          : profile.textSize === 'large'
            ? 'Larger'
            : 'X-Large',
    },
    {
      l: tr('settings.row.palette'),
      v:
        profile.palette === 'default'
          ? 'Default'
          : profile.palette === 'hc'
            ? 'High contrast · CB-safe'
            : 'CB-safe',
    },
    { l: tr('settings.row.language'), v: langLabel },
    { l: tr('settings.row.readaloud'), v: profile.readAloud ? tr('on') : tr('off') },
    { l: tr('settings.row.simplify'), v: profile.simplify ? tr('on') : tr('off') },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerStyle: { backgroundColor: t.bg },
          headerShadowVisible: false,
          headerTintColor: t.ink,
        }}
      />
      <ScrollView
        style={{ flex: 1, backgroundColor: t.bg }}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      >
        <Eyebrow>{tr('settings.head')}</Eyebrow>
        <View style={{ marginTop: 4 }}>
          <SerifTitle size="xl">{tr('settings.title')}</SerifTitle>
        </View>
        <Body
          tone="muted"
          style={{ fontSize: F(12), marginTop: 6, lineHeight: F(12) * 1.4 }}
        >
          {tr('settings.sub')}
        </Body>

        <Card style={{ marginTop: F(14), padding: 0, overflow: 'hidden' }}>
          {rows.map((r, i) => (
            <View
              key={r.l}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                paddingHorizontal: F(14),
                paddingVertical: F(13),
                borderBottomWidth:
                  i < rows.length - 1 ? (t.ruleAlpha === 1 ? 1 : 0.5) : 0,
                borderBottomColor: t.ruleAlpha === 1 ? t.ink : t.rule,
              }}
            >
              <Body style={{ flex: 1, fontSize: F(13), fontWeight: '700', color: t.ink }}>
                {r.l}
              </Body>
              <Body style={{ fontSize: F(13), color: t.ink2, fontWeight: '700' }}>
                {r.v}
              </Body>
              <Body tone="muted" style={{ fontSize: F(16), marginLeft: 6 }}>
                ›
              </Body>
            </View>
          ))}
        </Card>

        <Pressable
          onPress={() => router.push('/access')}
          style={{
            marginTop: F(12),
            backgroundColor: t.ink,
            borderRadius: t.radius,
            paddingVertical: F(13),
            alignItems: 'center',
          }}
        >
          <Body style={{ color: '#fff', fontSize: F(14), fontWeight: '700' }}>
            Edit preferences
          </Body>
        </Pressable>

        <Pressable
          onPress={() => {
            reset();
            router.replace('/welcome');
          }}
          style={{
            marginTop: F(8),
            paddingVertical: F(12),
            alignItems: 'center',
          }}
        >
          <Body tone="muted" style={{ fontSize: F(12) }}>
            Restart onboarding
          </Body>
        </Pressable>

        {__DEV__ && (
          <View style={{ marginTop: F(28) }}>
            <Eyebrow>{tr('simulate.dev.eyebrow')}</Eyebrow>
            <Pressable
              onPress={() => router.push('/simulate-evacuate')}
              style={{
                marginTop: F(8),
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: F(14),
                paddingVertical: F(13),
                borderWidth: t.ruleAlpha === 1 ? 1.5 : 1,
                borderColor: t.amber,
                borderRadius: t.radius,
              }}
            >
              <Body style={{ flex: 1, fontSize: F(13), fontWeight: '700', color: t.ink }}>
                {tr('simulate.dev.row')}
              </Body>
              <Body tone="muted" style={{ fontSize: F(16) }}>
                ›
              </Body>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </>
  );
}
