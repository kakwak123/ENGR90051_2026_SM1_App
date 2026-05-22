import { Ionicons } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable, View } from 'react-native';

import { useT } from '@/lib/i18n';
import { useTheme } from '@/lib/profile';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];
type TabIconProps = { color: string; size: number };

function makeTabIcon(name: IoniconName) {
  function TabIcon({ color, size }: TabIconProps) {
    return <Ionicons name={name} color={color} size={size} />;
  }
  TabIcon.displayName = `TabIcon(${name})`;
  return TabIcon;
}

const HomeIcon = makeTabIcon('home-outline');
const RiverIcon = makeTabIcon('water-outline');
const StreetIcon = makeTabIcon('grid-outline');
const LampIcon = makeTabIcon('bulb-outline');
const CallIcon = makeTabIcon('call-outline');

function HeaderAvatar() {
  const theme = useTheme();
  return (
    <Link href="/settings" asChild>
      <Pressable hitSlop={12} style={{ marginRight: 16 }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: '#D9D9D9',
            borderWidth: theme.ruleAlpha === 1 ? 2 : 0,
            borderColor: theme.ink,
          }}
        />
      </Pressable>
    </Link>
  );
}

export default function TabsLayout() {
  const t = useT();
  const theme = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.ink,
        tabBarInactiveTintColor: theme.ink3,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.ruleAlpha === 1 ? theme.ink : theme.rule,
          borderTopWidth: theme.ruleAlpha === 1 ? 2 : 0.5,
        },
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 11,
        },
        headerStyle: { backgroundColor: theme.bg },
        headerShadowVisible: false,
        headerTitle: '',
        headerRight: () => <HeaderAvatar />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: t('tab.home'), tabBarIcon: HomeIcon }}
      />
      <Tabs.Screen
        name="river"
        options={{ title: t('tab.river'), tabBarIcon: RiverIcon }}
      />
      <Tabs.Screen
        name="street"
        options={{ title: t('tab.street'), tabBarIcon: StreetIcon }}
      />
      <Tabs.Screen name="lamp" options={{ title: t('tab.lamp'), tabBarIcon: LampIcon }} />
      <Tabs.Screen name="call" options={{ title: t('tab.call'), tabBarIcon: CallIcon }} />
    </Tabs>
  );
}
