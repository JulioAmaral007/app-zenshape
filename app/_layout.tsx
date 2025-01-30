import { AuthProvider } from '@/contexts/authContext'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

export default function Rootlayout() {
  return (
    <>
      <StatusBar style="light" />
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="(modals)/profileModal"
            options={{
              presentation: 'modal',
            }}
          />

          <Stack.Screen
            name="(modals)/workoutModal"
            options={{
              presentation: 'modal',
            }}
          />
        </Stack>
      </AuthProvider>
    </>
  )
}
