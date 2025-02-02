import { Ionicons } from '@expo/vector-icons'
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
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
  const confirmDeleteWorkout = (workout: string) => {
    Alert.alert('Excluir treino', `Tem certeza que deseja excluir "${workout}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => onDeleteWorkout(workout) },
    ])
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Workout
            name={item}
            isSelected={item === selectedWorkout}
            onPress={() => onSelectWorkout(item)}
            onLongPress={() => confirmDeleteWorkout(item)} // Segurar para excluir
          />
        )}
        horizontal
        style={styles.list}
        contentContainerStyle={styles.content}
        showsHorizontalScrollIndicator={false}
      />

      {workouts.length < 5 && (
        <TouchableOpacity style={styles.addButton} onPress={onAddWorkout}>
          <Ionicons name="add-circle" size={40} color="white" />
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
    height: 42,
    maxHeight: 42,
  },
  content: {
    gap: 15,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 5,
    marginLeft: 10,
  },
})
