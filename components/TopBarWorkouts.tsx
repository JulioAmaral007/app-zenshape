import { Ionicons } from '@expo/vector-icons'
import { Alert, FlatList, StyleSheet, View } from 'react-native'
import { Workout } from './Workout'

type TopBarWorkoutsProps = {
  workouts: string[]
  selectedWorkout: string
  onSelectWorkout: (workout: string) => void
  onAddWorkout: () => void
  onDeleteWorkout: (workout: string) => void
}

export function TopBarWorkouts({
  workouts,
  selectedWorkout,
  onSelectWorkout,
  onAddWorkout,
  onDeleteWorkout,
}: TopBarWorkoutsProps) {
  const renderItem = ({ item }: { item: string | 'add' }) => {
    if (item === 'add') {
      return (
        <Workout
          name=""
          isSelected={false}
          onPress={onAddWorkout}
          icon={<Ionicons name="add" size={24} color="white" />}
        />
      )
    }

    return (
      <Workout
        name={item}
        isSelected={item === selectedWorkout}
        onPress={() => onSelectWorkout(item)}
        onLongPress={() => confirmDeleteWorkout(item)}
      />
    )
  }

  const confirmDeleteWorkout = (workout: string) => {
    Alert.alert('Delete workout', `Are you sure you want to delete "${workout}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDeleteWorkout(workout) },
    ])
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts.length >= 5 ? workouts : [...workouts, 'add']}
        keyExtractor={item => item}
        renderItem={renderItem}
        horizontal
        style={styles.list}
        contentContainerStyle={styles.content}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  list: {
    height: 45,
    maxHeight: 45,
  },
  content: {
    gap: 15,
  },
})
