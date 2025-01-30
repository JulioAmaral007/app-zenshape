import { colors } from '@/constants/theme'
import { View } from 'react-native'
import { CircularProgress } from './CircularProgress'
import { Typo } from './Typo'

type MacroProgressProps = {
  value: string
  total: string
  label: string
  color: string
  icon: string
}

export function MacroProgress({ value, total, label, color, icon }: MacroProgressProps) {
  const progress = (Number.parseInt(value) / Number.parseInt(total)) * 100

  return (
    <View
      style={{
        backgroundColor: colors.neutral800,
        borderRadius: 16,
        padding: 16,
        width: '30%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.white,
      }}
    >
      <View style={{ alignItems: 'flex-start', width: '100%', marginBottom: 15 }}>
        <Typo fontWeight="bold" size={20} color={colors.text}>
          {value}g
        </Typo>
        <Typo size={12} color={colors.text}>
          {label}
        </Typo>
      </View>

      <View
        style={{
          position: 'relative',
          width: 60,
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={60} strokeWidth={4} progress={progress} color={color} />
        <Typo style={{ position: 'absolute' }} size={16}>
          {icon}
        </Typo>
      </View>
    </View>
  )
}
