import { firestore } from '@/config/firebase'
import type { WorkoutType } from '@/types'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export function useFetchWorkout(uid: string | undefined, workoutName: string) {
  const [data, setData] = useState<WorkoutType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!uid || !workoutName) return

    const workoutsRef = collection(firestore, 'workouts')
    const q = query(workoutsRef, where('uid', '==', uid), where('name', '==', workoutName))

    const unsub = onSnapshot(
      q,
      snapshot => {
        const workout = snapshot.docs[0]?.data() as WorkoutType
        setData(workout || null)
        setLoading(false)
      },
      err => {
        console.log('Error fetching workout:', err)
        setError(err.message)
        setLoading(false)
      }
    )

    return () => unsub()
  }, [uid, workoutName])

  return { data, loading, error }
}
