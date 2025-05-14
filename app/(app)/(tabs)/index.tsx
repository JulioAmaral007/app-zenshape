import { Button } from '@/components/Button'
import { ExerciseCard } from '@/components/ExerciseCard'
import { Loading } from '@/components/Loading'
import { ScreenWrapper } from '@/components/ScreenWrapper'
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
import { Alert, FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

export default function HomeScreen() {
  const { user } = useAuth()
  const router = useRouter()
  const { data: workoutsList, loading: loadingWorkouts } = useWorkoutsList(user?.uid)
  const [selectedWorkout, setSelectedWorkout] = useState<string>('')
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    if (workoutsList.length > 0 && !selectedWorkout) {
      setSelectedWorkout(workoutsList[0])
    }
  }, [workoutsList, selectedWorkout])

  const { data: workout, loading } = useFetchWorkout(user?.uid, selectedWorkout)

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Bom dia'
    if (hour < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  const addWorkout = async () => {
    if (workoutsList.length >= 5) {
      Alert.alert(
        'Limite Atingido',
        'Você já atingiu o limite máximo de 5 treinos. Delete um treino existente para criar um novo.'
      )
      return
    }

    let workoutNumber = workoutsList.length + 1
    let newWorkoutName = `Treino ${workoutNumber}`

    while (workoutsList.includes(newWorkoutName)) {
      workoutNumber++
      newWorkoutName = `Treino ${workoutNumber}`
    }

    const updatedWorkouts = [...workoutsList, newWorkoutName]
    const res = await saveWorkoutsList(user?.uid || '', updatedWorkouts)

    if (res.success) {
      setSelectedWorkout(newWorkoutName)
      setShowMenu(false)
    }
  }

  const deleteWorkout = async (workoutToDelete: string) => {
    const updatedWorkouts = workoutsList.filter(w => w !== workoutToDelete)
    const res = await saveWorkoutsList(user?.uid || '', updatedWorkouts)

    if (res.success && selectedWorkout === workoutToDelete) {
      setSelectedWorkout(updatedWorkouts[0] || '')
    }
    setShowMenu(false)
  }

  const handleAddExercise = () => {
    setShowMenu(false)
    router.push({
      pathname: '/workoutModal',
      params: { workoutName: selectedWorkout },
    })
  }

  const handleSelectWorkout = (workout: string) => {
    setSelectedWorkout(workout)
    setShowMenu(false)
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

        <View style={styles.workoutHeader}>
          <Typo size={20} fontWeight="600" color={colors.neutral100}>
            {selectedWorkout}
          </Typo>
        </View>

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
                  Nenhum exercício adicionado ainda.
                </Typo>
              )
            }
          />
        </View>

        <View style={styles.floatingButtonContainer}>
          {showMenu && (
            <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.menuContainer}>
              <ScrollView
                style={styles.workoutsList}
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled
              >
                {workoutsList.map(workout => (
                  <TouchableOpacity
                    key={workout}
                    style={[
                      styles.workoutItem,
                      workout === selectedWorkout && styles.selectedWorkoutItem,
                    ]}
                    onPress={() => handleSelectWorkout(workout)}
                  >
                    <Typo
                      color={workout === selectedWorkout ? colors.white : colors.neutral400}
                      size={16}
                    >
                      {workout}
                    </Typo>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleteWorkout(workout)}
                    >
                      <Icons.Trash
                        color={workout === selectedWorkout ? colors.white : colors.neutral400}
                        size={16}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <View style={styles.divider} />

              {workoutsList.length > 0 && (
                <TouchableOpacity style={styles.menuItem} onPress={handleAddExercise}>
                  <Icons.Plus color={colors.white} weight="bold" size={20} />
                  <Typo color={colors.white} size={16}>
                    Adicionar Exercício
                  </Typo>
                </TouchableOpacity>
              )}

              {workoutsList.length < 5 && (
                <TouchableOpacity style={styles.menuItem} onPress={addWorkout}>
                  <Icons.Plus color={colors.white} weight="bold" size={20} />
                  <Typo color={colors.white} size={16}>
                    Novo Treino
                  </Typo>
                </TouchableOpacity>
              )}
            </Animated.View>
          )}

          <Button style={styles.floatingButton} onPress={() => setShowMenu(!showMenu)}>
            <Icons.Plus color={colors.black} weight="bold" size={24} />
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
  workoutHeader: {
    marginBottom: 20,
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
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    alignItems: 'flex-end',
  },
  floatingButton: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  menuContainer: {
    backgroundColor: colors.neutral800,
    borderRadius: 12,
    padding: 8,
    marginBottom: 12,
    gap: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 250,
    maxHeight: 400,
  },
  workoutsList: {
    maxHeight: 200,
  },
  workoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    minHeight: 44,
  },
  selectedWorkoutItem: {
    backgroundColor: colors.neutral700,
  },
  deleteButton: {
    padding: 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral700,
    marginVertical: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
  },
})
