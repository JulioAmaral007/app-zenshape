import { colors } from '@/constants/theme'
import type { DeleteButtonProps } from '@/types'
import { Trash } from 'phosphor-react-native'
import { StyleSheet, TouchableOpacity } from 'react-native'

export function DeleteButton({ style, onPress, iconSize = 24 }: DeleteButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.7}>
      <Trash size={iconSize} color={colors.rose} weight="bold" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    backgroundColor: colors.neutral800,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
