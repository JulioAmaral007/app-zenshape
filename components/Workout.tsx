import { colors } from '@/constants/theme'
import * as Icons from 'phosphor-react-native'
import type { PressableProps } from 'react-native'
import { Pressable, StyleSheet, Text } from 'react-native'

type WorkoutProps = PressableProps & {
  name: string
  isSelected: boolean
}

export function Workout({ name, isSelected, ...rest }: WorkoutProps) {
  const color = isSelected ? colors.primary : colors.white

  return (
    <Pressable style={[styles.container, { borderColor: color }]} {...rest}>
      <Icons.Barbell size={28} color={color} weight={isSelected ? 'fill' : 'regular'} />
      <Text style={[styles.name, { color }]}>{name}</Text>
    </Pressable>
  )
}

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})
