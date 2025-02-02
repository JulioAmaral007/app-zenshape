export type ExerciseExecution = {
  date: string
  weight: string
  reps: string
}

export type Exercise = {
  name: string
  category: string
  sets: string
  reps: string
  weight: string
  executions: ExerciseExecution[]
}

export type Workout = {
  name: string
  exercises: Exercise[]
}

