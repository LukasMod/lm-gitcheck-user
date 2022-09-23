import { TextStyle } from 'react-native'
import { color } from './color'

export const typography = {
  regular: 'Roboto-Regular', // 400 weight
  medium: 'Roboto-Medium', // 500 weight
  bold: 'Roboto-Bold', // 700 weight
}

export const fontSize = {
  s: 10,
  m: 14,
  l: 16,
  xl: 22,
}

// text presets
export const tpMediumTextL: TextStyle = {
  fontFamily: typography.medium,
  fontSize: fontSize.l,
  lineHeight: 24,
  color: color.text,
}
export const tpRegularTextM: TextStyle = {
  fontFamily: typography.regular,
  fontSize: fontSize.m,
  lineHeight: 20,
  color: color.text,
}

export const tpRegularTextL: TextStyle = {
  fontFamily: typography.regular,
  fontSize: fontSize.l,
  lineHeight: 24,
  color: color.text,
}

export const tpRegularTextXL: TextStyle = {
  fontFamily: typography.regular,
  fontSize: fontSize.xl,
  lineHeight: 28,
  color: color.text,
}

