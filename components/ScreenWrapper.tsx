import { colors } from '@/constants/theme'
import type { ScreenWrapperProps } from '@/types'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function ScreenWrapper({ style, children }: ScreenWrapperProps) {
  const insets = useSafeAreaInsets()

  return (
    <View style={[{ paddingTop: insets.top, flex: 1, backgroundColor: colors.neutral900 }, style]}>
      {children}
    </View>
  )
}
