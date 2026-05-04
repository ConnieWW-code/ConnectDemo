import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#1D9E75',
      headerShown: false,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Devices',
          tabBarIcon: ({ color }) => (
            <Ionicons name="bluetooth" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}