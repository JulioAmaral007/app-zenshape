import { BackButton } from '@/components/BackButton'
import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { ModalWrapper } from '@/components/ModalWrapper'
import { Typo } from '@/components/Typo'
import { colors } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import { createOrUpdateWorkout } from '@/services/workoutService'
import type { Exercise, WorkoutType } from '@/types'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'

export default function WorkoutModal() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useLocalSearchParams<{ workoutName: string }>()
  const [workoutName, setWorkoutName] = useState(params.workoutName || '')
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: '', sets: '', reps: '', weight: '', executions: [] },
  ])
  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    try {
      // Validação básica
      if (!workoutName.trim()) {
        Alert.alert('Erro', 'Digite um nome para o treino')
        return
      }

      const hasEmptyExercise = exercises.some(
        exercise => !exercise.name || !exercise.sets || !exercise.reps
      )

      if (hasEmptyExercise) {
        Alert.alert('Erro', 'Preencha todos os campos obrigatórios dos exercícios')
        return
      }

      const workoutData: WorkoutType = {
        name: workoutName,
        exercises: exercises.map(exercise => ({
          ...exercise,
          executions: [],
        })),
        uid: user?.uid,
      }

      setLoading(true)
      const res = await createOrUpdateWorkout(workoutData)
      setLoading(false)

      if (res.success) {
        router.back()
      } else {
        Alert.alert('Erro', res.msg || 'Ocorreu um erro ao salvar o treino')
      }
    } catch (error) {
      setLoading(false)
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o treino')
    }
  }

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: '', reps: '', weight: '', executions: [] }])
  }

  const updateExercise = (index: number, field: keyof Exercise, value: string) => {
    const updatedExercises = [...exercises]
    updatedExercises[index][field] = value as never
    setExercises(updatedExercises)
  }

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title="Adicionar Novo Treino"
          leftIcon={<BackButton />}
          style={{ marginBottom: 10 }}
        />

        <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false}>
          <Input
            placeholder="Nome do Treino"
            editable={false}
            value={workoutName}
            onChangeText={setWorkoutName}
          />

          {exercises.map((exercise, index) => (
            <View key={`${exercise.name}-${index}`} style={styles.inputContainer}>
              <Typo color={colors.neutral200}>Nome do Exercício</Typo>
              <Input
                placeholder="Nome do Exercício"
                value={exercise.name}
                onChangeText={value => updateExercise(index, 'name', value)}
              />
              <Typo color={colors.neutral200}>Séries</Typo>
              <Input
                placeholder="Séries"
                value={exercise.sets}
                onChangeText={value => updateExercise(index, 'sets', value)}
                keyboardType="numeric"
              />
              <Typo color={colors.neutral200}>Repetições</Typo>
              <Input
                placeholder="Repetições"
                value={exercise.reps}
                onChangeText={value => updateExercise(index, 'reps', value)}
                keyboardType="numeric"
              />
              <Typo color={colors.neutral200}>Peso (kg)</Typo>
              <Input
                placeholder="Peso (kg)"
                value={exercise.weight}
                onChangeText={value => updateExercise(index, 'weight', value)}
                keyboardType="numeric"
              />
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <Button onPress={addExercise} style={{ flex: 1 }}>
            <Typo color={colors.white} fontWeight="700">
              Adicionar Exercício
            </Typo>
          </Button>
          <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}>
            <Typo color={colors.black} fontWeight="700">
              Salvar Treino
            </Typo>
          </Button>
        </View>
      </View>
    </ModalWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
  form: {
    gap: 30,
    marginTop: 15,
    paddingBottom: 45,
  },
  avatarContainer: {
    position: 'relative',
    alignSelf: 'center',
  },
  avatar: {
    alignSelf: 'center',
    backgroundColor: colors.neutral300,
    height: 135,
    width: 135,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.neutral500,
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 7,
    borderRadius: 100,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: 7,
  },
  inputContainer: {
    gap: 10,
  },
})
