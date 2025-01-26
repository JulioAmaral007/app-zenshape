import { firestore } from '@/config/firebase'
import type { ResponseType, UserDataType } from '@/types'
import { doc, updateDoc } from 'firebase/firestore'

export const updateUser = async (uid: string, updatedData: UserDataType): Promise<ResponseType> => {
  try {
    const userRef = doc(firestore, 'users', uid)
    await updateDoc(userRef, updatedData)
    return { success: true }
  } catch (error) {
    return { success: false, msg: (error as Error).message }
  }
}
