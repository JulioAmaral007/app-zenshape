import { Button } from '@/components/Button'
import { Typo } from '@/components/Typo'
import { colors } from '@/constants/theme'
import { useRouter } from 'expo-router'
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function WelcomeScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('@/assets/images/welcome.png')}
        style={[styles.imgBack, { paddingTop: insets.top }]}
      >
        <View>
          <TouchableOpacity onPress={() => {}} style={styles.loginButon}>
            <Typo fontWeight={'500'}>Entrar</Typo>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Animated.View
            entering={FadeInDown.duration(1000).springify().damping(12)}
            style={{ alignItems: 'center' }}
          >
            <Typo size={30} fontWeight={'800'}>
              Welcome to Your
            </Typo>
            <Typo size={30} fontWeight={'800'}>
              Fitness Journey
            </Typo>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1000).delay(100).springify().damping(12)}
            style={{ alignItems: 'center', gap: 2 }}
          >
            <Typo size={17} color={colors.textLight}>
              Get ready to unlock your potential and achieve
            </Typo>
            <Typo size={17} color={colors.textLight}>
              your fitness goals, one step at a time
            </Typo>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1000).delay(200).springify().damping(12)}
            style={styles.buttonContainer}
          >
            <Button onPress={() => {}}>
              <Typo size={22} color={colors.neutral900} fontWeight={'600'}>
                Get Started
              </Typo>
            </Button>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  imgBack: {
    flex: 1,
    justifyContent: 'space-between',
  },
  welcomeImage: {
    width: '100%',
    height: 300,
    alignSelf: 'center',
    marginTop: 100,
  },
  loginButon: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  footer: {
    backgroundColor: colors.neutral900,
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 45,
    gap: 20,
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    elevation: 10,
    shadowRadius: 25,
    shadowOpacity: 0.15,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 25,
  },
})
