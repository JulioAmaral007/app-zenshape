import { BackButton } from '@/components/BackButton'
import { Button } from '@/components/Button'
import { ConfirmationModal } from '@/components/ConfirmationModal'
import { DeleteButton } from '@/components/DeleteButton'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { ModalWrapper } from '@/components/ModalWrapper'
import { Typo } from '@/components/Typo'
import { colors } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import { useFetchWorkout } from '@/hooks/useFetchWorkout'
import { addExerciseExecution, deleteExercise } from '@/services/workoutService'
import { formatDate } from '@/utils/dateFormat'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'

export default function ExerciseModal() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useLocalSearchParams<{ workoutName: string; exerciseName: string }>()
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')
  const [loading, setLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const { data: workout } = useFetchWorkout(user?.uid, params.workoutName)
  const exercise = workout?.exercises.find(e => e.name === params.exerciseName)

  const onSubmit = async () => {
    if (!reps || !weight) {
      Alert.alert('Error', 'Fill all fields')
      return
    }

    try {
      setLoading(true)
      const execution = {
        reps,
        weight,
        date: new Date().toISOString(),
      }

      const res = await addExerciseExecution(
        user?.uid || '',
        params.workoutName,
        params.exerciseName,
        execution
      )

      if (res.success) {
        router.back()
      } else {
        Alert.alert('Error', res.msg || 'Error saving execution')
      }
    } catch (error) {
      Alert.alert('Error', 'Error saving execution')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setLoading(true)
      const res = await deleteExercise(user?.uid || '', params.workoutName, params.exerciseName)
      if (res.success) {
        router.back()
      } else {
        Alert.alert('Erro', res.msg || 'Erro ao deletar exercício')
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao deletar exercício')
    } finally {
      setLoading(false)
      setShowConfirmation(false)
    }
  }

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title={`Update ${params.exerciseName}`}
          leftIcon={<BackButton />}
          rightIcon={<DeleteButton onPress={() => setShowConfirmation(true)} />}
        />

        <ScrollView style={styles.content}>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Typo color={colors.neutral200}>Reps</Typo>
              <Input
                placeholder="Reps"
                value={reps}
                onChangeText={setReps}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <Typo color={colors.neutral200}>Weight (kg)</Typo>
              <Input
                placeholder="Weight"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
              />
            </View>
          </View>

          {exercise?.executions && exercise.executions.length > 0 && (
            <View style={styles.historyContainer}>
              <Typo color={colors.neutral200} style={styles.historyTitle}>
                History
              </Typo>
              {exercise.executions
                .slice()
                .reverse()
                .map((execution, index) => (
                  <View key={execution.date} style={styles.historyItem}>
                    <Typo color={colors.neutral200}>
                      {formatDate(execution.date)}: {execution.reps} reps - {execution.weight}kg
                    </Typo>
                  </View>
                ))}
            </View>
          )}
        </ScrollView>

        <Button onPress={onSubmit} loading={loading}>
          <Typo color={colors.black} fontWeight="700">
            Save Execution
          </Typo>
        </Button>

        <ConfirmationModal
          visible={showConfirmation}
          title="Delete Exercise"
          message="Are you sure you want to delete this exercise?"
          onConfirm={handleDelete}
          onClose={() => setShowConfirmation(false)}
          loading={loading}
        />
      </View>
    </ModalWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  form: {
    flex: 1,
    gap: 20,
  },
  inputContainer: {
    gap: 10,
  },
  content: {
    flex: 1,
  },
  historyContainer: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: colors.neutral800,
    borderRadius: 8,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  historyItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral700,
  },
  deleteButton: {
    padding: 8,
  },
})
