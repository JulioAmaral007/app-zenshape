import { BackButton } from '@/components/BackButton'
import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { ModalWrapper } from '@/components/ModalWrapper'
import { Typo } from '@/components/Typo'
import { colors } from '@/constants/theme'
import { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

export default function AddWorkout() {
  const [workoutName, setWorkoutName] = useState('')
  const [exercises, setExercises] = useState([
    { id: Date.now(), name: '', category: '', sets: '', reps: '', weight: '' },
  ])
  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {}

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

  const saveWorkout = async () => {}

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header title="Add New Workout" leftIcon={<BackButton />} style={{ marginBottom: 10 }} />

        <ScrollView contentContainerStyle={styles.form}>
          <Input placeholder="Workout Name" value={workoutName} onChangeText={setWorkoutName} />

          {exercises.map((exercise, index) => (
            <View key={exercise.id} style={styles.inputContainer}>
              <Typo color={colors.neutral200}>Exercise Name</Typo>
              <Input
                placeholder="Exercise Name"
                value={exercise.name}
                onChangeText={value => updateExercise(index, 'name', value)}
              />
              <Typo color={colors.neutral200}>Category</Typo>
              <Input
                placeholder="Category"
                value={exercise.category}
                onChangeText={value => updateExercise(index, 'category', value)}
              />
              <Typo color={colors.neutral200}>Sets</Typo>
              <Input
                placeholder="Sets"
                value={exercise.sets}
                onChangeText={value => updateExercise(index, 'sets', value)}
                keyboardType="numeric"
              />
              <Typo color={colors.neutral200}>Reps</Typo>
              <Input
                placeholder="Reps"
                value={exercise.reps}
                onChangeText={value => updateExercise(index, 'reps', value)}
                keyboardType="numeric"
              />
              <Typo color={colors.neutral200}>Weight (kg)</Typo>
              <Input
                placeholder="Weight (kg)"
                value={exercise.weight}
                onChangeText={value => updateExercise(index, 'weight', value)}
                keyboardType="numeric"
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}>
          <Typo color={colors.black} fontWeight="700">
            Atualizar
          </Typo>
        </Button>
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
