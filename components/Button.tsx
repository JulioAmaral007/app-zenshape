import { colors } from '@/constants/theme'
import type { CustomButtonProps } from '@/types'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Loading } from './Loading'

export function Button({ style, onPress, loading = false, children }: CustomButtonProps) {
  if (loading) {
    return (
      <View style={[styles.button, style, { backgroundColor: 'transparent' }]}>
        <Loading />
      </View>
    )
  }
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 17,
    borderCurve: 'continuous',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
