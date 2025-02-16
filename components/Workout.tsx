import { colors } from '@/constants/theme'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Typo } from './Typo'

type WorkoutProps = {
  name: string
  isSelected: boolean
  onPress: () => void
  onLongPress?: () => void
  icon?: React.ReactNode
}

export function Workout({ name, isSelected, onPress, onLongPress, icon }: WorkoutProps) {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selected]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      {icon ? (
        icon
      ) : (
        <Typo color={isSelected ? colors.black : colors.white} fontWeight="600">
          {name}
        </Typo>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    paddingHorizontal: 20,
    borderRadius: 100,
    backgroundColor: colors.neutral800,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: colors.primary,
  },
})
