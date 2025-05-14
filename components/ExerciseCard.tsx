import { colors } from '@/constants/theme'
import type { Exercise } from '@/types'
import { formatDate } from '@/utils/dateFormat'
import { useRouter } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Typo } from './Typo'

type ExerciseCardProps = {
  exercise: Exercise
  workoutName: string
}

export function ExerciseCard({ exercise, workoutName }: ExerciseCardProps) {
  const router = useRouter()
  const lastExecution = exercise.executions[exercise.executions.length - 1]

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: '/exerciseModal',
          params: {
            workoutName,
            exerciseName: exercise.name,
          },
        })
      }
    >
      <View style={styles.header}>
        <Typo color={colors.white} size={20} fontWeight="700">
          {exercise.name}
        </Typo>
        {lastExecution && (
          <Typo color={colors.neutral400} size={12}>
            Última execução: {formatDate(lastExecution.date)}
          </Typo>
        )}
      </View>

      <View style={styles.planContainer}>
        <View style={styles.planItem}>
          <Typo color={colors.neutral400} size={12}>
            Séries
          </Typo>
          <Typo color={colors.white} size={18} fontWeight="600">
            {exercise.sets}
          </Typo>
        </View>
        <View style={styles.planItem}>
          <Typo color={colors.neutral400} size={12}>
            Repetições
          </Typo>
          <Typo color={colors.white} size={18} fontWeight="600">
            {exercise.reps}
          </Typo>
        </View>
        <View style={styles.planItem}>
          <Typo color={colors.neutral400} size={12}>
            Peso
          </Typo>
          <Typo color={colors.white} size={18} fontWeight="600">
            {exercise.weight}kg
          </Typo>
        </View>
      </View>

      {lastExecution && (
        <View style={styles.executionContainer}>
          <Typo color={colors.neutral400} size={12}>
            Última execução
          </Typo>
          <View style={styles.executionContent}>
            <Typo color={colors.white} size={14}>
              {formatDate(lastExecution.date)}
            </Typo>
            <Typo color={colors.primary} fontWeight="600">
              {lastExecution.reps} reps - {lastExecution.weight}kg
            </Typo>
          </View>
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral800,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    gap: 16,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    gap: 6,
  },
  planContainer: {
    flexDirection: 'row',
    gap: 32,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.neutral700,
  },
  planItem: {
    gap: 6,
    alignItems: 'center',
  },
  executionContainer: {
    gap: 8,
  },
  executionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
