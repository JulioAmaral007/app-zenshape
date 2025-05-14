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
import React, { useState } from 'react'
import { Alert, Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

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

  const chartData = {
    labels: exercise?.executions.slice(-6).map(e => formatDate(e.date, 'dd/MM')) || [],
    datasets: [
      {
        data: exercise?.executions.slice(-6).map(e => Number.parseFloat(e.weight)) || [],
        color: () => colors.primary,
        strokeWidth: 2,
      },
    ],
  }

  const onSubmit = async () => {
    if (!reps || !weight) {
      Alert.alert('Erro', 'Preencha todos os campos')
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
        Alert.alert('Erro', res.msg || 'Erro ao salvar execução')
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar execução')
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
          title={params.exerciseName}
          leftIcon={<BackButton />}
          rightIcon={<DeleteButton onPress={() => setShowConfirmation(true)} />}
        />

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Typo color={colors.neutral200} size={16} fontWeight="600">
                Repetições
              </Typo>
              <Input
                placeholder="Número de repetições"
                value={reps}
                onChangeText={setReps}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <Typo color={colors.neutral200} size={16} fontWeight="600">
                Peso (kg)
              </Typo>
              <Input
                placeholder="Peso em kg"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
              />
            </View>
          </View>

          {exercise?.executions && exercise.executions.length > 0 && (
            <>
              <View style={styles.chartContainer}>
                <Typo
                  color={colors.neutral200}
                  size={18}
                  fontWeight="600"
                  style={styles.chartTitle}
                >
                  Evolução do Peso
                </Typo>
                <LineChart
                  data={chartData}
                  width={Dimensions.get('window').width - 60}
                  height={220}
                  chartConfig={{
                    backgroundColor: colors.neutral800,
                    backgroundGradientFrom: colors.neutral800,
                    backgroundGradientTo: colors.neutral800,
                    decimalPlaces: 1,
                    color: (opacity = 1) => colors.primary,
                    labelColor: () => colors.neutral200,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: '6',
                      strokeWidth: '2',
                      stroke: colors.primary,
                    },
                  }}
                  bezier
                  style={styles.chart}
                />
              </View>

              <View style={styles.historyContainer}>
                <Typo
                  color={colors.neutral200}
                  size={18}
                  fontWeight="600"
                  style={styles.historyTitle}
                >
                  Histórico
                </Typo>
                {exercise.executions
                  .slice()
                  .reverse()
                  .map((execution, index) => (
                    <View key={execution.date} style={styles.historyItem}>
                      <Typo color={colors.neutral200} size={14}>
                        {formatDate(execution.date)}
                      </Typo>
                      <Typo color={colors.primary} fontWeight="600" size={14}>
                        {execution.reps} repetições - {execution.weight}kg
                      </Typo>
                    </View>
                  ))}
              </View>
            </>
          )}
        </ScrollView>

        <Button onPress={onSubmit} loading={loading}>
          <Typo color={colors.black} fontWeight="700">
            Salvar Execução
          </Typo>
        </Button>

        <ConfirmationModal
          visible={showConfirmation}
          title="Deletar Exercício"
          message="Tem certeza que deseja deletar este exercício?"
          onConfirm={handleDelete}
          onClose={() => setShowConfirmation(false)}
          loading={loading}
          confirmText="Deletar"
          cancelText="Cancelar"
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
  chartContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: colors.neutral800,
    borderRadius: 16,
    alignItems: 'center',
  },
  chartTitle: {
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  historyContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: colors.neutral800,
    borderRadius: 16,
  },
  historyTitle: {
    marginBottom: 16,
  },
  historyItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral700,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
