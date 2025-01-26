import { colors } from '@/constants/theme'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'

export default function IndexScreen() {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/(auth)/welcome')
    }, 2000)
  }, [])

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require('@/assets/images/splash-icon.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral900,
  },
  logo: {
    height: '20%',
    aspectRatio: 1,
  },
})
