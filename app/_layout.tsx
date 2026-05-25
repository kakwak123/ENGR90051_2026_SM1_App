import '@/global.css';

import {
  IBMPlexMono_400Regular,
  IBMPlexMono_500Medium,
} from '@expo-google-fonts/ibm-plex-mono';
import { InstrumentSerif_400Regular } from '@expo-google-fonts/instrument-serif';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ProfileProvider, useProfile } from '@/lib/profile';

SplashScreen.preventAutoHideAsync().catch(() => {});

/**
 * Routing gate: send users to /welcome if they haven't finished onboarding,
 * and out of the onboarding stack once they have.
 */
function RouteGate() {
  const { hydrated, profile } = useProfile();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) return;
    const inOnboarding = segments[0] === '(onboarding)';
    if (!profile.completedOnboarding && !inOnboarding) {
      router.replace('/welcome');
    } else if (profile.completedOnboarding && inOnboarding) {
      router.replace('/(tabs)');
    }
  }, [hydrated, profile.completedOnboarding, segments, router]);

  return null;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    InstrumentSerif_400Regular,
    IBMPlexMono_400Regular,
    IBMPlexMono_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ProfileProvider>
        <RouteGate />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="settings"
            options={{ headerShown: true, presentation: 'modal' }}
          />
          <Stack.Screen
            name="simulate-evacuate"
            options={{ presentation: 'fullScreenModal' }}
          />
          <Stack.Screen name="+not-found" options={{ title: 'Not found' }} />
        </Stack>
        <StatusBar style="auto" />
      </ProfileProvider>
    </GestureHandlerRootView>
  );
}
