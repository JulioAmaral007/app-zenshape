import { colors } from '@/constants/theme'
import * as Icons from 'phosphor-react-native'
import { View } from 'react-native'
import { CircularProgress } from './CircularProgress'
import { Typo } from './Typo'

type CaloriesProgressProps = {
  current: number
  total: number
}

export function CaloriesProgress({ current, total }: CaloriesProgressProps) {
  const progress = (current / total) * 100

  return (
    <View
      style={{
        backgroundColor: colors.neutral800,
        borderRadius: 16,
        padding: 16,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.white,
      }}
    >
      <View>
        <Typo fontWeight="bold" size={40}>
          {current}
        </Typo>
        <Typo color={colors.text} fontWeight="600">
          Calorias restantes
        </Typo>
      </View>

      <View
        style={{
          position: 'relative',
          width: 80,
          height: 80,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={80} strokeWidth={6} progress={progress} color={'#FFB946'} />
        <Icons.Fire size={24} color={'#FFB946'} style={{ position: 'absolute' }} />
      </View>
    </View>
  )
}
