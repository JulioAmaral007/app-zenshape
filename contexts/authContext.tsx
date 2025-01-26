import { auth, firestore } from '@/config/firebase'
import type { AuthContextType, UserType } from '@/types'
import { useRouter } from 'expo-router'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<UserType>(null)
  const router = useRouter()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, firebaseUser => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser?.uid,
          email: firebaseUser?.email,
          name: firebaseUser?.displayName,
        })
        updateUserData(firebaseUser?.uid)
        router.replace('/(app)/(tabs)')
      } else {
        setUser(null)
        router.replace('/(auth)/welcome')
      }
    })

    return () => unsub()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return { success: true }
    } catch (error) {
      const msg = (error as Error).message
      return { success: false, msg }
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(firestore, 'users', response?.user?.uid), {
        name,
        email,
        uid: response?.user?.uid,
      })
      return { success: true }
    } catch (error) {
      const msg = (error as Error).message
      return { success: false, msg }
    }
  }

  const updateUserData = async (uid: string) => {
    try {
      const docRef = doc(firestore, 'users', uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        const userData = {
          name: data?.name || null,
          email: data?.email || null,
          uid: data?.uid || null,
          image: data?.image || null,
        }
        setUser({ ...userData })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserData,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useListCreation must be used within a AuthProvider')
  }
  return context
}
