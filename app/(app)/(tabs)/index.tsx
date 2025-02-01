import { ScreenWrapper } from '@/components/ScreenWrapper'
import { TopBarWorkouts } from '@/components/TopBarWorkouts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function HomeScreen() {
  const router = useRouter()
  const [workouts, setWorkouts] = useState<string[]>([])
  const [selectedWorkout, setSelectedWorkout] = useState<string>('')

  useEffect(() => {
    loadWorkouts()
  }, [])

  const loadWorkouts = async () => {
    try {
      const savedWorkouts = await AsyncStorage.getItem('workoutNames')
      if (savedWorkouts) {
        const parsedWorkouts = JSON.parse(savedWorkouts)
        setWorkouts(parsedWorkouts)
        if (parsedWorkouts.length > 0) {
          setSelectedWorkout(parsedWorkouts[0])
        }
      }
    } catch (error) {
      console.error('Error loading workouts:', error)
    }
  }

  const addWorkout = async () => {
    if (workouts.length >= 5) {
      Alert.alert('Limite atingido', 'Você já tem 5 treinos. Remova um para adicionar outro.')
      return
    }

    const newWorkoutName = `Treino ${workouts.length + 1}`
    const updatedWorkouts = [...workouts, newWorkoutName]
    setWorkouts(updatedWorkouts)
    setSelectedWorkout(newWorkoutName)

    try {
      await AsyncStorage.setItem('workoutNames', JSON.stringify(updatedWorkouts))
      await AsyncStorage.setItem('selectedWorkout', newWorkoutName)
    } catch (error) {
      console.error('Error saving workouts:', error)
    }
  }

  const selectWorkout = async (workout: string) => {
    setSelectedWorkout(workout)
    try {
      await AsyncStorage.setItem('selectedWorkout', workout)
    } catch (error) {
      console.error('Error saving selected workout:', error)
    }
  }

  return (
    <ScreenWrapper style={styles.container}>
      <TopBarWorkouts
        workouts={workouts}
        selectedWorkout={selectedWorkout}
        onSelectWorkout={selectWorkout}
        onAddWorkout={addWorkout}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Workout Tracker</Text>
        <Text style={styles.subtitle}>Treino selecionado: {selectedWorkout}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.navigate('/(modals)/workoutModal')}
          >
            <Text style={styles.buttonText}>Adicionar Exercício</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Histórico</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Progresso</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
