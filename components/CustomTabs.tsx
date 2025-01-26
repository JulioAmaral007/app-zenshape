import { colors } from '@/constants/theme'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import * as Icons from 'phosphor-react-native'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'

export function CustomTabs({ state, descriptors, navigation }: BottomTabBarProps) {
  const tabbarIcons: { [key: string]: (isFocused: boolean) => JSX.Element } = {
    index: (isFocused: boolean) => (
      <Icons.House
        size={28}
        color={isFocused ? colors.primary : colors.white}
        weight={isFocused ? 'fill' : 'regular'}
      />
    ),
    statistics: (isFocused: boolean) => (
      <Icons.ChartBar
        size={28}
        color={isFocused ? colors.primary : colors.white}
        weight={isFocused ? 'fill' : 'regular'}
      />
    ),
    wallet: (isFocused: boolean) => (
      <Icons.Wallet
        size={28}
        color={isFocused ? colors.primary : colors.white}
        weight={isFocused ? 'fill' : 'regular'}
      />
    ),
    profile: (isFocused: boolean) => (
      <Icons.User
        size={28}
        color={isFocused ? colors.primary : colors.white}
        weight={isFocused ? 'fill' : 'regular'}
      />
    ),
  }

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            {tabbarIcons[route.name] && tabbarIcons[route.name](isFocused)}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    width: '100%',
    height: Platform.OS === 'ios' ? 73 : 55,
    backgroundColor: colors.neutral800,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: colors.neutral700,
    borderTopWidth: 1,
  },
  tabbarItem: {
    marginBottom: Platform.OS === 'ios' ? 10 : 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
