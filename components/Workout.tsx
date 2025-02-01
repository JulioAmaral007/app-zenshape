import { MaterialIcons } from '@expo/vector-icons'
import type { PressableProps } from 'react-native'
import { Pressable, StyleSheet, Text } from 'react-native'

type WorkoutProps = PressableProps & {
  name: string
  isSelected: boolean
  icon: keyof typeof MaterialIcons.glyphMap
}

export function Workout({ name, icon, isSelected, ...rest }: WorkoutProps) {
  const color = isSelected ? '#2DD4BF' : '#A1A1AA'

  return (
    <Pressable style={styles.container} {...rest}>
      <MaterialIcons name={icon} size={16} color={color} />
      <Text style={[styles.name, { color }]}>{name}</Text>
    </Pressable>
  )
}

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})
