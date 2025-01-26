import { CustomTabs } from '@/components/CustomTabs'
import { Tabs } from 'expo-router'

export default function AppLayout() {
  return (
    <Tabs tabBar={CustomTabs}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  )
}
