import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { Colors } from '@/constants/Colors';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];
type TabIconProps = { color: string; size: number };

function makeTabIcon(name: IoniconName) {
  function TabIcon({ color, size }: TabIconProps) {
    return <Ionicons name={name} color={color} size={size} />;
  }
  TabIcon.displayName = `TabIcon(${name})`;
  return TabIcon;
}

const AlertsIcon = makeTabIcon('alert-circle-outline');
const MapIcon = makeTabIcon('map-outline');
const ReportIcon = makeTabIcon('megaphone-outline');
const PrepareIcon = makeTabIcon('list-outline');
const ProfileIcon = makeTabIcon('person-outline');

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#64748b',
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Alerts', tabBarIcon: AlertsIcon }} />
      <Tabs.Screen name="map" options={{ title: 'Map', tabBarIcon: MapIcon }} />
      <Tabs.Screen name="report" options={{ title: 'Report', tabBarIcon: ReportIcon }} />
      <Tabs.Screen
        name="prepare"
        options={{ title: 'Prepare', tabBarIcon: PrepareIcon }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile', tabBarIcon: ProfileIcon }}
      />
    </Tabs>
  );
}
