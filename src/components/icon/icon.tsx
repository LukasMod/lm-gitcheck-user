import * as React from 'react'
import { ImageStyle, TouchableOpacity, Insets, StyleProp, ViewStyle, Image } from 'react-native'
import { color } from '../../theme'
import { metrics } from '../../utils'
import { icons, Icons } from './icons'
import { observer } from 'mobx-react-lite'

export interface IIcon {
  style?: StyleProp<ImageStyle>
  containerStyle?: StyleProp<ViewStyle>
  icon?: Icons
  size?: number
  onPress?: () => void
  hitSlop?: Insets
}

const IMAGE: ImageStyle = {
  resizeMode: 'contain',
  tintColor: color.text,
}

export const Icon = observer(
  ({ style, icon, containerStyle, size = 25, onPress, hitSlop }: IIcon) => {
    if (!icon) return null

    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={metrics.activeOpacity}
        hitSlop={hitSlop}>
        <Image style={[IMAGE, style, size && { height: size, width: size }]} source={icons[icon]} />
      </TouchableOpacity>
    )
  }
)
