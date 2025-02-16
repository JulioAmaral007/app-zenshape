import { colors } from '@/constants/theme'
import type { DeleteButtonProps } from '@/types'
import { Trash } from 'phosphor-react-native'
import { StyleSheet, TouchableOpacity } from 'react-native'

export function DeleteButton({ style, onPress, iconSize = 26 }: DeleteButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Trash size={iconSize} color={colors.rose} weight="bold" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.neutral600,
    borderRadius: 12,
    borderCurve: 'continuous',
    padding: 5,
  },
})
