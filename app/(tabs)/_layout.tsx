import { Tabs } from 'expo-router'
import { History, Home } from 'lucide-react-native'

type TabBarIconProps = {
  color: string
  size: number
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'rgba(0, 0, 0, 1)',
        tabBarInactiveTintColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Главная',
          tabBarIcon: ({ color, size }: TabBarIconProps) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'История',
          tabBarIcon: ({ color, size }: TabBarIconProps) => <History size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}
