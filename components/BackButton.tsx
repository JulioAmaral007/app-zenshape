import { colors } from '@/constants/theme'
import type { BackButtonProps } from '@/types'
import { useRouter } from 'expo-router'
import { CaretLeft } from 'phosphor-react-native'
import { StyleSheet, TouchableOpacity } from 'react-native'

export function BackButton({ style, iconSize = 26 }: BackButtonProps) {
  const router = useRouter()

  return (
    <TouchableOpacity onPress={() => router.back()} style={[styles.button, style]}>
      <CaretLeft size={iconSize} color="#fff" weight="bold" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.neutral600,
    alignSelf: 'flex-start',
    borderRadius: 12,
    borderCurve: 'continuous',
    padding: 5,
    marginTop: 20
  },
})
