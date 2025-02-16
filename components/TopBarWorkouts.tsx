import type { TopBarWorkoutsProps } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { ConfirmationModal } from './ConfirmationModal'
import { Workout } from './Workout'

export function TopBarWorkouts({
  workouts,
  selectedWorkout,
  onSelectWorkout,
  onAddWorkout,
  onDeleteWorkout,
}: TopBarWorkoutsProps) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [workoutToDelete, setWorkoutToDelete] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleDeleteWorkout = async () => {
    try {
      setLoading(true)
      await onDeleteWorkout(workoutToDelete)
    } finally {
      setLoading(false)
      setShowConfirmation(false)
      setWorkoutToDelete('')
    }
  }

  const confirmDeleteWorkout = (workout: string) => {
    setWorkoutToDelete(workout)
    setShowConfirmation(true)
  }

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

  return (
    <>
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

      <ConfirmationModal
        visible={showConfirmation}
        title="Delete Workout"
        message={`Are you sure you want to delete "${workoutToDelete}"?`}
        onConfirm={handleDeleteWorkout}
        onClose={() => {
          setShowConfirmation(false)
          setWorkoutToDelete('')
        }}
        loading={loading}
      />
    </>
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
