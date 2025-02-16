import { Button } from '@/components/Button'
import { ExerciseCard } from '@/components/ExerciseCard'
import { Loading } from '@/components/Loading'
import { ScreenWrapper } from '@/components/ScreenWrapper'
import { TopBarWorkouts } from '@/components/TopBarWorkouts'
import { Typo } from '@/components/Typo'
import { colors } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import { useFetchWorkout } from '@/hooks/useFetchWorkout'
import { getProfileImage } from '@/services/imageService'
import { saveWorkoutsList, useWorkoutsList } from '@/services/workoutService'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import * as Icons from 'phosphor-react-native'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

export default function HomeScreen() {
  const { user } = useAuth()
  const router = useRouter()
  const { data: workoutsList, loading: loadingWorkouts } = useWorkoutsList(user?.uid)
  const [selectedWorkout, setSelectedWorkout] = useState<string>('')

  useEffect(() => {
    if (workoutsList.length > 0 && !selectedWorkout) {
      setSelectedWorkout(workoutsList[0])
    }
  }, [workoutsList, selectedWorkout])

  const { data: workout, loading } = useFetchWorkout(user?.uid, selectedWorkout)

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const addWorkout = async () => {
    let workoutNumber = workoutsList.length + 1
    let newWorkoutName = `Training ${workoutNumber}`

    while (workoutsList.includes(newWorkoutName)) {
      workoutNumber++
      newWorkoutName = `Training ${workoutNumber}`
    }

    const updatedWorkouts = [...workoutsList, newWorkoutName]
    const res = await saveWorkoutsList(user?.uid || '', updatedWorkouts)

    if (res.success) {
      setSelectedWorkout(newWorkoutName)
    }
  }

  const deleteWorkout = async (workoutToDelete: string) => {
    const updatedWorkouts = workoutsList.filter(w => w !== workoutToDelete)
    const res = await saveWorkoutsList(user?.uid || '', updatedWorkouts)

    if (res.success && selectedWorkout === workoutToDelete) {
      setSelectedWorkout(updatedWorkouts[0] || '')
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
              Ready for another training?
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
          workouts={workoutsList}
          selectedWorkout={selectedWorkout}
          onSelectWorkout={setSelectedWorkout}
          onAddWorkout={addWorkout}
          onDeleteWorkout={deleteWorkout}
        />

        <View style={styles.content}>
          <FlatList
            data={workout?.exercises || []}
            renderItem={({ item }) => (
              <ExerciseCard exercise={item} workoutName={selectedWorkout} />
            )}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            ListEmptyComponent={
              loading ? (
                <Loading />
              ) : (
                <Typo style={styles.emptyText} color={colors.neutral400}>
                  No exercise added yet.
                </Typo>
              )
            }
          />
        </View>

        <Button
          style={styles.floatingButton}
          onPress={() =>
            router.push({
              pathname: '/workoutModal',
              params: { workoutName: selectedWorkout },
            })
          }
        >
          <Icons.Plus color={colors.black} weight="bold" size={24} />
        </Button>
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
  floatingButton: {
    height: 50,
    width: 50,
    borderRadius: 100,
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
})
