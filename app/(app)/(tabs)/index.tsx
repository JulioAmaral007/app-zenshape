import { Button } from '@/components/Button'
import { ScreenWrapper } from '@/components/ScreenWrapper'
import { Typo } from '@/components/Typo'
import { auth } from '@/config/firebase'
import { colors } from '@/constants/theme'
import { signOut } from 'firebase/auth'
import { StyleSheet } from 'react-native'

export default function HomeScreen() {
  const handleLoggout = async () => {
    await signOut(auth)
  }

  return (
    <ScreenWrapper>
      <Typo>Home</Typo>
      <Button onPress={handleLoggout}>
        <Typo color={colors.black}>Loggout</Typo>
      </Button>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({})