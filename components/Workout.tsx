import { colors } from '@/constants/theme'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
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
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {icon ? (
          icon
        ) : (
          <Typo color={isSelected ? colors.black : colors.white} fontWeight="600" size={15}>
            {name}
          </Typo>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    paddingHorizontal: 20,
    borderRadius: 100,
    backgroundColor: colors.neutral800,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  selected: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
  },
})
