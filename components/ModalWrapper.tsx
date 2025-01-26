import { colors } from '@/constants/theme'
import type { ModalWrapperProps } from '@/types'
import { Platform, StyleSheet, View } from 'react-native'

export function ModalWrapper({ style, children, bg = colors.neutral800 }: ModalWrapperProps) {
  return <View style={[styles.container, { backgroundColor: bg }, style && style]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 15 : 50,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
})
