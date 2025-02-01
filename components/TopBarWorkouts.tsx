import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Workout } from './Workout'

type TopBarWorkoutsProps = {
  workouts: string[]
  selectedWorkout: string
  onSelectWorkout: (workout: string) => void
  onAddWorkout: () => void
}

export function TopBarWorkouts({
  workouts,
  selectedWorkout,
  onSelectWorkout,
  onAddWorkout,
}: TopBarWorkoutsProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Workout
            name={item}
            icon="fitness-center"
            isSelected={item === selectedWorkout}
            onPress={() => onSelectWorkout(item)}
          />
        )}
        horizontal
        style={styles.list}
        contentContainerStyle={styles.content}
        showsHorizontalScrollIndicator={false}
      />
      {workouts.length < 5 && (
        <TouchableOpacity style={styles.addButton} onPress={onAddWorkout}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      )}
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
    height: 52,
    maxHeight: 52,
  },
  content: {
    gap: 26,
    paddingHorizontal: 24,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
})
