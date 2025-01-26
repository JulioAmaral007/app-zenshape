import { Header } from '@/components/Header'
import { ScreenWrapper } from '@/components/ScreenWrapper'
import { Typo } from '@/components/Typo'
import { auth } from '@/config/firebase'
import { colors } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import { getProfileImage } from '@/services/imageService'
import { accountOptionType } from '@/types'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { signOut } from 'firebase/auth'
import * as Icons from 'phosphor-react-native'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

export default function ProfileScreen() {
  const router = useRouter()
  const { user } = useAuth()
  const accountOptions: accountOptionType[] = [
    {
      title: 'Editar perfil',
      icon: <Icons.User size={26} color={colors.white} weight="fill" />,
      bgColor: '#6366f1',
      routeName: '/(modals)/profileModal',
    },
    {
      title: 'Configurações',
      icon: <Icons.GearSix size={26} color={colors.white} weight="fill" />,
      bgColor: '#059669',
      // routeName: '/(modals)/profileModal',
    },
    {
      title: 'Politica de privacidade',
      icon: <Icons.Lock size={26} color={colors.white} weight="fill" />,
      bgColor: colors.neutral600,
      // routeName: '/(modals)/profileModal',
    },
    {
      title: 'Sair',
      icon: <Icons.Power size={26} color={colors.white} weight="fill" />,
      bgColor: '#e11d48',
      // routeName: '/(modals)/profileModal',
    },
  ]

  const handleLogout = async () => {
    await signOut(auth)
  }
  const showLogoutAlert = () => {
    Alert.alert('confirm', 'Tem certeza de que deseja sair?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Saida Cancelada'),
        style: 'cancel',
      },
      {
        text: 'Sair',
        onPress: () => handleLogout(),
        style: 'destructive',
      },
    ])
  }
  const handlePress = async (option: accountOptionType) => {
    if (option.title === 'Sair') {
      showLogoutAlert()
    }
    if (option.routeName) router.push(option.routeName)
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Perfil" style={{ marginVertical: 10 }} />
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Image
              source={getProfileImage(user?.image)}
              style={styles.avatar}
              contentFit="cover"
              transition={100}
            />
          </View>
          <View style={styles.nameContainer}>
            <Typo size={24} fontWeight="600" color={colors.neutral100}>
              {user?.name}
            </Typo>
            <Typo size={15} fontWeight="600" color={colors.neutral400}>
              {user?.email}
            </Typo>
          </View>
        </View>
        <View style={styles.accountOptions}>
          {accountOptions.map((option, index) => {
            return (
              <Animated.View
                key={index.toString()}
                entering={FadeInDown.delay(index * 50)
                  .springify()
                  .damping(14)}
                style={styles.listItem}
              >
                <TouchableOpacity
                  style={styles.flexRow}
                  onPress={() => {
                    handlePress(option)
                  }}
                >
                  <View style={[styles.listIcon, { backgroundColor: option?.bgColor }]}>
                    {option.icon && option.icon}
                  </View>
                  <Typo size={16} style={{ flex: 1 }} fontWeight="500">
                    {option.title}
                  </Typo>
                  <Icons.CaretRight size={20} color={colors.white} weight="bold" />
                </TouchableOpacity>
              </Animated.View>
            )
          })}
        </View>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userInfo: {
    marginTop: 30,
    alignItems: 'center',
    gap: 15,
  },
  avatarContainer: {
    position: 'relative',
    alignSelf: 'center',
  },
  avatar: {
    height: 135,
    width: 135,
    borderRadius: 200,
    backgroundColor: colors.neutral300,
    alignSelf: 'center',
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 8,
    borderRadius: 50,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: 5,
  },
  nameContainer: {
    gap: 4,
    alignItems: 'center',
  },
  listIcon: {
    height: 44,
    width: 44,
    backgroundColor: colors.neutral500,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderCurve: 'continuous',
  },
  listItem: {
    marginBottom: 17,
  },
  accountOptions: {
    marginTop: 35,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
})