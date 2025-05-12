import { auth } from '@/config/firebase'
import { AuthProvider } from '@/contexts/authContext'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'

export default function Rootlayout() {
  useEffect(() => {
    // Garante que o Firebase Auth seja inicializado
    if (!auth) {
      console.error('Firebase Auth não foi inicializado corretamente')
    }
  }, [])

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

          <Stack.Screen
            name="(modals)/exerciseModal"
            options={{
              presentation: 'modal',
            }}
          />
        </Stack>
      </AuthProvider>
    </>
  )
}
