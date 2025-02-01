import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function AddWorkout() {
  const [workoutName, setWorkoutName] = useState('')
  const [exercises, setExercises] = useState([
    { id: Date.now(), name: '', category: '', sets: '', reps: '', weight: '' },
  ])

  const addExercise = () => {
    setExercises([
      ...exercises,
      { id: Date.now(), name: '', category: '', sets: '', reps: '', weight: '' },
    ])
  }

  const updateExercise = (index: number, field: keyof (typeof exercises)[0], value: string) => {
    const updatedExercises = [...exercises]
    updatedExercises[index][field] = value as never
    setExercises(updatedExercises)
  }

  const saveWorkout = async () => {
    try {
      const workout = { name: workoutName, exercises, date: new Date().toISOString() }
      const existingWorkouts = await AsyncStorage.getItem('workouts')
      const workouts = existingWorkouts ? JSON.parse(existingWorkouts) : []
      workouts.push(workout)
      await AsyncStorage.setItem('workouts', JSON.stringify(workouts))
      router.replace('/')
    } catch (error) {
      console.error('Error saving workout:', error)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Workout</Text>
      <TextInput
        style={styles.input}
        placeholder="Workout Name"
        value={workoutName}
        onChangeText={setWorkoutName}
      />
      {exercises.map((exercise, index) => (
        <View key={exercise.id} style={styles.exerciseContainer}>
          <TextInput
            style={styles.input}
            placeholder="Exercise Name"
            value={exercise.name}
            onChangeText={value => updateExercise(index, 'name', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={exercise.category}
            onChangeText={value => updateExercise(index, 'category', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Sets"
            value={exercise.sets}
            onChangeText={value => updateExercise(index, 'sets', value)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Reps"
            value={exercise.reps}
            onChangeText={value => updateExercise(index, 'reps', value)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Weight (kg)"
            value={exercise.weight}
            onChangeText={value => updateExercise(index, 'weight', value)}
            keyboardType="numeric"
          />
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={addExercise}>
        <Text style={styles.buttonText}>Add Exercise</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={saveWorkout}>
        <Text style={styles.buttonText}>Save Workout</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  exerciseContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#4CD964',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
