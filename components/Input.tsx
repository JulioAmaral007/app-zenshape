import { colors } from '@/constants/theme'
import type { InputProps } from '@/types'
import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

export function Input(props: InputProps) {
  return (
    <View style={[styles.container, props.containerStyle && props.containerStyle]}>
      {props.icon && props.icon}
      <TextInput
        style={[styles.input, props.inputStyle]}
        placeholderTextColor={colors.neutral400}
        ref={props.inputRef}
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: 17,
    borderCurve: 'continuous',
    paddingHorizontal: 15,
    gap: 10,
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: 14,
  },
})
