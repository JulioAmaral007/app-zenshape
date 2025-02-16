import { firestore } from '@/config/firebase'
import type { ResponseType, WorkoutType } from '@/types'
import { collection, doc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export async function createOrUpdateWorkout(workoutData: WorkoutType): Promise<ResponseType> {
  try {
    const workoutsRef = collection(firestore, 'workouts')
    const q = query(
      workoutsRef,
      where('uid', '==', workoutData.uid),
      where('name', '==', workoutData.name)
    )

    const snapshot = await getDocs(q)
    const existingWorkout = snapshot.docs[0]

    const workoutToSave = {
      ...workoutData,
      exercises: existingWorkout
        ? [...existingWorkout.data().exercises, ...workoutData.exercises]
        : workoutData.exercises,
      createdAt: existingWorkout ? existingWorkout.data().createdAt : new Date(),
      updatedAt: new Date(),
    }

    const workoutRef = existingWorkout
      ? doc(firestore, 'workouts', existingWorkout.id)
      : doc(collection(firestore, 'workouts'))

    await setDoc(workoutRef, workoutToSave, { merge: true })
    return { success: true, data: { ...workoutToSave, id: workoutRef.id } }
  } catch (error) {
    console.log('error creating or updating workout: ', error)
    return { success: false, msg: (error as Error).message }
  }
}

export async function addExerciseExecution(
  uid: string,
  workoutName: string,
  exerciseName: string,
  execution: { reps: string; weight: string; date: string }
): Promise<ResponseType> {
  try {
    const workoutsRef = collection(firestore, 'workouts')
    const q = query(workoutsRef, where('uid', '==', uid), where('name', '==', workoutName))

    const snapshot = await getDocs(q)
    const workoutDoc = snapshot.docs[0]

    if (!workoutDoc) {
      return { success: false, msg: 'Treino não encontrado' }
    }

    const workout = workoutDoc.data() as WorkoutType
    const exerciseIndex = workout.exercises.findIndex(e => e.name === exerciseName)

    if (exerciseIndex === -1) {
      return { success: false, msg: 'Exercício não encontrado' }
    }

    workout.exercises[exerciseIndex].executions.push(execution)

    await setDoc(doc(firestore, 'workouts', workoutDoc.id), workout)

    return { success: true, data: workout }
  } catch (error) {
    console.error('error adding execution:', error)
    return { success: false, msg: (error as Error).message }
  }
}

export async function deleteExercise(
  uid: string,
  workoutName: string,
  exerciseName: string
): Promise<ResponseType> {
  try {
    const workoutsRef = collection(firestore, 'workouts')
    const q = query(workoutsRef, where('uid', '==', uid), where('name', '==', workoutName))

    const snapshot = await getDocs(q)
    const workoutDoc = snapshot.docs[0]

    if (!workoutDoc) {
      return { success: false, msg: 'Treino não encontrado' }
    }

    const workout = workoutDoc.data() as WorkoutType
    const updatedExercises = workout.exercises.filter(e => e.name !== exerciseName)

    await setDoc(doc(firestore, 'workouts', workoutDoc.id), {
      ...workout,
      exercises: updatedExercises,
    })

    return { success: true }
  } catch (error) {
    console.error('error deleting exercise:', error)
    return { success: false, msg: (error as Error).message }
  }
}

export async function saveWorkoutsList(uid: string, workouts: string[]): Promise<ResponseType> {
  try {
    const userWorkoutsRef = doc(firestore, 'users', uid)

    await setDoc(
      userWorkoutsRef,
      {
        workoutsList: workouts,
        updatedAt: new Date(),
      },
      { merge: true }
    )

    return { success: true }
  } catch (error) {
    console.error('error saving workouts list:', error)
    return { success: false, msg: (error as Error).message }
  }
}

export function useWorkoutsList(uid: string | undefined) {
  const [data, setData] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!uid) return

    const unsubscribe = onSnapshot(
      doc(firestore, 'users', uid),
      doc => {
        const workoutsList = doc.data()?.workoutsList || []
        setData(workoutsList)
        setLoading(false)
      },
      error => {
        console.error('Error fetching workouts list:', error)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [uid])

  return { data, loading }
}
