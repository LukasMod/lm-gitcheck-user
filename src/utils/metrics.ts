import { Dimensions, Platform, LayoutAnimation, UIManager } from 'react-native'
import { ANIMATION_NORMAL } from './constants'

const { width, height } = Dimensions.get('screen')

const activeOpacity = 0.8

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const layoutAnimationConfig = (duration?: number) => {
  let durationTemp = ANIMATION_NORMAL
  if (duration) {
    durationTemp = duration
  }

  const config = {
    duration: durationTemp,
    useNativeDriver: true,
    create: {
      type: LayoutAnimation.Types.easeOut,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.easeOut,
      property: LayoutAnimation.Properties.opacity,
    },
  }
  return config
}

export const metrics = {
  layoutAnimationConfig,
  activeOpacity,
  hitSlop: { bottom: 4, top: 4, right: 4, left: 4 },
  screenWidth: width,
  screenHeight: height,
}
