import type { HeaderProps } from '@/types'
import { StyleSheet, View } from 'react-native'
import { Typo } from './Typo'

export function Header({ title = '', leftIcon, rightIcon, style }: HeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>{leftIcon}</View>

        <View style={styles.titleContainer}>
          <Typo size={22} fontWeight="700" style={styles.title}>
            {title}
          </Typo>
        </View>

        <View style={styles.iconContainer}>{rightIcon}</View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  title: {
    textAlign: 'center',
  },
})
