import type { HeaderProps } from '@/types'
import { StyleSheet, View } from 'react-native'
import { Typo } from './Typo'

export function Header({ title = '', leftIcon, rightIcon, style }: HeaderProps) {
  return (
    <View
      style={[
        styles.container,
        { justifyContent: rightIcon ? 'space-between' : 'flex-start' },
        style,
      ]}
    >
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      {title && (
        <Typo
          size={22}
          fontWeight="600"
          style={{
            textAlign: 'center',
            width: leftIcon && rightIcon ? '70%' : leftIcon || rightIcon ? '82%' : '100%',
          }}
        >
          {title}
        </Typo>
      )}
      {rightIcon && <View style={styles.leftIcon}>{rightIcon}</View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftIcon: {},
})
