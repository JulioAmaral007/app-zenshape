import { colors } from '@/constants/theme'
import { TypoProps } from '@/types'
import type { TextStyle } from 'react-native'
import { Text } from 'react-native'

export function Typo({
  size,
  color = colors.text,
  fontWeight = '400',
  children,
  style,
  textProps = {},
}: TypoProps) {
  const textStyle: TextStyle = {
    fontSize: size ? size : 18,
    color,
    fontWeight,
  }

  return (
    <Text style={[textStyle, style]} {...textProps}>
      {children}
    </Text>
  )
}
