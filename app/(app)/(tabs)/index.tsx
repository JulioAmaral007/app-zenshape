import { Button } from '@/components/Button'
import { ScreenWrapper } from '@/components/ScreenWrapper'
import { TopBarWorkouts } from '@/components/TopBarWorkouts'
import { Typo } from '@/components/Typo'
import { colors } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import type { Exercise, Workout } from '@/exercise'
import { mockExercises } from '@/mockExercises'
import { getProfileImage } from '@/services/imageService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image } from 'expo-image'
import { useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'

export default function HomeScreen() {
  const { user } = useAuth()
  const [workouts, setWorkouts] = useState<string[]>([])
  const [selectedWorkout, setSelectedWorkout] = useState<string>('')
  const [exercises, setExercises] = useState<Exercise[]>([])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Bom dia'
    if (hour < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  useEffect(() => {
    loadWorkouts()
  }, [])

  useEffect(() => {
    if (selectedWorkout) {
      loadExercises()
    }
  }, [selectedWorkout])

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

  const loadExercises = async () => {
    try {
      const savedWorkouts = await AsyncStorage.getItem('workouts')
      if (savedWorkouts) {
        const parsedWorkouts: Workout[] = JSON.parse(savedWorkouts)
        const currentWorkout = parsedWorkouts.find(w => w.name === selectedWorkout)
        setExercises(currentWorkout ? currentWorkout.exercises : mockExercises)
      } else {
        setExercises(mockExercises)
      }
    } catch (error) {
      console.error('Error loading exercises:', error)
      setExercises(mockExercises)
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
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.welcomeHeader}>
          <View style={styles.nameContainer}>
            <Typo size={24} fontWeight="600" color={colors.neutral100}>
              {getGreeting()}, {user?.name}!
            </Typo>
            <Typo size={15} fontWeight="600" color={colors.neutral400}>
              Pronto para mais um treino?
            </Typo>
          </View>
          <View style={styles.avatarContainer}>
            <Image
              source={getProfileImage(user?.image)}
              style={styles.avatar}
              contentFit="cover"
              transition={100}
            />
          </View>
        </View>

        <Typo color={colors.white} fontWeight="700">
          Workout Tracker
        </Typo>
        <Typo color={colors.white} fontWeight="700">
          Treino selecionado: {selectedWorkout}
        </Typo>

        <TopBarWorkouts
          workouts={workouts}
          selectedWorkout={selectedWorkout}
          onSelectWorkout={selectWorkout}
          onAddWorkout={addWorkout}
        />

        <View style={styles.content}>
          <FlatList
            data={exercises}
            renderItem={({ item }: { item: Exercise }) => (
              <View style={styles.exerciseItem}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <Text style={styles.exerciseDetails}>
                  Planejado: {item.sets} séries x {item.reps} reps - {item.weight}kg
                </Text>
                {item.executions?.length > 0 && (
                  <View style={styles.executionsContainer}>
                    <Text style={styles.executionsTitle}>Últimas execuções:</Text>
                    {item.executions
                      .slice(-3)
                      .reverse()
                      .map(execution => (
                        <Text key={execution.date} style={styles.executionItem}>
                          {new Date(execution.date).toLocaleDateString()}: {execution.reps} reps -{' '}
                          {execution.weight}kg
                        </Text>
                      ))}
                  </View>
                )}
              </View>
            )}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            style={styles.container}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhum exercício adicionado ainda.</Text>
            }
          />
        </View>

        <View style={styles.footer}>
          <Button style={styles.button}>
            <Typo color={colors.black} fontWeight="700">
              Add Exercise
            </Typo>
          </Button>
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
  welcomeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 25,
  },
  avatarContainer: {
    position: 'relative',
    alignSelf: 'center',
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 200,
    backgroundColor: colors.neutral300,
    alignSelf: 'center',
  },
  nameContainer: {
    gap: 4,
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
  },
  exerciseItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  executionsContainer: {
    marginTop: 10,
  },
  executionsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  executionItem: {
    fontSize: 12,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 12,
    paddingTop: 15,
    borderTopColor: colors.neutral700,
    marginBottom: 5,
    borderTopWidth: 1,
  },
  button: {
    flex: 1,
  },
})
