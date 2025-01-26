import { BackButton } from '@/components/BackButton'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { ScreenWrapper } from '@/components/ScreenWrapper'
import { Typo } from '@/components/Typo'
import { colors } from '@/constants/theme'
import { useRouter } from 'expo-router'
import * as Icons from 'phosphor-react-native'
import { useRef, useState } from 'react'
import { Alert, Pressable, StyleSheet, View } from 'react-native'

export default function Register() {
  const router = useRouter()
  const nameRef = useRef('')
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async () => {
    if (!nameRef.current || !emailRef.current || !passwordRef.current) {
      Alert.alert('Preencha todos os campos')
      return
    }
    setIsLoading(true)
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />
        <View style={{ gap: 5, marginTop: 20 }}>
          <Typo size={30} fontWeight={'800'}>
            Get
          </Typo>
          <Typo size={30} fontWeight={'800'}>
            Started!
          </Typo>
        </View>
        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Create your account and start your fitness journey today!
          </Typo>
          <Input
            placeholder="Enter your name"
            onChangeText={(value: string) => (nameRef.current = value)}
            icon={<Icons.User size={26} color={colors.neutral300} weight="fill" />}
          />
          <Input
            placeholder="Enter your email"
            onChangeText={(value: string) => (emailRef.current = value)}
            icon={<Icons.At size={26} color={colors.neutral300} weight="fill" />}
          />
          <Input
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={(value: string) => (passwordRef.current = value)}
            icon={<Icons.Lock size={26} color={colors.neutral300} weight="fill" />}
          />
          <Button loading={isLoading} onPress={handleSubmit}>
            <Typo size={21} color={colors.black} fontWeight="700">
              Sign Up
            </Typo>
          </Button>
        </View>
        <View style={styles.footer}>
          <Typo size={15}>Already have an account?</Typo>
          <Pressable onPress={() => router.navigate('/(auth)/login')}>
            <Typo size={15} color={colors.primary} fontWeight="700">
              Log In
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  form: {
    gap: 20,
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: '500',
    color: colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    textAlign: 'center',
    color: colors.text,
    fontSize: 15,
  },
})
