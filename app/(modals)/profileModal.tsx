import { BackButton } from '@/components/BackButton'
import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { ModalWrapper } from '@/components/ModalWrapper'
import { Typo } from '@/components/Typo'
import { colors } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import { getProfileImage } from '@/services/imageService'
import { updateUser } from '@/services/userService'
import type { UserDataType } from '@/types'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import * as Icons from 'phosphor-react-native'
import { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

export default function ProfileModal() {
  const { user, updateUserData } = useAuth()
  const router = useRouter()
  const [userData, setUserData] = useState<UserDataType>({
    name: '',
    image: null,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setUserData({
      name: user?.name || '',
      image: user?.image || null,
    })
  }, [user])

  const onPickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    })

    if (!result.canceled) {
      setUserData({ ...userData, image: result.assets[0] })
    }
  }

  const onSubmit = async () => {
    const { name, image } = userData
    if (!name.trim()) {
      Alert.alert('Usuário', 'Por Favor, preencha todos os campos')
      return
    }

    setLoading(true)
    const res = await updateUser(user?.uid as string, userData)
    setLoading(false)

    if (res.success) {
      updateUserData(user?.uid as string)
      router.back()
    } else {
      Alert.alert('User', res.msg)
    }
  }

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title="Atualizar Perfil"
          leftIcon={<BackButton />}
          style={{ marginBottom: 10 }}
        />

        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={getProfileImage(userData.image)}
              contentFit="cover"
              transition={100}
            />

            <TouchableOpacity onPress={onPickImage} style={styles.editIcon}>
              <Icons.Pencil size={20} color={colors.neutral800} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Nome</Typo>
            <Input
              placeholder="Nome"
              value={userData.name}
              onChangeText={value => setUserData({ ...userData, name: value })}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}>
          <Typo color={colors.black} fontWeight="700">
            Atualizar
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 12,
    paddingTop: 15,
    borderTopColor: colors.neutral700,
    marginBottom: 5,
    borderTopWidth: 1,
  },
  form: {
    gap: 30,
    marginTop: 15,
  },
  avatarContainer: {
    position: 'relative',
    alignSelf: 'center',
  },
  avatar: {
    alignSelf: 'center',
    backgroundColor: colors.neutral300,
    height: 135,
    width: 135,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.neutral500,
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 7,
    borderRadius: 100,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: 7,
  },
  inputContainer: {
    gap: 10,
  },
})
