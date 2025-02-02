import { ScreenWrapper } from '@/components/ScreenWrapper'
import { TopBarWorkouts } from '@/components/TopBarWorkouts'
import { Typo } from '@/components/Typo'
import { colors } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import type { Exercise } from '@/exercise'
import { getProfileImage } from '@/services/imageService'
import { Image } from 'expo-image'
import { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

export default function HomeScreen() {
  const { user } = useAuth()
  const [workouts, setWorkouts] = useState<string[]>([])
  const [selectedWorkout, setSelectedWorkout] = useState<string>('Treino 1')
  const [exercises, setExercises] = useState<Exercise[]>([])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Bom dia'
    if (hour < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  const selectWorkout = (workout: string) => {
    setSelectedWorkout(workout)
  }

  const addWorkout = () => {
    // Add workout logic here
  }

  const deleteWorkout = async (workoutToDelete: string) => {
    const updatedWorkouts = workouts.filter(w => w !== workoutToDelete)
    setWorkouts(updatedWorkouts)
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

        <TopBarWorkouts
          workouts={workouts}
          selectedWorkout={selectedWorkout}
          onSelectWorkout={selectWorkout}
          onAddWorkout={addWorkout}
          onDeleteWorkout={deleteWorkout}
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

        {/* <View style={styles.footer}>
          <Button style={styles.button}>
            <Typo color={colors.black} fontWeight="700">
              Add Exercise
            </Typo>
          </Button>
        </View> */}
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
    marginTop: 5,
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
